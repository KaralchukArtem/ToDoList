import { Component, OnInit } from '@angular/core';
import { modelNotes } from './modelServer/modelNotes';
import { NotesService } from '../app/service/notes.service';
import { Observable, Subscriber } from 'rxjs';
import { modelFlagNotes } from './modelServer/modelFlagNotes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent{
  
  title = 'my-app';
  myimage:any;
  flag = {
    flagNote: false,
    flagNoteLableEdit: false,
    flagColum: false
  }
      
  constructor(private notesService: NotesService){};
  
  notes: modelNotes[] = this.notesService.Notes;

  addNote(item:string){
    if(item.trim().length === 0){
      alert("В строке заполниния не должно быть пустоты, попробуйте ещё раз");
    }else{
      this.notesService.addNote(item)
      this.flag.flagNote = false;
      console.log(this.notes);
    }
  }
  
  addColumn(idN:number,item:string){
    if(item.trim().length == 0){
      alert("В строке заполниния не должно быть пустоты, попробуйте ещё раз");
    }else{
      this.notesService.addColumn(idN,item)
      this.notes[idN].flagNote.flagAdd = false;
      console.log(this.notes);
    }
  }

  deleteNote(id:number){
    this.notesService.deleteNote(id);
    this.flag.flagColum = false;
    console.log(this.notes);
  }

  deleteColum(id:number,idCol: number){
    this.notesService.deleteColum(id,idCol);
    console.log(this.notes);
  }

  editColum(colum:any){
    colum.editC = true;
    console.log(this.notes);
  }
  
  updateColum(colum:any){
    if(colum.name.trim().length == 0){
      alert("В строке заполниния не должно быть пустоты, попробуйте ещё раз");
    }else  {
      console.log(this.notes);
      colum.editC = false;
    }
  }

  editNote(note:any){
    note.flagNote.flagEdit = true;
  }

  updateNote(note:any){
    if(note.nameNotes.trim().length == 0){
      alert("В строке заполниния не должно быть пустоты, попробуйте ещё раз");
    } else {
      console.log(this.notes);
      note.flagNote.flagEdit = false;
    }
  }

  ext(name:string):String{
    return name.slice(0,name.indexOf("/"));
  }
  onChange(event: any,idN:number,idCol: number){
    const file = event.target.files[0];
    let extFile = this.ext(file.type);
    if(extFile != "image"){
      alert("Выберите правильный тип файла")
    }else{
      this.convertToBase64(file,idN,idCol) 
      console.log(this.notes);
  }
} 

  convertToBase64(file:File,idN:number,idCol: number){
    console.log("base 64")
    const observable = new Observable((subscriber: Subscriber<any>) =>{
      debugger;
      this.readFile(file,subscriber,idN,idCol);
    })
    observable.subscribe((d)=>{
      console.log(d);
      this.myimage = d;
      debugger;
    })
  }

  readFile(file:File, subscriber: Subscriber<any>,idN:number,idCol: number){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    debugger;
    filereader.onload=()=>{
      subscriber.next(filereader.result);
      this.notesService.addFile(this.myimage,idN,idCol)
      console.log(this.notes);
    debugger;
    }
    filereader.onerror=(error)=>{
      subscriber.error(error);
      subscriber.complete();
    }
  }

}
