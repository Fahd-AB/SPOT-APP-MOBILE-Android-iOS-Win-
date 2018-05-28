import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { Plost } from '../plost/plost';

/**
 * Generated class for the Plostinfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-plostinfo',
  templateUrl: 'plostinfo.html',
})
export class Plostinfo {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Plostinfo');
  }
tohome(){
this.navCtrl.push(Login);
}
gotoplost(){
this.navCtrl.push(Plost);
}


}
