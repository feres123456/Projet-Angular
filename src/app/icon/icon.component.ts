import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { forum } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  dataArray
  errorMessage
  number
  coursprofile
  isUser
  isAdmin
  successadd: string;
  add: any;
  constructor(private as:AuthService,private fs:AngularFirestore ,private fst:AngularFireStorage , private us:UserService , private route:Router) { }

  ngOnInit(): void {


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


    this.fs.collection("courses").snapshotChanges().subscribe((data)=>{
      this.dataArray=data.map(element =>{
        return{
          id:element.payload.doc.id,
          name:element.payload.doc.data()['name'],
          chapitre:element.payload.doc.data()['chapitre'],
          description:element.payload.doc.data()['description'],
          imageprof:element.payload.doc.data()['imageprof'],
          chap:element.payload.doc.data()['chap']


        }


      })

})


   this.number=  localStorage.getItem("idcoursforum")
   console.log("num cours",this.number)

   this.us.getforum().subscribe(coursprofile => {
    this.coursprofile=coursprofile.map(addcours => {
      return {
        id : addcours.payload.doc.id,
        name : addcours.payload.doc.data()['name'],
        message : addcours.payload.doc.data()['message'],

       

         

         

      } 

      
    })  


    
  })




 
  }



  addforum(form : NgForm){
    let name = (<forum>form.value).name,
     message = (<forum>form.value).message
     this.us.addnewforum(name ,message)
     .then (add => {
      this.successadd=" Your message has been sent  ! "

     })
     
     
  }
  deleteforum(id){
    this.us.deleteforum(id)
  }



















  
  mycourses(index){
    this.add= +index
    let selectedcours = this.dataArray[this.add]
    let data = {
      name : selectedcours.name,
      chapitre : selectedcours.chapitre,
      chap : selectedcours.chap,
       imageprof : selectedcours.imageprof,
       description : selectedcours.description,
       veri : false,
       idcours : this.dataArray[this.add].id


    }
    let datatwo = {
      name : selectedcours.name,
      chapitre : selectedcours.chapitre,
      chap : selectedcours.chap,
       imageprof : selectedcours.imageprof,
       description : selectedcours.description,
       veri : false,
       nameuser:localStorage.getItem("name"),
       emailuser:localStorage.getItem("email"),
       iduser:localStorage.getItem("UIDprofile"),
       idcours : this.dataArray[this.add].id


     
  

       
       
       
       


    }


    

    

    this.us.addmyCourses(data,this.dataArray[this.add].id)
    .then(() => console.log('nice'))
    this.successadd=" Added To Your Profile!"
    this.us.addcoursesneedveri(datatwo,this.dataArray[this.add].id)
    this.us.addcoursesprof(datatwo,this.dataArray[this.add].id)

    



  }

}
