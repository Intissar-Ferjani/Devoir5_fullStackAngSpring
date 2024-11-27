import { Component, model, OnInit } from '@angular/core';
import { Ecrivain } from '../../model/ecrivain.model';
import { EcrivainService } from '../services/ecrivain.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ecrivains',
  templateUrl: './ecrivains.component.html', 
  styleUrl: './ecrivains.component.css'
})
export class EcrivainsComponent implements OnInit {

  ecrivains : Ecrivain [] = [];

  constructor(private ecrivainService: EcrivainService, public authService: AuthService) {}
  
  // ngOnInit(): void {
  //   this.ecrivains = this.ecrivainService.listeEcrivains();
  // }
  ngOnInit(): void {
    // this.ecrivainService.listeEcrivains().subscribe(ecrivs => { // -> subscribe pque le type de retour est Observable
    //   console.log(ecrivs);
    //   this.ecrivains = ecrivs;
    // });
    this.chargerEcrivains();
  }

  chargerEcrivains(){
    this.ecrivainService.listeEcrivains().subscribe(ecrivs => {
      // console.log(ecrivs);
      this.ecrivains = ecrivs;
    });
  }

  // supprimerEcrivain(e: Ecrivain)
  // {
  //   let conf = confirm("Etes-vous sûr ?");
  //   if (conf){
  //     this.ecrivainService.supprimerEcrivain(e);
  //     // this.ecrivains = this.ecrivainService.listeEcrivains();
  //   }
  // }
  supprimerEcrivain(e: Ecrivain)
  {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.ecrivainService.supprimerEcrivain(e.idEcrivain!).subscribe(() => {
        this.chargerEcrivains();
      });
  }
}
