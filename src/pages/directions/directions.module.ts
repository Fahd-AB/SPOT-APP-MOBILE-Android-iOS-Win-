import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Directions } from './directions';

@NgModule({
  declarations: [
    Directions,
  ],
  imports: [
    IonicPageModule.forChild(Directions),
  ],
  exports: [
    Directions
  ]
})
export class DirectionsModule {}
