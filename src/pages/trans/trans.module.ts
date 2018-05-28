import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Trans } from './trans';

@NgModule({
  declarations: [
    Trans,
  ],
  imports: [
    IonicPageModule.forChild(Trans),
  ],
  exports: [
    Trans
  ]
})
export class TransModule {}
