import { Injectable } from '@angular/core';
import { Ecrivain } from '../../model/ecrivain.model';
import { Genre } from "../../model/Genre.model";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLG } from '../config';
import { genreWrapper } from '../../model/genreWrapped.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} ) // -> pour indiquer que les données retournés sont de type json
};

@Injectable({
  providedIn: 'root'
})
export class EcrivainService {

  // apiURL: string = 'http://localhost:8080/ecrivains/api';

  ecrivains : Ecrivain[] = [];
  ecrivain! : Ecrivain;
  genres! : Genre[];

  // constructor() {
  //   this.genres = [
  //     {idG : 1, nomG: "Science-fiction", descriptiong: "Ce genre est axé sur des récits futuristes, technologiques ou centrés sur des découvertes scientifiques imaginaires. "},
  //     {idG : 2, nomG: "Policier ", descriptiong: "Ce genre se concentre sur des histoires de crimes, souvent centrées autour d’enquêtes menées par un détective ou un enquêteur."},
  //   ]

  //   this.ecrivains = [
  //     { idEcrivain: 1, nomEcrivain: "Vikki D.", prixLivre: 210.50, dateCreation: new Date("08/14/1802") , genre: {idG : 1, nomG: "Science-fiction", descriptiong: "Ce genre est axé sur des récits futuristes, technologiques ou centrés sur des découvertes scientifiques imaginaires. "} },
  //     { idEcrivain: 2, nomEcrivain: "Bailey Jr.", prixLivre: 240.75, dateCreation: new Date("02/07/1812"), genre: {idG : 2, nomG: "Policier ", descriptiong: "Ce genre se concentre sur des histoires de crimes, souvent centrées autour d’enquêtes menées par un détective ou un enquêteur."} },
  //     { idEcrivain: 3, nomEcrivain: "Jamie Br.", prixLivre: 800.40, dateCreation: new Date("12/16/1775"), genre:{idG : 1, nomG: "Science-fiction", descriptiong: "Ce genre est axé sur des récits futuristes, technologiques ou centrés sur des découvertes scientifiques imaginaires. "} }
  //   ];
  //  }

  constructor(private http : HttpClient) {}

  //----------------------- Ecrivain

  listeEcrivains(): Observable<Ecrivain[]> {
    return this.http.get<Ecrivain[]>(apiURL);
  }

  // ajouterEcrivain( ecriv: Ecrivain){
  //   this.ecrivains.push(ecriv);
  // }
  ajouterEcrivain( ecriv: Ecrivain):Observable<Ecrivain>{
    return this.http.post<Ecrivain>(apiURL, ecriv, httpOptions);
  }

  // supprimerEcrivain( ecriv: Ecrivain){
  //   const index = this.ecrivains.indexOf(ecriv, 0);
  //   if (index > -1) {
  //     this.ecrivains.splice(index, 1);
  //   }
  // }
  supprimerEcrivain(id : number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }
    

  // consulterEcrivain(id:number): Ecrivain{
  //   return this.ecrivains.find(e => e.idEcrivain == id)!;
  // }
  consulterEcrivain(id: number): Observable<Ecrivain> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Ecrivain>(url);
  }

  trierEcrivains(){
    this.ecrivains = this.ecrivains.sort((n1,n2) => {
      if (n1.idEcrivain! > n2.idEcrivain!) 
        return 1;
      if (n1.idEcrivain! < n2.idEcrivain!)
        return -1;
      return 0;
    });
  }

  // updateEcrivain(e:Ecrivain)
  // {
  //   this.supprimerEcrivain(e);
  //   this.ajouterEcrivain(e);
  //   this.trierEcrivains();
  // }
  updateEcrivain(ecriv :Ecrivain) : Observable<Ecrivain>
  {
    return this.http.put<Ecrivain>(apiURL, ecriv, httpOptions);
  }

  //----------------------- Genre

  // listeGenres():Genre[] {
  //   return this.genres;
  // }
  listeGenres():Observable<genreWrapper>{
    return this.http.get<genreWrapper>(apiURLG);
  }

  // consulterGenre(id:number): Genre{
  //   return this.genres.find(gen => gen.idG == id)!;
  // }

  rechercherParGenre(idG: number):Observable< Ecrivain[]> {
    const url = `${apiURL}/ecrivsGen/${idG}`;
    return this.http.get<Ecrivain[]>(url);
  }

  rechercherParNom(nom: string):Observable< Ecrivain[]> {
    const url = `${apiURL}/ecrivsByName/${nom}`;
    return this.http.get<Ecrivain[]>(url);
  }

  ajouterGenre( gen : Genre):Observable<Genre>{
    return this.http.post<Genre>(apiURLG, gen, httpOptions);
  }
    
  
}


