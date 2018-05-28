import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Transport } from './transport';

@NgModule({
  declarations: [
    Transport,
  ],
  imports: [
    IonicPageModule.forChild(Transport),
  ],
  exports: [
    Transport
  ]
})
export class TransportModule {}
