import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Payement } from './payement';

@NgModule({
  declarations: [
    Payement,
  ],
  imports: [
    IonicPageModule.forChild(Payement),
  ],
  exports: [
    Payement
  ]
})
export class PayementModule {}
