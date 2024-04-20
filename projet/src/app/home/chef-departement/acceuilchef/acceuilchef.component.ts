import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChefDepartementService } from '../chef-departement.service';
import { ChefDepartementComponent } from '../chef-departement.component';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { HomeService } from '../../home.service';
import { UsersService } from 'src/app/users';

@Component({
  selector: 'app-acceuilchef',
  templateUrl: './acceuilchef.component.html',
  styleUrls: ['./acceuilchef.component.css']
})
export class AcceuilchefComponent extends ChefDepartementComponent implements OnInit {

  private tag = 'Acceuil';
  enseignants: any[] = [];
  private chefID!: any;
  private role = "Enseignant";
  private departementID!: any;
  private enseignantsCheckedID: any[] = [];
  enseignantToMessage!: any;
  filtredEnseignants: any[] = [];

  constructor(
    private chefService: ChefDepartementService,
    protected override authService: AuthService,
    protected override router: Router,
    protected homeService: HomeService,
    private userService: UsersService
  ) {
    super(authService, router, homeService);
  }

  override ngOnInit(): void {
    this.setActiveClassToOffres(this.tag);
    this.chefID = localStorage.getItem("id");
    this.departementID = Number(localStorage.getItem("departementID"));
    this.loadEnseignants(this.departementID);
  }

  // List of departement enseignants
  loadEnseignants(departementId: number) {

    this.chefService.getEnseignantsByDepartement(departementId).subscribe(
      (response: any[]) => {
        this.enseignants = response;
        this.enseignants.forEach(enseignant => {
          enseignant.checked = false;
        });
        this.filtredEnseignants = this.enseignants;
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }

  // Demande besoin tasks
  @ViewChild('demanderBesoins')
  demanderBesoins!: ElementRef;

  @ViewChild('demanderBesoinToEnseignant')
  demanderBesoinToEnseignant!: ElementRef;

  // Hide the pop up
  removeDemandeBesoinPopUp() {
    console.log("clicked");

    if (this.demanderBesoins) {
      this.demanderBesoins.nativeElement.style.display = 'none';
    }
    if (this.demanderBesoinToEnseignant) {
      this.demanderBesoinToEnseignant.nativeElement.style.display = 'none';
    }
  }

  // Show demande bosoin pop up
  DemandeBesoinPopUp() {
    this.demanderBesoins.nativeElement.style.display = 'flex';
  }

  DemandeBesoinToEnseignantPopUp(enseignant: any) {
    this.enseignantToMessage = enseignant;
    this.demanderBesoinToEnseignant.nativeElement.style.display = 'flex';
  }

  enseignantsAllChecked: boolean = false;
  toggleSelectAll() {
    this.enseignants.forEach(enseignant => enseignant.checked = this.enseignantsAllChecked);
  }

  toggleEnseignant(check: boolean) {
    if (!check) {
      this.enseignantsAllChecked = false;
    }
  }

  message = "";
  submitDemandeBesoins() {
    if (this.enseignantsAllChecked) {

      this.chefService.sendNotificationToDepartement(this.chefID, this.departementID, this.message).subscribe(
        (reponse: any[]) => {
          alert("La demande est envoyée aux enseignants du département !!");
         },
        (error) => {
          console.error(error);
        }
      );

    } else { // Only some of them

      this.enseignants.forEach(ens => {
        if (ens.checked) {
          this.enseignantsCheckedID.push(ens.id);
        }
      }); // Build list

      this.chefService.addNotificationForListEnseignants(this.chefID, this.message, this.enseignantsCheckedID).subscribe(
        (reponse: any[]) => {
          alert("La demande est envoyée aux enseignants du département que vous avez spécifié !!");
         },
        (error) => {
          console.error(error);
        }
      );
    }
    this.demanderBesoins.nativeElement.style.display = 'none';

  }

  // Send notification to a specific enseignant
  sendMessageToEneignant() {
    // Looking for user id
    const login = String(localStorage.getItem("login"));
    let user!: any;

    this.userService.getUserByLogin(login).subscribe(
      (response: any[]) => {
        user = response;
        this.chefService.sendMessageToEneignant(user.id, this.message, this.enseignantToMessage).subscribe(
          (reponse: any[]) => {
            alert("Le message est envoyé à l'enseignant !!")
          },
          (error) => {
            console.error(error);
          }
        );
      }, (error) => {
        console.log("error while getting user id");
        console.error(error);
      }
    );
    this.demanderBesoinToEnseignant.nativeElement.style.display = 'none';

  }
  // End demande besoins tasks

  // Filtrage
  filterResults(text: string): void {
    if (!text) {
      // If search input is empty, display all users
      this.filtredEnseignants = this.enseignants;
      return;
    }

    // Filter users based on the search query
    this.filtredEnseignants = this.enseignants.filter(
      user => user?.first_name.toLowerCase().includes(text.toLowerCase()) || user?.last_name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
