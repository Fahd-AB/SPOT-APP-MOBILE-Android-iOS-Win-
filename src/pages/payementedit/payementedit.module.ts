import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Payementedit } from './payementedit';

@NgModule({
  declarations: [
    Payementedit,
  ],
  imports: [
    IonicPageModule.forChild(Payementedit),
  ],
  exports: [
    Payementedit
  ]
})
export class PayementeditModule {}
