import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {Connexion} from '../../classes/connexion';
import * as $ from 'jquery';
/**
 * Generated class for the Oldpay page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-oldpay',
  templateUrl: 'oldpay.html',
})
export class Oldpay {
  cards: any;
  url:string="";
  Profileid : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
  private storage :Storage, public http : Http,
  public modalCtrl: ModalController) {

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
    console.log('ionViewDidLoad Oldpay');
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
        $('#container13').html("");
        this.cards=[];
        var json = JSON.parse(select_res);
        //console.log(json);
        for (var i = 0; i < json.length; i++) {
          var x = (new Date()).getTimezoneOffset() * 60000;
          var now = (new Date(Date.now() - x)).toISOString();
          var st="";
          var sticon="";
          var sttheme="";
          if(json[i].statut=="1"){
            st="Vérifié";
            sticon="ios-checkmark-circle-outline";
            sttheme="secondary";
          }
          else{
            st="Rejeté";
            sticon="ios-close-circle-outline";
            sttheme="danger";
          }
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
              "trans_status_name":st,
              "trans_status_icon" :sticon,
              "trans_status_theme" :sttheme,
              "timesince" : this.msToTime((new Date(now)).valueOf() - (new Date(json[i].date)).valueOf())
          }
          if(json[i].statut!="0"){
            this.cards.push(transaction);
          }
        }
        if(this.cards.length==0){
           $('#container13').html("<div class='normaltextcenter'>Pas de payements traité</div>");
        }
      }
      else{
          // error not connected to server
           $('#container13').html("<div class='normaltextcenter'>Pas de payements traité</div>");
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



}
