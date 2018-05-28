import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Position } from './position';

@NgModule({
  declarations: [
    Position,
  ],
  imports: [
    IonicPageModule.forChild(Position),
  ],
  exports: [
    Position
  ]
})
export class PositionModule {}
