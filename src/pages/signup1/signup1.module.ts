import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Signup1 } from './signup1';

@NgModule({
  declarations: [
    Signup1,
  ],
  imports: [
    IonicPageModule.forChild(Signup1),
  ],
  exports: [
    Signup1
  ]
})
export class Signup1Module {}
