import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Eventinfos } from './eventinfos';

@NgModule({
  declarations: [
    Eventinfos,
  ],
  imports: [
    IonicPageModule.forChild(Eventinfos),
  ],
  exports: [
    Eventinfos
  ]
})
export class EventinfosModule {}
