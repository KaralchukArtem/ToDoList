import { Injectable } from '@angular/core';
import { modelFlagNotes } from '../modelServer/modelFlagNotes';
import { modelNotes } from '../modelServer/modelNotes';

@Injectable({
  providedIn: 'root'
})

export class NotesService {

  Notes: modelNotes[] = [];

  constructor() { }

  addNote(item:string){
    console.log(this.Notes.length.toString());
    debugger
    
    this.Notes.push({
      id: this.Notes.length.toString(),
      nameNotes: item,
      card: [],
      flagNote: new modelFlagNotes
    });

  let id = this.Notes.length-1;
  
  this.Notes[id].flagNote = {
    flagDelete: false,
    flagEdit: false,
    flagAdd: false
  }

    debugger
  console.log("flag = " + this.Notes[id].flagNote)
  }

  addColumn(idN:number, item:string){
    let idC:number = Math.round(Math.random()*(idN +100 ));

    console.warn("idC + "+ idC);

    this.Notes[idN].card.push({
      id:idC.toString(),
      name:item,
      editC:false,
      img:[]})

    console.warn(this.Notes);
  }

  deleteNote(id:number){
    console.warn("before " + id)

    this.Notes.splice(id, 1);

    console.warn("delete " + this.Notes)
    
  }

  deleteColum(id:number,idCol:number){
    console.warn("before C" + id)

    this.Notes[id].card.splice(idCol, 1);

    console.warn("delete C" + this.Notes)
    
  }
  
  addFile(file: string,idN:number, idCol:number){
    let idImg:number = Math.round(Math.random()*(idN +100 ));
    this.Notes[idN].card[idCol].img.push({id:idImg.toString(),Base64: file});

    console.warn("add File" + this.Notes)

  }

}
