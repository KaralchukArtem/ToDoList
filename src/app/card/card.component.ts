import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { modelCard } from '../modelServer/modelCard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  //... @iNJECT, serch information about this decoration

  constructor(@Inject(MAT_DIALOG_DATA) public data:modelCard,
   private matDialogRef: MatDialogRef<CardComponent>) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  
  onCloseClick(){
    this.matDialogRef.close();
  }

}
