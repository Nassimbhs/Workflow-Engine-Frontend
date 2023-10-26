import { Competence } from "./Competence";
import { Experience } from "./Experience";
import { Formation } from "./Formation";
import { Interet } from "./Interet";
import { Langue } from "./Langue";

export class Cv {
    id: number;
    prenom: string;
    nomFamille: string;
    email: string;
    titreProfil: string;
    tel: number;
    addresse: string;
    ville: string;
    workflow: number;
    formations: Formation[] = [];
    competences: Competence[] = [];
    experiences: Experience[] = [];
    interets: Interet[] = [];
    langues: Langue[] = [];

}