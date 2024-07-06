import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { element } from 'protractor';
import { from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { user,wouh} from "../interfaces/user.interface"
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  dataArray
  add : number = -1
  test 
  successadd
  wouh :wouh [] = []
  name : any
  dataProfile={
    email: '',
    Uid : '',
    name: '',
    password :'',
    image:'',
    
 
  }
  
  

  constructor(private as:AuthService,private fs:AngularFirestore ,private fst:AngularFireStorage , private us:UserService , private route:Router) { }

  ngOnInit(): void {
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




this.fs.collection("users").ref.doc(localStorage.getItem("userConnect")).get().then((data)=>{
  console.log(data.data())
  this.dataProfile.name=data.data()['name']
  this.dataProfile.email=data.data()['email']
  this.dataProfile.password=data.data()['password']
  this.dataProfile.image=data.data()['image']
  this.dataProfile.Uid=localStorage.getItem("userConnect")

  localStorage.setItem("email",this.dataProfile.email)
  localStorage.setItem("UIDprofile",this.dataProfile.Uid)
  localStorage.setItem("name",this.dataProfile.name)





})

 /** 
this.fs.collection("courses").snapshotChanges().subscribe(

  (data)=>{
    this.wouh=data.map(element =>{
      return{
        
        name:element.payload.doc.data()['name'],} })  
      console.log(this.wouh)}




) */

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

    


  forum(index){
    this.test= +index
     this.route.navigate(['icone'])

     localStorage.setItem("idccccccc",this.dataArray[this.test].id)
     localStorage.setItem("idcoursforum",this.test)

  }
 
  }
 


