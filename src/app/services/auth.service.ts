import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app'
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 user: Observable<firebase.default.User>
userId : string = ''
  constructor(private afAuth : AngularFireAuth, private router:Router) { 
    this.user= this.afAuth.user
    
  }



  


  
  singup(email , password) {
return firebase.default.auth().createUserWithEmailAndPassword(email,password)



 

    /**
    return this.afAuth.createUserWithEmailAndPassword(email , password)
  */
    
    
  }


  resetPassword(email : string) {
    return firebase.default.auth().sendPasswordResetEmail(email)
    .then(()=>{
      console.log('Sent veri')
      this.router.navigate['']
    })
  }
  


  login(email , password) {
    return this.afAuth.signInWithEmailAndPassword(email,password).
    then((user)=>{

      /** 
      this.afAuth.user.subscribe(x => {
        if(x.emailVerified){
           
          console.log("email verifier broo")
          
        } else{
          alert('Admin will send you a verification email soon')
          console.log("email non verifier")
          this.afAuth.signOut()
          
        }
      })
        
      */

     
        
      localStorage.setItem("userConnect",user.user.uid)
    })
  }


 /** 
  login(email , password) {
    return this.afAuth.signInWithEmailAndPassword(email,password).
    then((user)=>{
        
      localStorage.setItem("userConnect",user.user.uid)
    })
  }
  */

logout (){
  return this.afAuth.signOut()
  localStorage.setItem("userVerifiation",'No one connected')


}


/**  email verification conenct without password
sendemail(email : string){
const actionCodeSettings = {
   url: 'http://localhost:4200/loginn',
   handleCodeInApp: true,
  }
  this.afAuth.sendSignInLinkToEmail(email,actionCodeSettings)
  console.log("sent email validation")


}
*/


}
