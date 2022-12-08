import { Injectable } from '@angular/core';
import { modelNotes } from '../model/modelNotes';

@Injectable({
  providedIn: 'root'
})

export class NotesService {

  Notes: modelNotes[] = [];

  constructor() { }

  addNote(item:string){
    this.Notes.push({idNotes:this.Notes.length.toString(),nameNotes:item,colum:[],editN:false})
  }

  addColumn(idN:number, item:string){
    let idC:number = Math.round(Math.random()*(idN +100 ));
    console.warn("idC + "+ idC);
    this.Notes[idN].colum.push({id:idC.toString(),name:item,editC:false,img:''})
    console.warn(this.Notes);
  }

  deleteNote(id:number){
    console.warn("before " + id)
    this.Notes.splice(id, 1);
    console.warn("delete " + this.Notes)
    
  }

  deleteColum(id:number,idCol:number){
    console.warn("before C" + id)
    this.Notes[id].colum.splice(idCol, 1);
    console.warn("delete C" + this.Notes)
    
  }
  
  addFile(file: string,idN:number, idCol:number){
    this.Notes[idN].colum[idCol].img = file;
    console.warn("add File" + this.Notes)

  }

}
