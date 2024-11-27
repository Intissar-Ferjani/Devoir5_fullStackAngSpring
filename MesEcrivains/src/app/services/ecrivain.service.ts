import { Image } from './../../model/Image.model';
import { Injectable } from '@angular/core';
import { Ecrivain } from '../../model/ecrivain.model';
import { Genre } from "../../model/Genre.model";
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLG, apiURLBack } from '../config';
import { genreWrapper } from '../../model/genreWrapped.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';  // Add this import


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} ) // -> pour indiquer que les données retournés sont de type json
};

@Injectable({
  providedIn: 'root'
})
export class EcrivainService {

  ecrivains : Ecrivain[] = [];
  ecrivain! : Ecrivain;
  genres! : Genre[];

  constructor(private http : HttpClient, private authService : AuthService) {}


  //----------------------- Ecrivain

  listeEcrivains(): Observable<Ecrivain[]>{
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
    // return this.http.get<Ecrivain[]>(this.apiURL+"/all",{headers:httpHeaders});
    return this.http.get<Ecrivain[]>(apiURL+"/all");
  }
 
  // ajouterEcrivain( ecriv: Ecrivain):Observable<Ecrivain>{
  //   let jwt = this.authService.getToken();
  //   jwt = "Bearer "+jwt;
  //   let httpHeaders = new HttpHeaders({"Authorization":jwt})
  //   return this.http.post<Ecrivain>(apiURL+"/addEcrivain", ecriv, {headers:httpHeaders});
  // }
  ajouterEcrivain(ecriv: Ecrivain): Observable<Ecrivain> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization": jwt});
    
    // Make sure the complete Ecrivain object with image data is sent
    return this.http.post<Ecrivain>(apiURL + "/addEcrivain", ecriv, {headers: httpHeaders})
      .pipe(
        map(response => {
          // Ensure the image data is properly set in the response
          if (response.images && response.images.length > 0) {
            response.imageStr = `data:${response.images[0].type};base64,${response.images[0].image}`;
          }
          return response;
        })
      );
  }

  supprimerEcrivain(id : number) {
    const url = `${apiURL}/delEcrivain/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});
  }
 
  consulterEcrivain(id: number): Observable<Ecrivain> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Ecrivain>(url,{headers:httpHeaders});
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

  updateEcrivain(ecriv :Ecrivain) : Observable<Ecrivain>
  {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Ecrivain>(apiURL+"/updateEcrivain", ecriv, {headers:httpHeaders});
  }

  //----------------------- Genre

 
  listeGenres():Observable<genreWrapper>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<genreWrapper>(apiURLG,{headers:httpHeaders})
  }

  rechercherParGenre(idG: number):Observable< Ecrivain[]> {
    const url = `${apiURL}/ecrivsGen/${idG}`; // //
    return this.http.get<Ecrivain[]>(url);
  }

  rechercherParNom(nom: string):Observable< Ecrivain[]> {
    const url = `${apiURL}/ecrivsByName/${nom}`; //was apiURLG
    return this.http.get<Ecrivain[]>(url);
  }

  ajouterGenre( gen : Genre):Observable<Genre>{
    return this.http.post<Genre>(apiURLG, gen, httpOptions);
  }

  //----------------------------- Image ------------------
  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageEcriv(file: File, filename: string, idEcriv: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uplaodImageEcriv'}/${idEcriv}`;
    return this.http.post(url, imageFormData);
  }

  supprimerImage(id: number) {
    const url = `${apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
    
    

  
}


