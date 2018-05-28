import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Plost } from './plost';

@NgModule({
  declarations: [
    Plost,
  ],
  imports: [
    IonicPageModule.forChild(Plost),
  ],
  exports: [
    Plost
  ]
})
export class PlostModule {}
