import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule here
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { MatCardModule } from '@angular/material/card';
import { responsabledesresources } from './home/responsable-des-resources/responsable-des-resources.component';
import { AcceuilComponent } from './home/responsable-des-resources/acceuil/acceuil.component';
import { PersonnelsComponent } from './home/responsable-des-resources/personnels/personnels.component';
import { ChefDepartementComponent } from './home/chef-departement/chef-departement.component';
import { AcceuilchefComponent } from './home/chef-departement/acceuilchef/acceuilchef.component';
import { DemandesComponent } from './home/chef-departement/demandes/demandes.component';

import { ProfileComponent } from './home/responsable-des-resources/profile/profile.component';
import { PersonnelComponent } from './home/responsable-des-resources/personnel/personnel.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgForOf } from '@angular/common';
import { EnseignantComponent } from './home/enseignant/enseignant.component';
import { DemandeComponent } from './home/enseignant/demande/demande.component';
import { AcceuilEnseignantComponent } from './home/enseignant/acceuil-enseignant/acceuil-enseignant.component';
import { NotificationEnsComponent } from './home/enseignant/notification-ens/notification-ens.component';
import { NotificationsComponent } from './home/notifications/notifications.component';
import { NotificationChefComponent } from './home/chef-departement/notification-chef/notification-chef.component';
import { TechnicienComponent } from './home/technicien/technicien.component';
import { PannesTechComponent } from './home/technicien/pannes-tech/pannes-tech.component';
import { PublicComponent } from './public/public.component';

// Import HomeComponent here
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to '/home'

  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
    , children: [{
      path: 'respo',
      component: responsabledesresources,
      children: [{ path: '', redirectTo: 'acceuil', pathMatch: 'full' },
      { path: 'acceuil', component: AcceuilComponent },
      { path: 'personels', component: PersonnelsComponent },
      { path: 'Profile', component: ProfileComponent },
      { path: 'personels/:id', component: PersonnelComponent }


      ]
    },
    {
      path: "chefdep",
      component: ChefDepartementComponent,
      children: [
        { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
        { path: "demandes", component: DemandesComponent },
        { path: "acceuil", component: AcceuilchefComponent },
        { path: "notifications", component: NotificationChefComponent },
      ]
    },
    {
      path: "enseignant",
      component: EnseignantComponent,
      children: [
        { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
        { path: "demandes", component: DemandeComponent },
        { path: "acceuil", component: AcceuilEnseignantComponent },
        { path: "notifications", component: NotificationEnsComponent },
      ]
    },
    {
      path: "technicien",
      component: TechnicienComponent,
      children: [
        { path: '', redirectTo: 'pannes', pathMatch: 'full' },
        { path: "pannes", component: PannesTechComponent },
      ]
    },
    ],
  },
  { path: 'login', component: LoginComponent },  // Add more routes as needed
  { path: 'public-sapce', component: PublicComponent},

];

export class AppRoutingModule { }
export default routes;
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    responsabledesresources,
    AcceuilComponent,
    AcceuilchefComponent,
    PersonnelsComponent,
    ChefDepartementComponent,
    AcceuilEnseignantComponent,
    DemandesComponent, // Add HomeComponent to the declarations array
    ProfileComponent, PersonnelComponent, EnseignantComponent, DemandeComponent, NotificationEnsComponent, NotificationChefComponent, NotificationsComponent, TechnicienComponent, // Add HomeComponent to the declarations array
    PannesTechComponent, PublicComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Configure your routes here
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgFor,
    NgForOf,
    RouterLink,
    MatCardModule, // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule { }
