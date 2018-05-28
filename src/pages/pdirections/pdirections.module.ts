import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pdirections } from './pdirections';

@NgModule({
  declarations: [
    Pdirections,
  ],
  imports: [
    IonicPageModule.forChild(Pdirections),
  ],
  exports: [
    Pdirections
  ]
})
export class PdirectionsModule {}
