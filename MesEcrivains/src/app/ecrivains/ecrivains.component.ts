import { Component, model, OnInit } from '@angular/core';
import { Ecrivain } from '../../model/ecrivain.model';
import { EcrivainService } from '../services/ecrivain.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../../model/Image.model';

@Component({
  selector: 'app-ecrivains',
  templateUrl: './ecrivains.component.html', 
  styleUrl: './ecrivains.component.css'
})
export class EcrivainsComponent implements OnInit {

  ecrivains : Ecrivain [] = [];

  constructor(private ecrivainService: EcrivainService, public authService: AuthService) {}
  

  ngOnInit(): void {

    this.chargerEcrivains();
  }

  chargerEcrivains() {
    this.ecrivainService.listeEcrivains().subscribe(data => {
      this.ecrivains = data.map(ecrivain => {
        if (ecrivain.images && ecrivain.images.length > 0) {
          ecrivain.imageStr = `data:${ecrivain.images[0].type};base64,${ecrivain.images[0].image}`;
        }
        return ecrivain;
      });
    });
    
  }
  
  supprimerEcrivain(e: Ecrivain)
  {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.ecrivainService.supprimerEcrivain(e.idEcrivain!).subscribe(() => {
        this.chargerEcrivains();
      });
  }
}
