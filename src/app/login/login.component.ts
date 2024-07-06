import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, fromCollectionRef } from '@angular/fire/firestore';
import { Router} from '@angular/router' ;
import * as firebase from 'firebase';
import { user, userveri } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  constructor(private as :AuthService , private us : UserService , private router : Router,private afAuth:AngularFireAuth) { }
  ngOnInit(): void {

    const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
  
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
  }


  

  signup(form) {
    let data : user = form.value 
    let dataveri : userveri = form.value
    this.as.singup(data.email , data.password )
    
    
    .then(resultat => {
      
      this.errorMessage= ''
      this.us.addNewUser(resultat.user.uid , data.email , data.password,data.name ,data.image,data.verification )  
      localStorage.setItem("userConnect",resultat.user.uid)

      



  }).then(()=>{
    if(data.verification==="true"){
      console.log("cest bon")
    }else{
      console.log('salem w ala 5ir ')
      this.us.addNewUser(firebase.default.auth().currentUser.uid, data.email , data.password,data.name ,data.image,data.verification )
      
      .then(()=>{
        this.as.logout()
        alert("Waiting For ADMIN Confirmation")
      })
    }

    
  })
      

    
    .catch (err => {
      this.errorMessage = err.message 
    })
    
  }

}
