import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Places } from './places';

@NgModule({
  declarations: [
    Places,
  ],
  imports: [
    IonicPageModule.forChild(Places),
  ],
  exports: [
    Places
  ]
})
export class PlacesModule {}
