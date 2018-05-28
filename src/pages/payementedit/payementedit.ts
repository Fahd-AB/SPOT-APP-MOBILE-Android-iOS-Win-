import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ToastController,LoadingController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {Connexion} from '../../classes/connexion';
import { Oldpay } from '../oldpay/oldpay';
import * as $ from 'jquery';
/**
 * Generated class for the Payementedit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payementedit',
  templateUrl: 'payementedit.html',
})
export class Payementedit {
  cards: any;
  url:string="";
  Profileid : string;


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
  public alertCtrl: AlertController, private storage :Storage, public http : Http,
  public toastCtrl: ToastController,public modalCtrl: ModalController,public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    try{
      this.storage.get('url').then((val)=>{
      this.url=val;
      });
      this.storage.get('Profileid').then((val)=>{
      this.Profileid=val;
      this.loadpayement();
      });
    }
    catch(e){
      // error getting value or inexistant
    }
    console.log('ionViewDidLoad Payementedit');
  }
  back(){
    this.viewCtrl.dismiss();
  }

  loadpayement(){
    this.cards=[];
    let Data={
      client_id : this.Profileid
    }
    let conn=new Connexion(this.http,this.storage);
    conn.select('transaction_s',Data);
    setTimeout(() => {
      var res=conn.result;
      var select_res=conn.select_res;

      if(res==2){
        $('#container12').html("");
        this.cards=[];
        var json = JSON.parse(select_res);
        //console.log(json);
        for (var i = 0; i < json.length; i++) {
          var x = (new Date()).getTimezoneOffset() * 60000;
          var now = (new Date(Date.now() - x)).toISOString();
          var transaction={
              "abonneur_id":json[i].abonneur,
              "abonneur_name":json[i].prenom+" "+json[i].nom_famille,
              "abonneur_photo": this.url+"/img/"+json[i].profilephoto+".png",
              "abonneur_email":json[i].email,
              "trans_id": json[i].id,
              "event_id":json[i].event_id,
              "ab_id":json[i].subs_id,
              "event_titre":json[i].titre,
              "event_type":json[i].type,
              "methode" : json[i].methode,
              "montant" : json[i].montant,
              "date":json[i].date.substring(0,10)+"   "+json[i].date.substring(11,(json[i].date.toString().length)-8),
              "statut":json[i].statut,
              "timesince" : this.msToTime((new Date(now)).valueOf() - (new Date(json[i].date)).valueOf())
          }
          if(json[i].statut=="0"){
            this.cards.push(transaction);
          }
        }
        if(this.cards.length==0){
           $('#container12').html("<div class='normaltextcenter'>Pas de payements en attente</div>");
        }
      }
      else{
          // error not connected to server
           $('#container12').html("<div class='normaltextcenter'>Pas de payements en attente</div>");
      }
    }, 2000);

  }


    msToTime(s) : string{
     var ms = s % 1000;
     s = (s - ms) / 1000;
     var secs = s % 60;
     s = (s - secs) / 60;
     var mins = s % 60;
     var hrs = (s - mins) / 60;
     if(hrs==0 && mins==0)
         return "à l'instant";
     else if(hrs==0)
         return 'il y a '+mins+' minutes';
     else if(hrs<24)
         return 'il y a '+hrs+' heures';
     else
         return 'il y a '+Math.floor(hrs/24)+' jours';
   }


verifier(id_trans,id_sub){
this.showConfirm1(id_trans,id_sub,'1');
}
signaler(id_trans,id_sub){
  this.showConfirm(id_trans,id_sub,'-1');
}

updtrans(id_trans,id_sub,stat){
  this.presentshortLoading();
  let Data={
    trans_id : id_trans,
    stat : stat
  }
  let conn=new Connexion(this.http,this.storage);
  conn.update('transaction',Data);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
       this.updabonnement(id_sub,stat);
    }
    else{
      // error not connected to server
   }
}, 1000);
}

updabonnement(id_sub,stat){
  let Data={
    subs_id : id_sub,
    stat : stat
  }
  let conn=new Connexion(this.http,this.storage);
  conn.update('abonnement',Data);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
      if(stat=="-1"){
          this.showcusAlert("L'abonnement a été retiré et un avertissement est envoyé à l'abonneur !");
      }
      else{
          this.showcusAlert("L'abonnement a été confirmé avec succès !");
      }
      $('#container12').html('<div class="loadingcontainer"><img src="assets/img/loading_simple.gif" class="loadingimg"></div>');
      this.loadpayement();
    }
    else{
      // error not connected to server
      this.showcusAlert("Un problème est survenu, Opération annulé !");
   }
}, 1000);
}




tooldpay(){
  let modal= this.modalCtrl.create(Oldpay);
   modal.present();
}







showConfirm(id_trans,id_sub,stat) {
  let confirm = this.alertCtrl.create({
    title: '',
    message: "Voulez-vous vraiment signaler ce payement ?",
    mode: 'ios',
    buttons: [
      {
        text: 'Annuler',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Oui',
        handler: () => {
          console.log('Agree clicked');
           this.updtrans(id_trans,id_sub,stat);
        }
      }
    ]
  });
  confirm.present();
}


presentshortLoading() {
   let loader = this.loadingCtrl.create({
     content: "Please wait...",
     spinner: 'ios',
     duration: 2000
   });
   loader.present();
 }


showConfirm1(id_trans,id_sub,stat) {
  let confirm = this.alertCtrl.create({
    title: '',
    message: "Avez-vous vraiement vérifié ce payement ?, Une fois vérifié vous ne pouvez plus récupérer ce payement !",
    mode: 'ios',
    buttons: [
      {
        text: 'Annuler',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Oui',
        handler: () => {
          console.log('Agree clicked');
           this.updtrans(id_trans,id_sub,stat);
        }
      }
    ]
  });
  confirm.present();
}


  showcusAlert(msg) {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: msg,
        buttons: ['Ok']
      });
      alert.present();
    }


}
