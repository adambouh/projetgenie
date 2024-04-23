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
  myPannes: any[] = [];
  myFiltredPannes: any[] = [];

  protected panneToUpdate!: any;

  newPannes: any[] = [];
  newFiltredPannes: any[] = [];

  private technicienID!: any;
  protected selectedPannes: string = 'All';
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
      codeInventaire: [{ value: '', disabled: true }],
      typeRessource: [{ value: '', disabled: true }],
      etat: ['Repare'],
      explication: [''],
      frequence: ['rare'],
      ordre: ['Matériel'],
      ordreLogiciel: ['Logiciel utilitaire'],
      dateApparition: ['']
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

    if (this.selectedPannes == "All") {
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
      panne => String(panne?.ressource.codeInventaire).toLowerCase().includes(text.toLowerCase()) || panne?.ressource.typeRessource.toLowerCase().includes(text.toLowerCase()) || panne?.etatPanne.toLowerCase().includes(text.toLowerCase()) || String(panne?.dateSignal).includes(text)
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

  @ViewChild('ordrePanne')
  ordrePanne!: ElementRef;

  popUpPanne(panne: any) {
    if (panne.etatPanne == "EnCours") {

      this.panneToUpdate = panne;
      this.popUp_panne.nativeElement.style.display = "flex";
      this.formulaire_modifier_panne.patchValue({
        codeInventaire: panne.ressource.codeInventaire,
        typeRessource: panne.ressource.typeRessource,
      });

      const dateApparitionInput = document.getElementById('dateApparition') as HTMLInputElement;

      //la date maximale autorisée
      const dateMax = panne.dateSignal;

      // Appliquer la date maximale à l'attribut max
      dateApparitionInput.setAttribute('max', dateMax);

      if (panne.ressource.typeRessource == "Imprimante") {
        this.ordrePanne.nativeElement.style.display = "none";
      }
    } else {
      alert("Cette panne est déja traitée!!");
    }

  }

  removePopUpPanne() {
    this.popUp_panne.nativeElement.style.display = "none";
    this.hideConstatElements();
    this.ordrePanne.nativeElement.style.display = "grid";
  }

  updatePanne() {
    const etatPanne = this.formulaire_modifier_panne.get('etat')?.value;
    if (etatPanne == "Repare") {

      this.technicienService.changePanneStatus(this.panneToUpdate.id, etatPanne).subscribe(
        (response: any[]) => {
          alert("La panne a été bien modifiée (Réparée)");
        },
        (error: any) => {
          console.error('Erreur lors de changement de l\'etat du panne : ', error);
        }
      );

    } else {

      let ordreOfPanne = this.formulaire_modifier_panne.get('ordre')?.value;
      if (ordreOfPanne != "Matériel") {
        ordreOfPanne =  this.formulaire_modifier_panne.get('ordreLogiciel')?.value;
      }

      const constat = {
        panne_id: this.panneToUpdate.id,
        explication: this.formulaire_modifier_panne.get('explication')?.value || '',
        frequenceConstat: this.formulaire_modifier_panne.get('frequence')?.value || 'Rare',
        dateApparition: this.formulaire_modifier_panne.get('dateApparition')?.value || this.panneToUpdate.dateSignal,
        ordre: ordreOfPanne
      };

      this.technicienService.addConstat(constat).subscribe(
        (response: any[]) => {

          this.technicienService.changePanneStatus(this.panneToUpdate.id, etatPanne).subscribe(

            (response: any[]) => {
              alert("La panne a été bien modifiée (Sévère) et la constat a été bien enregistrée");
            },
            (error: any) => {
              console.error('Erreur lors de changement de l\etat du panne : ', error);
            }

          );

        },
        (error: any) => {
          console.error('Erreur lors de d\'ajout d constat : ', error);
        }
      );

    }

    this.removePopUpPanne();
    this.myPannes.forEach(p => {
      if( p.id == this.panneToUpdate.id) {
        p.etatPanne = "Repare";
      }
    })
    this.myFiltredPannes = this.myPannes;
    this.changeMyPannes();
  }

  @ViewChild('constat')
  constat!: ElementRef;

  showConstatElements() {
    this.constat.nativeElement.style.display = "flex";
  }

  hideConstatElements() {
    this.constat.nativeElement.style.display = "none";
    
    this.formulaire_modifier_panne.reset({
      codeInventaire: '',
      typeRessource: '',
      etat: 'Repare',
      explication: '',
      frequence: 'rare',
      ordre: 'Matériel',
      ordreLogiciel: 'Logiciel utilitaire',
      dateApparition: ''
    });

    this.hideDefautPanne();
  }

  @ViewChild('defautPanne')
  defautPanne!: ElementRef;

  showDefautPanne() {
    this.defautPanne.nativeElement.style.display = "grid";
  }

  hideDefautPanne() {
    this.defautPanne.nativeElement.style.display = "none";
  }

}
