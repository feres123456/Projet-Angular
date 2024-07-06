import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {
email:string

  constructor(private auth:AuthService , private router:Router) { }

  ngOnInit(): void {
  }
  resetPassword(){
   return   this.auth.resetPassword(this.email)
  .then(()=> { 
    
  document.getElementById("msg").innerHTML=(" Check Your Email To change your password")
  
  }
  )
}




goback(){
  this.router.navigate(['login'])
}




}
