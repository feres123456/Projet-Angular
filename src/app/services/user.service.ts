import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { promise } from 'protractor';
import { from } from 'rxjs';
import { AuthService } from './auth.service';
import { user } from "../interfaces/user.interface"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  veri: string = "false"
  constructor(private fs : AngularFirestore , private as : AuthService , private storage:AngularFireStorage) { 
    
  }

addNewUser (id,email,password,name,image,verification) {
 return this.fs.doc('/users/' + id ).set({
  email:email,
  password:password,
  name:name,
id:id,  
image:'https://randomuser.me/api/portraits/lego/6.jpg',
verification:this.veri,
})
}

addcoursesneedveri(data,id){
  return  this.fs.doc('/coursesneedveri/'+id).set(data)
}


addcoursesprof(data,id){
  return  this.fs.doc('/coursprof/'+id).set(data)
}


addNewuserverification (id,email,password,name,image,verification) {
  return this.fs.doc('/needverification/' + id ).set({
   email:email,
   password:password,
   name:name,
 id:id,  
 image:'https://randomuser.me/api/portraits/lego/6.jpg',
verification:this.veri,
 

 })
 }

  /** 
addNewCourses(id,name,chapitre,description,prof,image,imageprof){

  this.fs.collection("courses").add({
    name:name,
    chapitre:chapitre,
    description:description,
    prof:prof,
    image:image,
    id:id,
    imageprof:'https://randomuser.me/api/portraits/lego/6.jpg',


  })
}
*/
getUserData(){
  return this.fs.doc('users/'+this.as.userId).valueChanges()
}




addNewCourses(name,chapitre,description,imageprof,chap){
  return new Promise((resolve, reject)=> {
    let ref = this.storage.ref('courses/' +imageprof.name+Date.now()) 
    let ref1= this.storage.ref('coursespdf/' +chap.name+Date.now())
    
  ref.put(imageprof).then(()=>{
    ref.getDownloadURL().subscribe(photoUrl =>{
      ref1.put(chap).then(()=>{
      ref1.getDownloadURL().subscribe(chapUrl =>{
      this.fs.collection('courses').add({   
        name,
        chapitre,
        description,
        imageprof:photoUrl,
        chap:chapUrl
      
      }).then(()=> resolve(''))
        
            
          })
        })
        
    

      
    })
  })
  })
}






addNewTrainer(name,degre,description,imagetrainer){
  return new Promise((resolve, reject)=> {
    let ref = this.storage.ref('trainer/' +imagetrainer.name+Date.now())
  ref.put(imagetrainer).then(()=>{
    ref.getDownloadURL().subscribe(photoUrl =>{
      this.fs.collection('trainer').add({
        name,
        degre,
        description,
        imageprof:photoUrl
      }).then(()=> resolve(''))
    })
  })
  })



}


addNewEvent(name,time,description,imageevent){
  return new Promise((resolve, reject)=> {
    let ref = this.storage.ref('event/' +imageevent.name+Date.now())
  ref.put(imageevent).then(()=>{
    ref.getDownloadURL().subscribe(photoUrl =>{
      this.fs.collection('event').add({
        name,
        time,
        description,
        imageevent:photoUrl
      }).then(()=> resolve(''))
    })
  })
  })
}


addNewClaim(name,email,subject,message){
  return new Promise((resolve, reject)=> {

      this.fs.collection('Claim').add({
        name,
        email,
        subject,
        message
      }).then(()=> resolve(''))
    
  
  })
}


addmyCourses(data,id){
  return this.fs.doc(`users/${localStorage.getItem('userConnect')}/mycourses/${id}`).set(data)
  /** 
 return this.fs.collection(`users/${localStorage.getItem('userConnect')}/mycourses/${id}`).add(data)   */
}

getmycourses(){
 return this.fs.collection(`users/${localStorage.getItem('userConnect')}/mycourses`).snapshotChanges()

}

deletemycourses(id){
  return this.fs.doc(`users/${localStorage.getItem('userConnect')}/mycourses/${id}`).delete()
}

getforum(){
  return this.fs.collection(`courses/${localStorage.getItem('idccccccc')}/forum`).snapshotChanges()
 
 }

 addnewforum(name,message){
  return this.fs.collection(`courses/${localStorage.getItem('idccccccc')}/forum`).add({
    name,
    message
  })

 }

 deleteforum(id){
  return this.fs.doc(`courses/${localStorage.getItem('idccccccc')}/forum/${id}`).delete()
}

}
