import { Genre } from "./Genre.model";

export class Ecrivain {
    
    idEcrivain? : number;
    nomEcrivain? : string;
    prixLivre? : number;
    dateCreation? : Date ;
    genre! : Genre
}