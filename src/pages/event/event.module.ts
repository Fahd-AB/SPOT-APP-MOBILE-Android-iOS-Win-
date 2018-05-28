import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Event } from './event';

@NgModule({
  declarations: [
    Event,
  ],
  imports: [
    IonicPageModule.forChild(Event),
  ],
  exports: [
    Event
  ]
})
export class EventModule {}
