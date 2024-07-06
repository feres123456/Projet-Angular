import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {
datatrainer
  constructor(private as:AuthService,private fs:AngularFirestore ,private fst:AngularFireStorage) { }

  ngOnInit(): void {
    
    this.fs.collection("trainer").snapshotChanges().subscribe((data => {
      this.datatrainer=data.map(trainer =>{
        return{
          id : trainer.payload.doc.id,
          name:trainer.payload.doc.data()['name'],
          degre:trainer.payload.doc.data()['degre'],
          description:trainer.payload.doc.data()['description'],
          imageprof:trainer.payload.doc.data()['imageprof']

        }
      })
    }))





  }

}
