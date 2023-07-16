import { Competence } from "./Competence";
import { Formation } from "./Formation";

export class Cv {
    id: number;
    prenom: string;
    nomFamille: string;
    email: string;
    titreProfil: string;
    tel: number;
    addresse: string;
    ville: string;
    formations: Formation[] = [];
    competences: Competence[] = [];
}