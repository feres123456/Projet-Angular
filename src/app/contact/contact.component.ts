import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { claim} from 'src/app/interfaces/user.interface';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
envoyer
  constructor(private us:UserService) { }

  ngOnInit(): void {

  }

  addNewClaim(form : NgForm){
    let name = (<claim>form.value).name,
     subject=  (<claim>form.value).subject,
     email =  (<claim>form.value).email,
     message = (<claim>form.value).message
     this.us.addNewClaim(name , subject,email,message).then(()=>{
      this.envoyer="Votre message a été envoyer avec succes! "

    })
     
     
  }


}
