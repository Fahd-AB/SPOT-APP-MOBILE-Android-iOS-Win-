import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  App, ViewController,ModalController, AlertController, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Password } from '../password/password';
import { History } from '../history/history';
/**
 * Generated class for the Gsettings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gsettings',
  templateUrl: 'gsettings.html',
})
export class Gsettings {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
     private app: App,public viewCtrl: ViewController, public modalCtrl: ModalController,
     private storage :Storage,public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http : Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Gsettings');
  }
  gotomain(){
    this.viewCtrl.dismiss();

  //this.app.getRootNav().setRoot( Tabs );
  }
 tomdp(){
   this.viewCtrl.dismiss();
   let modal= this.modalCtrl.create(Password);
   modal.present();
 }
tohistory(){
  this.viewCtrl.dismiss();
  let modal= this.modalCtrl.create(History);
  modal.present();
}

}
