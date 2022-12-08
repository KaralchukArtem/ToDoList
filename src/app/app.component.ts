import { Component, OnInit } from '@angular/core';
import { modelNotes } from './model/modelNotes';
import { NotesService } from '../app/service/notes.service';
import { Observable, Subscriber } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  title = 'my-app';
  myimage:any;

  constructor(private notesService: NotesService){};
  
  notes: modelNotes[] = this.notesService.Notes;

  addNote(item:string){
    this.notesService.addNote(item)
    console.warn(this.notes);
  }
  
  addColumn(idN:number,item:string){
    this.notesService.addColumn(idN,item)
    console.warn(this.notes);
  }

  deleteNote(id:number){
    this.notesService.deleteNote(id);
    console.warn(this.notes);
  }

  deleteColum(id:number,idCol: number){
    this.notesService.deleteColum(id,idCol);
    console.warn(this.notes);
  }

  editColum(colum:any){
    colum.editC = true;
  }
  
  editNote(note:any){
    note.editN = true;
  }

  onChange(event: any){
    const file = event.target.files[0];
    console.log(file);
    this.convertToBase64(file)  
} 

ff

  convertToBase64(file:File){
    const observable = new Observable((subscriber: Subscriber<any>) =>{
      this.readFile(file,subscriber);
    })
    observable.subscribe((d)=>{
      console.log(d);
      this.myimage = d;
    })
  }

  readFile(file:File, subscriber: Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload=()=>{
      subscriber.next(filereader.result);
    }
    filereader.onerror=(error)=>{
      subscriber.error(error);
      subscriber.complete();
    }
  }


  // onFileSelected(event: any,id:number,idCol: number) {
  //   debugger;
  //   const file = event.target.files[0];

  //       // Set file as image source
  //       // imageElement.src = URL.createObjectURL(file);
  //   console.log(URL.createObjectURL(file))
  //   this.notesService.addFile(URL.createObjectURL(file),id,idCol);
  // }
  
}
