import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { profile } from 'node:console';
import { user } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-inscri',
  templateUrl: './inscri.component.html',
  styleUrls: ['./inscri.component.css']
})
export class InscriComponent implements OnInit {
  errorMessage: string;
  errorVeri
  result1 : string ;
  isUser
  isveri

  constructor(private as :AuthService  , private router : Router, private us:UserService) { }
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


  login(form) {
    let data = form.value
    this.as.login(data.email, data.password).then(resultat => {
 this.errorMessage= ''
 this.as.user.subscribe(user => {
  if (user) {
  this.isUser = true 
  this.as.userId = user.uid
  this.us.getUserData().subscribe(data => {
    
    if ( data['verification'] === "true"){  
      
    localStorage.setItem("userVerifiation","true")

    }else{ 
      this.errorVeri = 'Waiting For ADMIN Verification'
      alert(this.errorVeri)
      this.as.logout()
      window.location.reload()

      
      
    }
    console.log(this.errorVeri)
  })
}else{
  localStorage.setItem("userVerifiation",'No one connected')
  

}
  
 

})

   





}).catch(err => {
  this.errorMessage = err.message 
})




 
 
      
     

       /**  this.router.navigate(['home'])  */
        
     
         

      
    
  }


  


}