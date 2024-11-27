import { Component, OnInit } from '@angular/core';
import { Ecrivain } from '../../model/ecrivain.model';
import { EcrivainService } from '../services/ecrivain.service';
import { Genre } from "../../model/Genre.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ecrivain',
  templateUrl: './add-ecrivain.component.html',
  
})
export class AddEcrivainComponent implements OnInit {

  newEcrivain = new Ecrivain();
  msg : string = "";

  genres! : Genre[];
  newIdG! : number;
  newGenre! : Genre;

  constructor(private ecrivainService: EcrivainService , private router :Router ) { }

  // ngOnInit(): void { 
  //   // this.genres = this.ecrivainService.listeGenres();
  // }
 
  ngOnInit(): void {
    this.ecrivainService.listeGenres().
    subscribe(gens => {
      // console.log(gens);
      this.genres = gens._embedded.genres;
    }
    );
  }
    

  // addEcrivain(){
  //   // this.newGenre = this.ecrivainService.consulterGenre(this.newIdG);
  //   // this.newEcrivain.genre = this.newGenre;
  //   this.ecrivainService.ajouterEcrivain(this.newEcrivain);
  //   this.msg = "Ecrivain " + this.newEcrivain.nomEcrivain + " ajouté avec succès";
  //   this.router.navigate(['ecrivains']);
  // }
  addEcrivain(){
    this.newEcrivain.genre = this.genres.find(gen => gen.idG == this.newIdG)!;
    this.ecrivainService.ajouterEcrivain(this.newEcrivain)
    .subscribe(ecriv => {
      // console.log(ecriv);
      this.router.navigate(['ecrivains']);
    });
  }
  
}
