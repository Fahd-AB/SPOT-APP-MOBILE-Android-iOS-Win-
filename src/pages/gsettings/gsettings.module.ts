import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Gsettings } from './gsettings';

@NgModule({
  declarations: [
    Gsettings,
  ],
  imports: [
    IonicPageModule.forChild(Gsettings),
  ],
  exports: [
    Gsettings
  ]
})
export class GsettingsModule {}
