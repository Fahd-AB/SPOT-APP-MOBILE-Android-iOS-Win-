import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';
import { Login } from '../login/login';
import { Plostinfo } from '../plostinfo/plostinfo';
import { Http } from '@angular/http';
import { Connexion } from '../../classes/connexion';
import { Demande_recuperation } from '../../classes/demande_recuperation';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the Plost page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-plost',
  templateUrl: 'plost.html',
})
export class Plost {
  email : string;
  tel : string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
     public http : Http, public loadingCtrl: LoadingController,private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Plost');
  }


  showAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: 'Votre demande de récupération a été envoyé.',
        buttons: ['OK']
      });
      alert.present();
    }


    showerrcreateAlert() {
        let alert = this.alertCtrl.create({
          title: '',
          mode: 'ios',
          subTitle: "Un problème est survenu, La demande n'est pas envoyée !",
          buttons: ['Ok']
        });
        alert.present();
      }


  presentLoading() {
       let loader = this.loadingCtrl.create({
         content: "Please wait...",
         spinner: 'ios',
         duration: 4000
       });
       loader.present();
     }


subreq(){

  let demande=new Demande_recuperation(this.tel,this.email);
  let Data={
    email : demande.getEmail(),
    tel : demande.getTel()
  }
  let conn=new Connexion(this.http,this.storage);
  conn.insert('request',Data);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
      this.showAlert();
      this.navCtrl.push(Login);
    }
    else{
        this.showerrcreateAlert();
    }
  }, 2000);
}


faq(){
this.navCtrl.push(Plostinfo);
}


finish(){
  if(this.email!=null && this.tel!=null){
    var testemail=this.email.match(/@./) != null;
    if(testemail){
      this.subreq();
      this.presentLoading();
    }
  else{
     this.showerremailAlert() ;
  }
//console.log(Data);

}
else{
  // password dont match
  this.showerrAlert() ;
}
}


showerrAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      mode: 'ios',
      subTitle: 'Les informations introduites sont erronées !',
      buttons: ['Corriger']
    });
    alert.present();
  }
  showerremailAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: "L'adresse email introduite est incorrecte !",
        buttons: ['Corriger']
      });
      alert.present();
    }

}
