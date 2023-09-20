import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Conge } from "src/app/model/Conge";
import { TacheAtraiter } from "src/app/model/TacheAtraiter";
import { CongeService } from "src/app/service/conge.service";
import { LienTacheService } from "src/app/service/lien-tache.service";
import { TacheAtraiterService } from "src/app/service/tache-atraiter.service";
import { TacheService } from "src/app/service/tache.service";
import { TokenStorageService } from "src/app/service/token-storage.service";
import { CvService } from "src/app/service/cv.service";
import Swal from "sweetalert2";
import { Cv } from "src/app/model/Cv";
import { HttpClient } from "@angular/common/http";
import * as html2pdf from 'html2pdf.js';
import { JsonService } from "src/app/service/json.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JsonData } from '../../../model/JsonData';

@Component({
  selector: "app-today-appointment",
  templateUrl: "./today-appointment.component.html",
  styleUrls: ["./today-appointment.component.sass"],
})
export class TodayAppointmentComponent implements OnInit {
  @ViewChild('pdfContent') pdfContent: ElementRef;

  currentUser: any;
  webhookResponse: string;
  conges: Conge;
  jsonDataList: JsonData[];
  emailForm: FormGroup;

  constructor(
    private tacheService: TacheService,
    private tokenStorage: TokenStorageService,
    private lienService: LienTacheService,
    private modalService: NgbModal,
    private congeService: CongeService,
    private tacheAtraiterService: TacheAtraiterService,
    private cvService: CvService,
    private jsonService : JsonService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.emailForm = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      text: ['', Validators.required]
    });
   }


  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.getTasksByUser();
    this.getTasksByUsertraite();
    this.TacheTraiteParResponsable();
    this.fetchCvData();
    this.addFormation();
    this.addCompetence();
    //this.getCvData();
  }

  to: string;
  subject: string;
  text: string;

  sendEmail() {
    if (this.emailForm.valid) {
      const emailData = {
        to: this.emailForm.value.to,
        subject: this.emailForm.value.subject,
        text: this.emailForm.value.text
      };
  
      this.http.post('http://localhost:8080/api/email/send-email', emailData).subscribe(
        () => alert('Email sent successfully!'),
        error => alert('Error sending email: ' + error.message)
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }
  

  listTache: any[];
  listLinks: any[];
  listTarget: any[] = [];
  firstTask: any[];
  ListAllTasks: any[];
  links: any[];
  targets: any[];
  listTaskByUser: any[];
  thisTaskList = [];
  orderedList: any[] = [];
  oui = [];
  non = [];
  filteredList = [];
  getTasksByUser() {
    this.tacheAtraiterService.getAlltachesAtraiter().subscribe((res) => {
      this.ListAllTasks = res;

      this.lienService.getAllLinks().subscribe((res) => {
        this.links = res;
        this.targets = this.links.map((link) => link.tacheTargetName);

        this.ListAllTasks.sort((a, b) => {
          const indexA = this.targets.indexOf(a.name);
          const indexB = this.targets.indexOf(b.name);
          return indexA - indexB;
        });
        this.tacheAtraiterService.getTacheAtraiterByResponsable(this.currentUser.id).subscribe((res) => {
          this.listTache = res;

          this.lienService.getAllLinks().subscribe((res) => {
            this.listLinks = res;
            this.listTarget = this.listLinks.map((link) => link.tacheTargetName);
            this.listTache.sort((a, b) => {
              const indexA = this.listTarget.indexOf(a.name);
              const indexB = this.listTarget.indexOf(b.name);
              return indexA - indexB;
            });

            this.listLinks.sort((a, b) => a.workflowId.localeCompare(b.workflowId));

            this.oui = this.listLinks.filter(
              item => item.type === "oui"
            );

            this.non = this.listLinks.filter(
              item => item.type === "non"
            );

            console.log("listTache", this.listTache)
            this.firstTask = [];
            for (let i = 0; i < this.listTache.length; i++) {
              this.firstTask.push(this.listTache[i]);
            }

            const workflowIdToFind = this.firstTask[0].workflowId;
            const matchingOuiItems = this.oui.filter((item) => item.workflowId === String(workflowIdToFind));
            const updatedOuiList = [...matchingOuiItems, ...this.oui.filter((item) => item.workflowId !== String(workflowIdToFind))];

            const hierarchy = {};

            const startingTask = updatedOuiList.find(task => task.tacheSourceName === "Début");
            if (startingTask) {
              hierarchy[startingTask.tacheSourceName] = startingTask.tacheTargetName;

              let currentTaskName = startingTask.tacheTargetName;
              while (currentTaskName !== "Fin") {
                const nextTask = updatedOuiList.find(task => task.tacheSourceName === currentTaskName);
                if (nextTask) {
                  hierarchy[nextTask.tacheSourceName] = nextTask.tacheTargetName;
                  currentTaskName = nextTask.tacheTargetName;
                } else {
                  break;
                }
              }
            }

            console.log("updatedOuiList ", updatedOuiList);
            console.log("non ", this.non);

            if (this.firstTask[0].statut === "traité") {
              this.firstTask = [];
            }

            this.orderedList = Object.keys(hierarchy).map(key => this.ListAllTasks.find(item => item.name === hierarchy[key]));
            console.log("orderedList ", this.orderedList);

            this.filteredList = this.orderedList.filter(item => item && item.statut && item.statut === "non traité");
            console.log("filteredList ", this.filteredList);
            console.log("ListAllTasks ", this.ListAllTasks);
            console.log("listLinks ", this.listLinks);


            for (let i = 1; i < this.orderedList.length; i++) {

              if (this.orderedList[i - 1].approbation === "Rejeter") {
                for (let j = 0; j < this.non.length; j++) {
                  if (this.non[j].tacheSourceName === this.orderedList[i - 1].name && this.non[j].workflowId.toString() === this.orderedList[i].workflowId.toString()) {
                    console.log(this.non[j].tacheSourceName);
                    console.log(this.non[j].tacheTargetName);
                    for (let k = 0; k < this.ListAllTasks.length; k++) {
                      if (this.ListAllTasks[k].name === this.non[j].tacheTargetName && this.ListAllTasks[k].workflowId.toString() === this.non[j].workflowId.toString()) {
                        console.log("this.non[j].tacheTargetName 1: ", this.non[j].tacheTargetName);
                        this.orderedList.splice(i, 0, this.ListAllTasks[k]);
                        this.filteredList.splice(0, 0, this.ListAllTasks[k]);

                      }
                      console.log("this.non[j].tacheTargetName 2: ", this.non[j].tacheTargetName);

                      if (this.non[j].tacheTargetName === "Fin") {
                        this.firstTask = [];
                      }
                      if (this.listTache[0].name !== this.non[j].tacheTargetName && this.listTache[0].workflowId.toString() === this.non[j].workflowId.toString()) {
                        this.firstTask = [];
                      }
                    }
                  }
                }
              }
            }
            console.log("firstTask", this.firstTask);
            console.log("filteredList1 ", this.filteredList);

            if (this.filteredList.length === 0) {
              this.firstTask = [];
            }
            if (this.filteredList.length > 0 && this.firstTask.length > 0) {
              if (this.filteredList[0].name !== this.firstTask[0].name && this.filteredList[0].workflowId.toString() === this.firstTask[0].workflowId.toString()) {
                this.firstTask = [];
              }
            }
            console.log("filteredList2 ", this.filteredList);

            console.log("firstTask", this.firstTask);
            if (this.orderedList[0].action === 'cv') {
              this.cvService.getCv(this.orderedList[0].id)
                .subscribe(
                  (cv: Cv) => {
                    this.cv = cv;
                    this.cvByIdList.push(cv);
                    console.log('CV data:', this.cvByIdList);
                    console.log('CV :', cv);
                  },
                  (error) => {
                    console.error('Error fetching CV data:', error);
                  }
                );
            }
          });
        });
      });
    });
  }

  listTachetraite: any[];
  getTasksByUsertraite() {
    this.tacheService.getTasksByUsertraite(this.currentUser.id).subscribe((res) => {
      this.listTachetraite = res;
    });
  }

  conge: Conge = new Conge();
  addConge(tacheAtraiterId: any): void {
    this.tacheAtraiterService.getTacheAtraiterById(tacheAtraiterId).subscribe(
      (tache) => {
        this.congeService.addCongeWithAssignment(this.conge, tacheAtraiterId).subscribe(
          response => {
            console.log('Conge added with assignment:', response);
          }
        );
      }
    );
  }

  cv: any = {
    formations: [],
    competences: [],
    experiences: [],
    langues: [],
    interets: []
  };
  formation: any = {};
  competence: any = {};
  experience: any = {};
  langue: any = {};
  interet: any = {};

  createCV(tacheAtraiterId: any): void {
    const formations = this.cv.formations.map(formation => ({ ...formation }));
    const competences = this.cv.competences.map(competence => ({ ...competence }));
    const experiences = this.cv.experiences.map(experience => ({ ...experience }));
    const langues = this.cv.langues.map(langue => ({ ...langue }));
    const interets = this.cv.interets.map(interet => ({ ...interet }));

    this.cv.formations = formations;
    this.cv.competences = competences;
    this.cv.experiences = experiences;
    this.cv.langues = langues;
    this.cv.interets = interets;
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr(e) de vouloir créer ce CV ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cvService.createCv(this.cv, tacheAtraiterId).subscribe(() => {
          this.tacheAtraiterService.getTacheAtraiterById(tacheAtraiterId).subscribe((tacheAtraiter) => {
            this.tacheAtraiterService.marquerTacheCommeTraite(tacheAtraiterId, tacheAtraiter)
              .subscribe(() => {
                for (let i = 1; i < this.orderedList.length; i++) {
                  console.log("test ordered list 1 : ", this.orderedList[i])
                  if (this.orderedList[i].action === "approbation" && this.orderedList[i].statut === "non traité") {
                    console.log("test ordered list 2 : ", this.orderedList[i])
                    const emailData = {
                      to: this.orderedList[i].emailResponsable,
                      subject: "CV en attente d'approbation",
                      text: "Bonjour,\n\n" +
                        " Un CV est actuellement en attente d'approbation sur la plateforme. Je vous prie de bien vouloir y accéder dès que possible pour le valider\n\n"
                        + "Cordialement,"
                    };
                    this.http.post('http://localhost:8080/api/email/send-email', emailData).subscribe(
                      () => {
                        console.log('Email sent successfully!');
                        this.isLoading = false; // Hide the loading spinner
                      },
                      (error) => {
                        console.log('Error sending email: ' + error.message);
                        this.isLoading = false; // Hide the loading spinner in case of an error too.
                      }
                    );
                  }
                  break;
                }
                this.getTasksByUser();
                this.TacheTraiteParResponsable();
              });
          });
        });
      }
    });
  }


  addFormation(): void {
    this.cv.formations.push({});
  }

  addCompetence(): void {
    this.cv.competences.push({});
  }

  addExperience(): void {
    this.cv.experiences.push({});
  }

  addLangue(): void {
    this.cv.langues.push({});
  }

  addInteret(): void {
    this.cv.interets.push({});
  }

  isTacheTraite(task: any): boolean {
    return task.statut === 'traité';
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }
  
  openModalInfo(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
  }


  tacheAtraiter: TacheAtraiter;
  isLoading: boolean = false;
  marquerTacheCommeTraite(tacheId: any) {
    this.isLoading = true;
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir marquer cette tâche comme traitée ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tacheAtraiterService.getTacheAtraiterById(tacheId).subscribe((tacheAtraiter) => {
          this.tacheAtraiterService.marquerTacheCommeTraite(tacheId, tacheAtraiter)
            .subscribe(() => {
              this.getTasksByUsertraite();
              this.getTasksByUser();
              for (let i = 0; i < this.orderedList.length; i++) {
                if (this.filteredList[i + 1].action === "approbation" && this.filteredList[i + 1].statut === "non traité") {
                  const emailData = {
                    to: this.filteredList[i + 1].emailResponsable,
                    subject: "CV en attente d'approbation",
                    text: "Bonjour,\n\n" +
                      "Un CV est actuellement en attente d'approbation sur la plateforme. Je vous prie de bien vouloir y accéder dès que possible pour le valider\n\n"
                      + "Cordialement,"
                  };
                  this.http.post('http://localhost:8080/api/email/send-email', emailData).subscribe(
                    () => {
                      console.log('Email sent successfully!');
                      this.isLoading = false;
                      Swal.fire("La tâche a été validée avec succès !");
                    },
                    (error) => {
                      console.log('Error sending email: ' + error.message);
                      this.isLoading = false; // Hide the loading spinner in case of an error too.
                    }
                  );
                }
                break;
              }
              console.log("this.orderedList[this.orderedList.length]", this.orderedList[this.orderedList.length]);
              if (this.orderedList[this.orderedList.length - 2].action === "approbation" && this.orderedList[this.orderedList.length - 2].statut === "non traité") {
                const emailData = {
                  to: this.orderedList[0].emailResponsable,
                  subject: "Acceptation de candidature",
                  text: "Bonjour,\n\n"+
                    "Félicitations ! Nous avons le plaisir de vous informer que votre candidature a été retenue.Nous sommes ravis de vous accueillir au sein de notre entreprise \n\n"
                    + "Nous avons été impressionnés par votre profil, votre expérience et vos compétences, qui correspondent parfaitement à ce que nous recherchons pour ce poste.\n\n"
                    + "Nous sommes impatients de travailler avec vous et sommes convaincus que votre contribution sera précieuse pour notre équipe.\n\n"
                    + "Veuillez nous indiquer vos disponibilités pour convenir d'une date de début.\n\n"
                    + "Encore une fois, toutes nos félicitations et bienvenue dans l'équipe !\n\n"
                    + "Cordialement,"
                };
                this.http.post('http://localhost:8080/api/email/send-email', emailData).subscribe(
                  () => {
                    console.log('Email sent successfully!');
                    this.isLoading = false;
                  },
                  (error) => {
                    console.log('Error sending email: ' + error.message);
                    this.isLoading = false;
                  }
                );
              }
            });
        });
      }
    });
  }
  marquerTacheCommeTraiteEmail(tacheId: any) {
    this.isLoading = true;
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir marquer cette tâche comme traitée ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tacheAtraiterService.getTacheAtraiterById(tacheId).subscribe((tacheAtraiter) => {
          this.tacheAtraiterService.marquerTacheCommeTraite(tacheId, tacheAtraiter)
            .subscribe(() => {
              this.getTasksByUsertraite();
              this.getTasksByUser();
            });
        });
        this.sendEmail();
      }
    });
  }

  rejeterTache(tacheId: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir rejeter cette tâche ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tacheAtraiterService.getTacheAtraiterById(tacheId).subscribe((tacheAtraiter) => {
          this.tacheAtraiterService.rejeterTache(tacheId, tacheAtraiter)
            .subscribe(() => {
              this.getTasksByUser();
              this.TacheTraiteParResponsable();
              console.log("this.orderedList.length", this.orderedList[this.orderedList.length - 2]);
              if (this.orderedList[this.orderedList.length - 2].action === "approbation" && this.orderedList[this.orderedList.length - 2].statut === "non traité") {
                const emailData = {
                  to: this.orderedList[0].emailResponsable,
                  subject: "Candidature - Refus",
                  text:
                    "Bonjour,\n\n" +
                    "Nous vous remercions sincèrement pour l'intérêt que vous avez porté à notre entreprise. Après avoir examiné attentivement votre candidature, nous regrettons de vous informer que nous avons décidé de poursuivre notre processus de recrutement avec d'autres candidats.\n\n" +
                    "Nous vous souhaitons beaucoup de succès dans vos recherches d'emploi et espérons que vous trouverez rapidement une opportunité professionnelle correspondant à vos compétences et à vos aspirations.\n\n" +
                    "Merci encore pour votre intérêt et votre temps.\n\n" +
                    "Cordialement,"
                };
                this.http.post('http://localhost:8080/api/email/send-email', emailData).subscribe(
                  () => {
                    console.log('Email sent successfully!');
                    this.isLoading = false;
                  },
                  (error) => {
                    console.log('Error sending email: ' + error.message);
                    this.isLoading = false;
                  }
                );
              }

            });
        });
      }
    });
  }

  tacheTraite = [];
  TacheTraiteParResponsable() {
    this.tacheAtraiterService.getTachesTraiteesParResponsable(this.currentUser.id).subscribe((res) => {
      this.tacheTraite = res;
    });
  }

  panelOpenState = false;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  cvList = [];
  fetchCvData() {
    this.cvService.getCvData().subscribe((cvData: Cv[]) => {
      this.cvList = cvData;
      console.log(this.cvList);
    });
  }


  cvByIdList = [];
  /*getCvData() {
    this.cvService.getCv(this.firstTask[0].id)
      .subscribe(
        (cv: Cv) => {
          this.cv = cv;
          this.cvByIdList.push(cv);
          console.log('CV data:', this.cvByIdList);
          console.log('CV :', cv);
        },
        (error) => {
          console.error('Error fetching CV data:', error);
        }
      );
  }
*/


  generatePDF() {
    const content = this.pdfContent.nativeElement;

    // Use html2pdf to create the PDF
    const opt = {
      margin: 10,
      filename: 'your_cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(content).set(opt).save();
  }


  fetchJsonData(tacheAtraiterId: any): void {
    this.tacheAtraiterService.getTacheAtraiterById(tacheAtraiterId).subscribe(
      tacheAtraiter => {
        this.jsonService.getJsonDataByTacheAtraiterId(tacheAtraiter.id)
          .subscribe(
            jsonDataList => {
              this.jsonDataList = jsonDataList;
              console.log("jsonDataList: ", this.jsonDataList);
            },
            error => {
              console.error('Error fetching JSON data:', error);
            }
          );
      },
      error => {
        console.error('Error fetching TacheAtraiter:', error);
      }
    );
  }
  
  updateStateToTreated(jsonDataId:any): void {
      this.jsonService.updateStateToTreated(jsonDataId)
        .subscribe(
          response => {
            console.log('JsonData state updated to "traité"');
          },
          error => {
            console.error('Error updating JsonData state:', error);
          }
        );
      console.warn('jsonDataId is not set');
  }

  

}