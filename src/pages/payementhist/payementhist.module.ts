import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Payementhist } from './payementhist';

@NgModule({
  declarations: [
    Payementhist,
  ],
  imports: [
    IonicPageModule.forChild(Payementhist),
  ],
  exports: [
    Payementhist
  ]
})
export class PayementhistModule {}
