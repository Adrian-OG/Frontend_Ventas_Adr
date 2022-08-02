import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent  {
  listaCurso: string[] = ['TypeScript', 'Javascript', 'JavaSE', 'C#', 'PHP'];
  habilitar: boolean = true;

  constructor() { }
  setHabilitar(): void{

   if (this.habilitar ==true) {
    this.habilitar=false
   }else{
    this.habilitar=true
   }
  }
 

}
