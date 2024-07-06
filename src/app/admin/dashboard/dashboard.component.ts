import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage , AngularFireStorageReference,AngularFireUploadTask } from '@angular/fire/storage';
import { EmailValidator, NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { cours, user , trainer, event, addnewuseradmin} from 'src/app/interfaces/user.interface';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
dataArray
datadelete
datacours
dataclaim
datatrainer
dataevent
dataupcours
supptrainersuccess
Uid
persentages
path:string
task:AngularFireUploadTask
task1:AngularFireUploadTask
dataneedveri

ref:AngularFireStorageReference
red1: AngularFireStorageReference
successMessage
datacoursneedveri
successAddUserAdmin
deletedsucces
successTrainer
successevent
suppeventsuccess
succesUpdatecours
suppclaimsuccess
add:number
  @ViewChild('imageprof') imageprof:ElementRef
  @ViewChild('imagetrainer') imagetrainer:ElementRef
  @ViewChild('imageevent') imageevent:ElementRef
  @ViewChild('chap') chap:ElementRef



  constructor(private as:AuthService,private fs:AngularFirestore ,private fst:AngularFireStorage , private us:UserService) {
    this.as.user.subscribe((user)=>{
      this.Uid=user.uid
    
  })
   }

  ngOnInit(): void {
    this.fs.collection("users").snapshotChanges().subscribe((data)=>{
      this.dataArray=data.map(element =>{
        
       return {
        
         id:element.payload.doc.id ,
         name:element.payload.doc.data()['name'],
         email:element.payload.doc.data()['email'],
         password:element.payload.doc.data()['password'],
         verification:element.payload.doc.data()['verification'],
         prof:element.payload.doc.data()['prof']
         

       }

      })
    })







this.fs.collection("coursesneedveri").snapshotChanges().subscribe((data)=>{
  this.datacoursneedveri=data.map(coursesveri =>{
    return {
      iduser : coursesveri.payload.doc.data()['iduser'],
      emailuser : coursesveri.payload.doc.data()['emailuser'],
      nameuser : coursesveri.payload.doc.data()['nameuser'],
      chapitre : coursesveri.payload.doc.data()['chapitre'],
      veri : coursesveri.payload.doc.data()['veri'],
      idcours : coursesveri.payload.doc.data()['idcours'],
      
    }
  })
})



/** affichage collection courses */
    this.fs.collection("courses").snapshotChanges().subscribe((data=>{

      this.datacours=data.map(cours =>{

        return{
          id : cours.payload.doc.id,
          name : cours.payload.doc.data()['name'],
          chapitre : cours.payload.doc.data()['chapitre'],
          description : cours.payload.doc.data()['description'],



        }
      })
    }))
    


    this.fs.collection("trainer").snapshotChanges().subscribe((data => {
      this.datatrainer=data.map(trainer =>{
        return{
          id : trainer.payload.doc.id,
          name:trainer.payload.doc.data()['name'],
          degre:trainer.payload.doc.data()['degre'],
          description:trainer.payload.doc.data()['description'],

        }
      })
    }))


    this.fs.collection("event").snapshotChanges().subscribe((data => {
      this.dataevent=data.map(event => {
        return{
          id : event.payload.doc.id,
          name : event.payload.doc.data()['name'],
          time : event.payload.doc.data()['time'],
          description : event.payload.doc.data()['description'],

        }
      })
    }))


    this.fs.collection("Claim").snapshotChanges().subscribe((data => {
      this.dataclaim=data.map(event =>{
        return{
          id:event.payload.doc.id,
          name:event.payload.doc.data()['name'],
          email:event.payload.doc.data()['email'],
          subject:event.payload.doc.data()['subject'],
          message:event.payload.doc.data()['message']


        }
      })
    }))





   }
    
   
   /** 
    addcourses(f){
      let data=f.value
    this.fs.collection("courses").add({
      
      name:data.name,
      chapitre:data.chapitre,
      description:data.description,
      imageprof:data.imageprof,
  
    })  .then(()=>{
      this.successMessage="added !"
    })
  }   

 
  */


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

    addNewTrainer(form : NgForm){
      let name = (<trainer>form.value).name,
      degre =(<trainer>form.value).degre,
      description = (<trainer>form.value).description,
      imagetrainer=(<HTMLInputElement>this.imagetrainer.nativeElement).files[0]
      this.us.addNewTrainer(name,degre,description,imagetrainer).then(()=>{
        this.successTrainer="added ! "
      window.location.reload()


      })
    }
    

    addNewEvent(form : NgForm){
      let name = (<event>form.value).name,
      time =(<event>form.value).time,
      description = (<event>form.value).description,
      imageevent=(<HTMLInputElement>this.imageevent.nativeElement).files[0]
      this.us.addNewEvent(name,time,description,imageevent).then(()=>{
        this.successevent="added ! "
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


    deletetrainer(form){
      let data= form.value
      this.fs.collection("trainer").doc(data.trainersupp).delete()
      .then(()=>{
        this.supptrainersuccess="deleted ! "
      window.location.reload()

        
      })  
    }

    deleteevent(form){
      let data= form.value
      this.fs.collection("event").doc(data.eventsupp).delete()
      .then(()=>{
        this.suppeventsuccess="deleted ! "
      window.location.reload()

        
      })  
    }

    deleteclaim(form){
      let data=form.value
      this.fs.collection("Claim").doc(data.claimsupp).delete()
      .then(()=>{
        this.suppclaimsuccess="deleted ! "
      window.location.reload()

      })
    }

      /** 
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
    */


    addcoursesveri(iduser,idcours){
      this.fs.doc(`users/${iduser}/mycourses/${idcours}`).update({
        veri : true,
      }) .then(del => {
        this.fs.collection("coursesneedveri").doc(idcours).delete()
      })
    }


    veri(id){
      this.fs.collection("users").doc(id).update({
        verification: "true" ,
      }).then( o => {

        this.fs.collection("needverification").doc(id).delete()



      })
    
      

    }



    ban(id,verification){
      if(verification==="true"){
        this.fs.collection("users").doc(id).update({
          verification:"false"
        })
      }else{
        this.fs.collection("users").doc(id).update({
          verification:"true"

        })
      }
      
    }


    deleteUserNoVeri(id){
      this.fs.collection("users").doc(id).delete()
      this.fs.collection("needverification").doc(id).delete()

    }


    deletecoursveri(iduser,idcours){
      this.fs.doc(`users/${iduser}/mycourses/${idcours}`).delete()
      this.fs.collection("coursesneedveri").doc(idcours).delete()
      
    }

    addprof(id){
      this.fs.collection("users").doc(id).update({
        prof:true
      })
    }

    Deleteprof(id){
      this.fs.collection("users").doc(id).update({
        prof:false
      })
    }

  }

  


  

