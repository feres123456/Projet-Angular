import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
dataevent
  constructor(private as:AuthService,private fs:AngularFirestore ,private fst:AngularFireStorage) { }

  ngOnInit(): void {
    this.fs.collection("event").snapshotChanges().subscribe((data => {
      this.dataevent=data.map(event => {
        return{
          id : event.payload.doc.id,
          name : event.payload.doc.data()['name'],
          time : event.payload.doc.data()['time'],
          description : event.payload.doc.data()['description'],
          imageevent:event.payload.doc.data()['imageevent']

        }
      })
    }))
  }

}
