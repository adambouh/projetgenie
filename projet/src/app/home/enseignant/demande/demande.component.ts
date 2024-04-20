import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EnseignantComponent } from '../enseignant.component';
import { EnseignantService } from '../enseignant.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { HomeService } from '../../home.service';
import { UsersService } from 'src/app/users';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent extends EnseignantComponent implements OnInit{

  private tag = "Demandes"
  protected formulaire_ajout_ordinateur!: FormGroup;
  protected formulaire_ajout_imprimante!: FormGroup;
  protected selectedBesoin: string = 'all';

  constructor(
    private enseignantService: EnseignantService,
    protected override authService: AuthService,
    protected override router: Router,
    protected homeService: HomeService,
    protected userService: UsersService,
    private formbuilder: FormBuilder
  ) {
    super(authService, router, homeService);
    this.formulaire_ajout_ordinateur = this.formbuilder.group({
      cpu: [''],
      ram: [''],
      disque: [''],
      ecran: [''],
    });

    this.formulaire_ajout_imprimante = this.formbuilder.group({
      resolution: [''],
      vitesse: [''],
    });
  }

  override ngOnInit(): void {
    this.setActiveClassToOffres(this.tag);
  }

  // Référence à l'élément pop-up dans le template HTML
  @ViewChild('popUp_ordinateur')
  popUp_ordinateur!: ElementRef;

  @ViewChild('popUpUp_imprimante')
  popUpUp_imprimante!: ElementRef;

  popUpOrdinateur() {
    this.popUp_ordinateur.nativeElement.style.display = "flex";
  }
  popUpImprimante() {
    this.popUpUp_imprimante.nativeElement.style.display = "flex";
  }

  removePopUpOrdinateur() {
    this.popUp_ordinateur.nativeElement.style.display = "none";
  }
  removePopUpImprimante() {
    this.popUpUp_imprimante.nativeElement.style.display = "none";
  }

  sendDemandesToChef() {
    alert("demandes envoyées !!")
  }

  // Méthode pour supprimer un demande
  deleteBesoin(besoin: any): void {
    alert("besoin supprimer")
    // if (demande.etatDemande != "En_Cours_De_Traitement") {
    //   alert("Attention !\nCette demande a déjà été envoyée au responsable. Vous ne pouvez pas la supprimer.")

    // } else {

    //   this.chefService.deletedemandeById(demande.id).subscribe(
    //     (response: any) => {
    //       this.allDemandes = this.allDemandes.filter(dem => dem.id !== demande.id);
    //       this.changeDemandes();
    //       alert("La demande a été supprimée avec succès !!");
    //     },
    //     (error) => {
    //       console.error('Une erreur s\'est produite lors de la suppression du demande : ', error);
    //     }
    //   );
    // }
  }

  changeBesoines() {

  }
}
