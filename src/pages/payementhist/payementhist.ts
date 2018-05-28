import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController,
  ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Connexion } from '../../classes/connexion';
import * as $ from 'jquery';
/**
 * Generated class for the Payementhist page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payementhist',
  templateUrl: 'payementhist.html',
})
export class Payementhist {
cards: any;
url:string="";
Profileid : string="";
Profilename : string;
Profilephoto: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private storage :Storage,  public http : Http,public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    try{
      this.storage.get('url').then((val)=>{
      this.url=val;
      });
      this.storage.get('Profilename').then((val)=>{
      this.Profilename=val;
      });
      this.storage.get('Profilephoto').then((val)=>{
      this.Profilephoto=val;
      });
      this.storage.get('Profileid').then((val)=>{
      this.Profileid=val;
      this.loadabonnements();
      });
    }catch(e){
     // error getting value or inexistant
    }
    console.log('ionViewDidLoad Abonnements');
  }
  gotomain(){
    this.viewCtrl.dismiss();
  }

  presentshortLoading() {
     let loader = this.loadingCtrl.create({
       content: "Please wait...",
       spinner: 'ios',
       duration: 2000
     });
     loader.present();
   }


  loadabonnements(){
    this.cards=[];
    let Data={
      client_id : this.Profileid
    }
    let conn=new Connexion(this.http,this.storage);
    conn.select('abonnement_s',Data);
    setTimeout(() => {
      var res=conn.result;
      var select_res=conn.select_res;

      if(res==2){
        $('#container11').html("");
        this.cards=[];
        var json = JSON.parse(select_res);
          for (var i = 0; i < json.length; i++) {
            var x = (new Date()).getTimezoneOffset() * 60000;
            var now = (new Date(Date.now() - x)).toISOString();
            var PAYSTAT="";
            var paytheme="";
            if(json[i].prepaye=="1"){
              PAYSTAT="Prepayé";
              paytheme="danger";
            }
            else{
              PAYSTAT="Gratuit - Aucun Payement";
              paytheme="secondary";
            }
            var st="";
            var sticon="";
            var sttheme="";
            if(json[i].status=="1"){
              st="Vérifié";
              sticon="ios-checkmark-circle-outline";
              sttheme="secondary";
            }
            else if(json[i].status=="0"){
              st="En attente";
              sticon="ios-repeat-outline";
              sttheme="gold";
            }
            else{
              st="Rejeté";
              sticon="ios-close-circle-outline";
              sttheme="danger";
            }
            var abonnement={
              "Profilename" : this.Profilename,
              "Profilephoto" : this.url+"/img/"+this.Profilephoto+".png",
              "cr_id":json[i].client_id,
              "ab_date":json[i].date.substring(0,10)+"   "+json[i].date.substring(11,(json[i].date.toString().length)-8),
              "event_id":json[i].event_id,
              "ab_id":json[i].id,
              "cr_name": json[i].prenom+" "+json[i].nom_famille,
              "cr_nom_famille":json[i].nom_famille,
              "cr_prenom":json[i].prenom,
              "cr_Profilephoto" : this.url+"/img/"+json[i].profilephoto+".png",
              "event_prepaye":PAYSTAT,
              "paytheme" : paytheme,
              "ab_status":st,
              "ab_status_icon" :sticon,
              "ab_status_theme" :sttheme,
              "event_titre":json[i].titre,
              "event_type":json[i].type,
              "timesince" : this.msToTime((new Date(now)).valueOf() - (new Date(json[i].date)).valueOf())
            }
             this.cards.push(abonnement);


          }

           setTimeout(() => {
           for (var i = 0; i < json.length; i++) {
           if(json[i].status=="0"){
           $("#pay"+json[i].id).removeClass('invisible');
           }
           }
           }, 1000);

      }
      else{
          // error not connected to server
           $('#container11').html("<div class='normaltextcenter'>Pas d'abonnements actifs</div>");
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


paye(event_id,ab_id,cr_id){
  var id= this.Profileid;
  var x = (new Date()).getTimezoneOffset() * 60000;
  var today= (new Date(Date.now() - x)).toISOString();
  var data = {
  client_id : id,
  subs_id: ab_id,
  event_id: event_id,
  date: today
  }
  let confirm = this.alertCtrl.create({
    title: '',
    message: "Avez-vous vraiement payé cet abonnement ?",
    mode: 'ios',
    buttons: [
      {
        text: 'Pas encore',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Oui',
        handler: () => {
          console.log('Agree clicked');

          let conn=new Connexion(this.http,this.storage);
          conn.insert('transaction_add',data);
          setTimeout(() => {
            var res=conn.result;
            if(res==2){
                 //this.showconfAlert();
                 this.addnotif(ab_id,cr_id);
                  //this.showcustomToast();
            }
            else{
              this.showcustomToast('Erreur, Opération annulé !');
            }
          }, 1000);

        }
      }
    ]
  });
  confirm.present();
}


addnotif(ab_id,cr_id){
    var id= this.Profileid;
  if(cr_id!=id){
  var x = (new Date()).getTimezoneOffset() * 60000;
  var today= (new Date(Date.now() - x)).toISOString();
  var data = {
  type : "PAY",
  texte: "a payé un abonnement No"+ab_id+" relatif à votre événement, vérifier la transaction",
  target_client: cr_id,
  target: ab_id,
  source_client: id,
  date :  today,
  vu : "0"
}
let conn=new Connexion(this.http,this.storage);
conn.insert('notif_inv',data);
setTimeout(() => {
  var res=conn.result;
  if(res==2){
       this.showconfAlert();
        //this.showcustomToast();
  }
  else{
    this.showcustomToast('Erreur, Opération annulé !');
  }
}, 1000);
}
}

showconfAlert() {
  let confirm = this.alertCtrl.create({
    title: '',
    message: "Bénéficiaire notifié avec succès, votre abonnement sera traité et vérifié !",
    mode: 'ios',
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          console.log('Agree clicked');
        }
      }
    ]
  });
  confirm.present();
}


showcustomToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }


 desabonnement(eventid){

   let confirm = this.alertCtrl.create({
     title: '',
     message: "Voulez-vous vraiment anuuler l'abonnement à cet évènement ?",
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

           // désabonner
           let Data={
             client_id : this.Profileid,
             event_id : eventid,
           }
           let conn=new Connexion(this.http,this.storage);
           conn.delete('abonnement',Data);
            this.presentshortLoading();
           setTimeout(() => {
             var res=conn.result;
             console.log(res);
             if(res==2){
               // add abonnement
                this.showdelToast();
               // wait 2 seconds than reload
                setTimeout(() => {
                 this.cards=[];
                  $('#container11').html('<div class="loadingcontainer"><img src="assets/img/loading_simple.gif" class="loadingimg"></div>');
                 this.loadabonnements();
                  }, 2000);
             }
             else{
                this.showerrdelToast();
             }
           }, 2000);
           console.log('Agree clicked');
         }
       }
     ]
   });
   confirm.present();

 }

 showdelToast() {
     let toast = this.toastCtrl.create({
       message: 'Désabonnement effectué avec succées !',
       duration: 2000,
       position: 'bottom'
     });

     toast.present(toast);
   }
   showerrdelToast() {
       let toast = this.toastCtrl.create({
         message: "Echec de l'opération !",
         duration: 2000,
         position: 'bottom'
       });

       toast.present(toast);
     }


}
