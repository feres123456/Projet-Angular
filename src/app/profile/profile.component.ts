import { Component, OnInit } from '@angular/core';
import { AngularFirestore,  } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import {AngularFireStorage, AngularFireStorageReference,AngularFireUploadTask} from '@angular/fire/storage'
import { UserService } from '../services/user.service';
import { coursprofile } from '../interfaces/user.interface'
import { from } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 Uid

  coursprofile : coursprofile [] = []
  add : number = 0
 test : boolean
 datatest
 succesUpdate
 dataProfile={
   email: '',
   Uid : '',
   name: '',
   password :'',
   image:'',
   

 }
task:AngularFireUploadTask
ref:AngularFireStorageReference
 
 

  constructor(private as:AuthService,private fs:AngularFirestore ,private fst:AngularFireStorage, private us:UserService) { 
this.as.user.subscribe((user)=>{
    this.Uid=user.uid
  
})
  }

  ngOnInit(): void {
    this.fs.collection("users").ref.doc(localStorage.getItem("userConnect")).get().then((data)=>{
      console.log(data.data())
      this.dataProfile.name=data.data()['name']
      this.dataProfile.email=data.data()['email']
      this.dataProfile.password=data.data()['password']
      this.dataProfile.image=data.data()['image']
      this.dataProfile.Uid=localStorage.getItem("userConnect")




    })

    this.fs.collection(`users/${localStorage.getItem('userConnect')}/mycourses`).snapshotChanges().subscribe((data)=>{
this.datatest=data.map( test => {
  return{
     veri:test.payload.doc.data()['veri'] 
    
     
  } 
}); console.log(this.datatest)
if(this.datatest === "true"){
  console.log('yeees')
}

    })








    this.us.getmycourses().subscribe(coursprofile => {
      this.coursprofile=coursprofile.map(addcours => {
        return {
          id : addcours.payload.doc.id,
          name : addcours.payload.doc.data()['name'],
          chap : addcours.payload.doc.data()['chap'],
          chapitre : addcours.payload.doc.data()['chapitre'],
           imageprof: addcours.payload.doc.data()['imageprof'],
           description : addcours.payload.doc.data()['description'],
            veri : addcours.payload.doc.data()['veri'],
         
 
           

           

        } 

        
      })  


      
    })


    





  }

  update(){
    this.fs.collection("users").doc(this.dataProfile.Uid).update({
      name:this.dataProfile.name
    }).then(()=>{
      this.succesUpdate="upDated !"
      window.location.reload()
    })
  }

  uploadImage(event){
    const id=Math.random().toString(35).substring(2)
    this.ref=this.fst.ref(id)
    this.task=this.ref.put(event.target.files[0])
    this.task.then((data)=>{
      data.ref.getDownloadURL().then(url =>{
        this.fs.collection("users").doc(this.dataProfile.Uid).update({
          image:url
        })
      })
    })


  }


  delete(index){
    this.us.deletemycourses(this.coursprofile[index].id)
  }




  


}
