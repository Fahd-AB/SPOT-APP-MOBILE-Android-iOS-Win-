import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Profileinfo } from './profileinfo';

@NgModule({
  declarations: [
    Profileinfo,
  ],
  imports: [
    IonicPageModule.forChild(Profileinfo),
  ],
  exports: [
    Profileinfo
  ]
})
export class ProfileinfoModule {}
