import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcrivainService } from '../services/ecrivain.service';
import { Ecrivain } from '../../model/ecrivain.model';
import { Genre } from '../../model/Genre.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-ecrivain',
  templateUrl: './update-ecrivain.component.html'
})

export class UpdateEcrivainComponent implements OnInit {

  currentEcrivain = new Ecrivain();

  genres! : Genre[];
  updatedIdG! : number;

  constructor(private activatedRoute: ActivatedRoute, private router :Router, private ecrivainService: EcrivainService) { }

  // ngOnInit(): void {
  //   // this.genres = this.ecrivainService.listeGenres();
  //   this.currentEcrivain = this.ecrivainService.consulterEcrivain(this.activatedRoute.snapshot. params['id']);
  //   // this.updatedIdG = this.currentEcrivain.genre.idG;
  // }
  
  ngOnInit(): void {
    this.ecrivainService.listeGenres().
    subscribe(gens => {
      // console.log(gens);
      this.genres = gens._embedded.genres;
    }
    );
    this.ecrivainService.consulterEcrivain(this.activatedRoute.snapshot.params['id']).
    subscribe( ecriv =>{ 
      this.currentEcrivain = ecriv;
      this.updatedIdG = this.currentEcrivain.genre.idG;
    } ) ;
    }
    

  // updateEcrivain()
  // { 
  //   // this.currentEcrivain.genre = this.ecrivainService.consulterGenre(this.updatedIdG);
  //   this.ecrivainService.updateEcrivain(this.currentEcrivain);
  //   this.router.navigate(['ecrivains']);
  // }
  updateEcrivain() {
    this.currentEcrivain.genre = this.genres.find(gen => gen.idG == this.updatedIdG)!;
    this.ecrivainService.updateEcrivain(this.currentEcrivain).subscribe(ecriv => {
      this.router.navigate(['ecrivains']); }
    );
  }

}


