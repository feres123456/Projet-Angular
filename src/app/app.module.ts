import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule} from '@angular/fire' ; 
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth' ;
import { FormsModule } from '@angular/forms' ;


import { from } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { TrainersComponent } from './trainers/trainers.component';
import { EventsComponent } from './events/events.component';

import { ContactComponent } from './contact/contact.component';
import { IconComponent } from './icon/icon.component';

import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InscriComponent } from './inscri/inscri.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetpassComponent } from './resetpass/resetpass.component';

import { ProfComponent } from './prof/prof.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CoursesComponent,
    TrainersComponent,
    EventsComponent,
    
    ContactComponent,
    IconComponent,
    
    LoginComponent,
    NavbarComponent,
    InscriComponent,
    DashboardComponent,
    ProfileComponent,
    ResetpassComponent,
    
    ProfComponent,
    
  ],
  imports: [
    AngularFireModule.initializeApp( {
      apiKey: "AIzaSyByyWmbhoZG9pkhD6cbOMdmVrgO0HXPlhI",
    authDomain: "projetpfe-bf326.firebaseapp.com",
    projectId: "projetpfe-bf326",
    storageBucket: "projetpfe-bf326.appspot.com",
    messagingSenderId: "509636907849",
    appId: "1:509636907849:web:4f141a24a5186dc1940098",
    measurementId: "G-81DP7V9XP0"
    }),
    AngularFireDatabaseModule ,
    FormsModule ,
    BrowserModule,
    AppRoutingModule ,
    AngularFirestoreModule ,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
