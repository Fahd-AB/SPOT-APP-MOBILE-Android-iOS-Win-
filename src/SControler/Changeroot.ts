import { Component } from '@angular/core';
import { App, ModalController} from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { LoadingController } from 'ionic-angular';
import { Search } from '../pages/search/search';
import { Settings } from '../pages/settings/settings';
import { Gsettings } from '../pages/gsettings/gsettings';
import { Event } from '../pages/event/event';
import { Transport } from '../pages/transport/transport';
import { Payementhist } from '../pages/payementhist/payementhist';
import { Payementedit } from '../pages/payementedit/payementedit';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Connexion } from '../classes/connexion';

@Component({
  template: ``
})
export class Changeroot {
  constructor( private app: App, public loadingCtrl: LoadingController, public modalCtrl: ModalController,
     private storage :Storage, public http : Http) { }
  logout(){
  this.presentLoading();
  //remove profile info from cache
  this.storage.get('Profileid').then((val)=>{
  this.sessionlogut(val);

  this.storage.remove('SPOT_SESSION');
  this.storage.remove('Profilename');
  this.storage.remove('Profilefreinds');
  this.storage.remove('Profileevents');
  this.storage.remove('Profileregion');
  this.storage.remove('Profilegender');
  this.storage.remove('Profilebirthdate');
  this.storage.remove('Profileid');
  this.storage.remove('Profiletel');
  this.storage.remove('Profileadr');
  this.storage.remove('Profileemail');
  this.storage.remove('Profilecurrentpass');
  //redirect to login page
  setTimeout(() => {
  this.app.getRootNav().setRoot( HomePage );
  }, 2500);
  });



  }
  presentLoading() {
     let loader = this.loadingCtrl.create({
       content: "Please wait...",
       spinner: 'ios',
       duration: 2000
     });
     loader.present();
   }
   gosearch(){
     setTimeout(() => {
       let modal= this.modalCtrl.create(Search);
       modal.present();
  }, 500);
  //this.app.getRootNav().setRoot( Search );
   }
   gosettings(){
     setTimeout(() => {
       let modal= this.modalCtrl.create(Settings);
       modal.present();
  }, 500);

  //this.app.getRootNav().setRoot( Settings );
   }
   gogsettings(){
     setTimeout(() => {
       let modal= this.modalCtrl.create(Gsettings);
       modal.present();
  }, 500);

  //this.app.getRootNav().setRoot( Settings );
   }
   gocreateevent(){
     setTimeout(() => {
       let modal= this.modalCtrl.create(Event);
       modal.present();
  }, 500);

  //this.app.getRootNav().setRoot( Settings );
   }
   gohistpayement(){
     setTimeout(() => {
       let modal= this.modalCtrl.create(Payementhist);
       modal.present();
  }, 500);

  //this.app.getRootNav().setRoot( Settings );
   }
   gotransport(){
     setTimeout(() => {
       let modal= this.modalCtrl.create(Transport);
       modal.present();
  }, 500);
   }
   gopay(){
     setTimeout(() => {
       let modal= this.modalCtrl.create(Payementedit);
       modal.present();
    }, 500);
   }




sessionlogut(id){
  let conn=new Connexion(this.http,this.storage);
  this.storage.get('Profileregion').then((val)=>{
  var cityname=val;
  let Data={
    client_id : id,
    region : cityname,
    status: "0"
  }
  conn.update('up_stat_region',Data);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
       console.log('sucess logout');
    }
    else{
          console.log('error updating stat_on_logout');
    }
  }, 500);
  });

}
}
