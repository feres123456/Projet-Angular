import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfguardService {
  isUser: boolean 
  isProf: boolean  
  
  constructor(private as:AuthService, private route:Router,private us:UserService) {
  
   }


   
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): Promise<boolean>
  
  {

    
    return new Promise(resolve => {

      this.as.user.subscribe(user => {
        if (user) {
        this.isUser = true 
        this.as.userId = user.uid
        this.us.getUserData().subscribe(data => {
          if (data['prof']) 
          { this.isProf = true ;
          resolve(true)
          console.log(this.isProf,'success admin')
        
        }  else {
          this.isProf= false
          this.route.navigate(['/'])
            resolve(false) }
          console.log(this.isProf,'admin fail')
            
    

        })
      }else {
        this.isProf= false
        this.route.navigate(['/'])
          resolve(false) }
          console.log(this.isProf,'user fail')
        
        
       
      })
     
        
        })




      }
    }

