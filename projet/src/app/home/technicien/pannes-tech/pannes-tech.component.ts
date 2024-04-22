import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TechnicienComponent } from '../technicien.component';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { HomeService } from '../../home.service';
import { UsersService } from 'src/app/users';
import { TechnicienService } from '../technicien.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pannes-tech',
  templateUrl: './pannes-tech.component.html',
  styleUrls: ['./pannes-tech.component.css']
})
export class PannesTechComponent extends TechnicienComponent implements OnInit {
  private tag = "Pannes";
  protected isDisabled = true;
  myPannes: any[] = [];
  myFiltredPannes: any[] = [];

  private panne!: any;

  newPannes: any[] = [];
  newFiltredPannes: any[] = [];

  private technicienID!: any;
  protected selectedPannes: string = 'EnCours';
  protected formulaire_modifier_panne!: FormGroup;


  constructor(
    protected override authService: AuthService,
    protected override router: Router,
    protected homeService: HomeService,
    protected userService: UsersService,
    protected technicienService: TechnicienService,
    private formbuilder: FormBuilder
  ) {
    super(authService, router, homeService);
    this.formulaire_modifier_panne = this.formbuilder.group({
      codeInventaire: [''],
      typeRessource: [''],
      etat: [''],
      explication: [''],
      frequence: [''],
      ordreLogiciel: [''],
      ordreMateriel: ['']
    });
  }
  override ngOnInit(): void {
    this.setActiveClassToOffres(this.tag);
    this.technicienID = Number(localStorage.getItem("id"));
    this.loadPannes();
    this.changeMyPannes();
  }

  // List of pannes
  loadPannes() {
    this.technicienService.getAllPannes().subscribe(
      (response: any[]) => {
        let pannes = response;
        this.newPannes = pannes.filter(panne => panne.etatPanne == "NonRepare");
        this.newFiltredPannes = this.newPannes;

        this.myPannes = pannes.filter(panne => panne.user?.id == this.technicienID);
        this.myFiltredPannes = this.myPannes;
      },
      (error: any) => {
        console.error('Erreur lors de récuperation des pannes : ', error);
      }
    );
  }

  changeMyPannes() {
    if (this.selectedPannes == "all") {
      this.myFiltredPannes = this.myPannes;

    } else if (this.selectedPannes == "Repare") {
      this.myFiltredPannes = this.myPannes.filter(p => p.etatPanne == 'Repare');
    
    } else if (this.selectedPannes == "EnCours") {
      this.myFiltredPannes = this.myPannes.filter(p => p.etatPanne == 'EnCours');

    } else if (this.selectedPannes == "Severe") {
      this.myFiltredPannes = this.myPannes.filter(p => p.etatPanne == 'Severe');
    }
  }

  // Filter for my Pannes
  filterPannes(text: string): void {
    this.changeMyPannes();
    if (!text) {
      // If search input is empty, display all ressources
      this.myFiltredPannes = this.myFiltredPannes;
      return;
    }

    this.myFiltredPannes = this.myFiltredPannes.filter(
      panne => String(panne?.ressource.codeInventaire).toLowerCase().includes(text.toLowerCase()) || panne?.ressource.typeRessource.toLowerCase().includes(text.toLowerCase()) || panne?.etatPanne.toLowerCase().includes(text.toLowerCase())  || String(panne?.dateSignal).includes(text)
    );
  }

  // Filter for new Pannes
  filternewPannes(text: string): void {
    if (!text) {
      // If search input is empty, display all ressources
      this.newFiltredPannes = this.newPannes;
      return;
    }

    this.newFiltredPannes = this.newPannes.filter(
      panne => String(panne?.ressource.codeInventaire).toLowerCase().includes(text.toLowerCase()) || panne?.ressource.typeRessource.toLowerCase().includes(text.toLowerCase()) || panne?.etatPanne.toLowerCase().includes(text.toLowerCase()) || String(panne?.dateSignal).includes(text)
    );
  }

  takePanne(panne: any) {
    if (confirm("Voulez vous vraiment prendre ce panne ?")) {
      this.technicienService.takePanne(panne.id, this.technicienID).subscribe(
        (response: any[]) => {
  
          // here we change the panne status
          this.technicienService.changePanneStatus(panne.id, "EnCours").subscribe(
            (response: any[]) => {
              
              panne.etatPanne = "EnCours";
              this.myPannes.push(panne);
              this.changeMyPannes();
              
              this.newPannes = this.newPannes.filter(p => p.id != panne.id);
              this.newFiltredPannes = this.newPannes;
              alert("La panne a été attribuée à vous pour prise en charge");
            },
            (error: any) => {
              console.error('Erreur lors de changement de l\etat du panne : ', error);
            }
          );
  
        },
        (error: any) => {
          console.error('Erreur lors de l\'affectation du panne : ', error);
        }
      );
    }
    
  }

   // Référence à l'élément pop-up dans le template HTML
   @ViewChild('popUp_panne')
   popUp_panne!: ElementRef;
 
   popUpPanne(panne: any) {
    this.popUp_panne.nativeElement.style.display = "flex";
    this.formulaire_modifier_panne.patchValue({
      codeInventaire: panne.ressource.codeInventaire,
      typeRessource: panne.ressource.typeRessource,
    });
   }
   removePopUpPanne() {
    this.popUp_panne.nativeElement.style.display = "none";
   }

   updatePanne() {

   }

   @ViewChild('constat')
   constat!: ElementRef;

   showConstatElements() {
    this.constat.nativeElement.style.display = "flex";
   }

   hideConstatElements() {
    this.constat.nativeElement.style.display = "none";
   }
}
