import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isUser: boolean 
  isAdmin : boolean  
  
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
          if (data['admin']) 
          { this.isAdmin = true ;
          resolve(true)
          console.log(this.isAdmin,'success admin')
        
        }  else {
          this.isAdmin= false
          this.route.navigate(['/'])
            resolve(false) }
          console.log(this.isAdmin,'admin fail')
            
    

        })
      }else {
        this.isAdmin= false
        this.route.navigate(['/'])
          resolve(false) }
          console.log(this.isAdmin,'user fail')
        
        
       
      })
     
        
        })




      }
    }


