import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Oldpay } from './oldpay';

@NgModule({
  declarations: [
    Oldpay,
  ],
  imports: [
    IonicPageModule.forChild(Oldpay),
  ],
  exports: [
    Oldpay
  ]
})
export class OldpayModule {}
