import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ],
  
  exports: [  //Tenemos que agregar este export para que realmente las librerias se puedan ver desde fuera
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
