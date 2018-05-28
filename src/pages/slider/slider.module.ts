import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Slider } from './slider';

@NgModule({
  declarations: [
    Slider,
  ],
  imports: [
    IonicPageModule.forChild(Slider),
  ],
  exports: [
    Slider
  ]
})
export class SliderModule {}
