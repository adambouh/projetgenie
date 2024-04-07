import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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


// Import HomeComponent here
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to '/home'
 
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] 
  ,children: [{
    path: 'respo',
    component: responsabledesresources,
    children: [ { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
      { path: 'acceuil', component: AcceuilComponent },
      { path: 'personels', component: PersonnelsComponent }

    ]
  }],
},{ path: 'login', component: LoginComponent },  // Add more routes as needed
];



export class AppRoutingModule {}
export default routes;
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    responsabledesresources,
    AcceuilComponent,
    PersonnelsComponent, // Add HomeComponent to the declarations array
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Configure your routes here
    FormsModule,
    HttpClientModule, 
    MatCardModule, // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent],  
  exports: [RouterModule],
})
export class AppModule {}
