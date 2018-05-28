import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Eventedit } from './eventedit';

@NgModule({
  declarations: [
    Eventedit,
  ],
  imports: [
    IonicPageModule.forChild(Eventedit),
  ],
  exports: [
    Eventedit
  ]
})
export class EventeditModule {}
