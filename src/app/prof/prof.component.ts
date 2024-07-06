import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { cours } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
  datacours
  datauser

  iSYes
  successMessage: string;
  @ViewChild('imageprof') imageprof:ElementRef
  @ViewChild('chap') chap:ElementRef
  deletedsucces: string;
  succesUpdatecours: string;
  dataProfile={
    email: '',
    Uid : '',
    name: '',
    password :'',
    image:'',
    
 
  }
 

  constructor(private as:AuthService,private fs:AngularFirestore ,private fst:AngularFireStorage , private us:UserService) { }

  ngOnInit(): void {
    this.fs.collection("users").ref.doc(localStorage.getItem("userConnect")).get().then((data)=>{
      console.log(data.data())
      this.dataProfile.name=data.data()['name']
      this.dataProfile.email=data.data()['email']
      this.dataProfile.password=data.data()['password']
      this.dataProfile.image=data.data()['image']
      this.dataProfile.Uid=localStorage.getItem("userConnect")
      localStorage.setItem("UserNameProf",this.dataProfile.name)

      


    })
    this.iSYes=localStorage.getItem("UserNameProf")
    console.log(this.iSYes)


/** affichage collection courses */
this.fs.collection("courses").snapshotChanges().subscribe((data=>{
  this.datacours=data.map(cours =>{
    return {
      id : cours.payload.doc.id,
      name : cours.payload.doc.data()['name'],
      chapitre : cours.payload.doc.data()['chapitre'],
      description : cours.payload.doc.data()['description'] ,
    
    }
     
   
  })

  


}))

this.fs.collection("coursprof").snapshotChanges().subscribe((data=>{
  this.datauser=data.map(cours =>{
    return {
      nameuser:  cours.payload.doc.data()['nameuser'],
      name : cours.payload.doc.data()['name'],
      chapitre : cours.payload.doc.data()['chapitre'],
      description : cours.payload.doc.data()['description'] ,
      emailuser : cours.payload.doc.data()['emailuser']
    
    }
     
   
  })

  


}))





  }
  logout( ){
    this.as.logout().then(() => console.log('out'))
    
    }

    addNewCourses(form : NgForm){
      let name = (<cours>form.value).name,
       chapitre =  (<cours>form.value).chapitre,
       description =  (<cours>form.value).description,
       chap = (<HTMLInputElement>this.chap.nativeElement).files[0],
      imageprof = (<HTMLInputElement>this.imageprof.nativeElement).files[0]

       this.us.addNewCourses(name , chapitre,description,imageprof,chap).then(()=>{
        this.successMessage="added !" 
        window.location.reload()



      })

    }


    /** fn delete courses */

    delete(form){
      let data= form.value
      console.log(data.idsupp)
      this.fs.collection("courses").doc(data.idsupp).delete()
      .then(()=>{
        this.deletedsucces="deleted"
      window.location.reload()

        
      })  
    }


    updatecourses(form){
      let dataupcours=form.value
      this.fs.collection("courses").doc(dataupcours.idcours).update({
        name:dataupcours.name,
        chapitre:dataupcours.chapitre,
        description:dataupcours.description,
        imageprof:dataupcours.imageprof,
        
        
      }).then(()=>{
        this.succesUpdatecours="upDated !"
        window.location.reload()
      })
    }






}
