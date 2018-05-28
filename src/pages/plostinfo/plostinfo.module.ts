import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Plostinfo } from './plostinfo';

@NgModule({
  declarations: [
    Plostinfo,
  ],
  imports: [
    IonicPageModule.forChild(Plostinfo),
  ],
  exports: [
    Plostinfo
  ]
})
export class PlostinfoModule {}
