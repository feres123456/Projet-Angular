import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUser: boolean = false
  isAdmin : boolean = false
  isProf : boolean = false
  
  constructor(private as:AuthService , private us: UserService) { }

  ngOnInit(): void {
const navbar = document.getElementById('navbar');
const mobile = document.getElementById('mobile') ;
  mobile.addEventListener('click', () => {
  mobile.classList.toggle("bi-list");
  mobile.classList.toggle("bi-x");
	navbar.classList.toggle("navbar-mobile");
});


    this.as.user.subscribe(user => {
      if (user) {
      this.isUser = true 
      this.as.userId = user.uid
      this.us.getUserData().subscribe(data => {
        if (data['admin']) this.isAdmin = true ;
      })
    }
      
      else this.isUser= false
     this.as.userId=''
    })


    this.as.user.subscribe(user => {
      if (user) {
      this.isUser = true 
      this.as.userId = user.uid
      this.us.getUserData().subscribe(data => {
        if (data['prof']) this.isProf = true ;
      })
    }
      
      else this.isUser= false
     this.as.userId=''
    })









  }

  

logout( ){
this.as.logout().then(() => console.log('out'))
window.location.reload()


}

 


}

