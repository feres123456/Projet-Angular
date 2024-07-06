import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';


import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { IconComponent } from './icon/icon.component';
import { InscriComponent } from './inscri/inscri.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfComponent } from './prof/prof.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { AdminService } from './services/admin.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NoAuthGuardService } from './services/no-auth-guard.service';
import { ProfguardService } from './services/profguard.service';
import { TrainersComponent } from './trainers/trainers.component';

const routes: Routes = [
  { path:'home'  , component : HomeComponent } ,
  { path:''  , component : HomeComponent } ,
  { path:'reset'  , component : ResetpassComponent,canActivate:[NoAuthGuardService] } ,
  { path:'inscri'  , component : InscriComponent,canActivate:[NoAuthGuardService]} ,
  { path:'prof' , component : ProfComponent,canActivate:[ProfguardService]},
  { path:'about'  , component : AboutComponent } ,
  { path:'courses'  , component : CoursesComponent,canActivate:[AuthGuardService] } ,
  { path:'contact'  , component : ContactComponent } ,
  { path:'events'  , component : EventsComponent } ,
  { path:'login'  , component : LoginComponent ,canActivate:[NoAuthGuardService]} ,
  
  { path:'trainers'  , component : TrainersComponent } ,
  { path:'profile'  , component : ProfileComponent,canActivate:[AuthGuardService]} ,
  { path:'icone'  , component : IconComponent,canActivate:[AuthGuardService]} ,
  
  { path:'dash'  , component : DashboardComponent,canActivate:[AdminService]} ,








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
