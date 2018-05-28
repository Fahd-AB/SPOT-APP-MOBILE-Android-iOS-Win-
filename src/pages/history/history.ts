import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {Connexion} from '../../classes/connexion';
import * as $ from 'jquery';
/**
 * Generated class for the History page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class History {
  cards: any;
  url:string="";
  Profileid : string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
   private storage :Storage, public http : Http) {
  }

  ionViewDidLoad() {
    try{
      this.storage.get('url').then((val)=>{
      this.url=val;
      });
      this.storage.get('Profileid').then((val)=>{
      this.Profileid=val;
      this.loadhistory();
      });
    }
    catch(e){
      // error getting value or inexistant
    }
    console.log('ionViewDidLoad History');
  }
  back(){
    this.viewCtrl.dismiss();
  }




  loadhistory(){
    this.cards=[];
    let Data={
      cl_id : this.Profileid
    }
    let conn=new Connexion(this.http,this.storage);
    conn.select('historys',Data);
    setTimeout(() => {
      var res=conn.result;
      var select_res=conn.select_res;

      if(res==2){
        $('#container14').html("");
        this.cards=[];
        var json = JSON.parse(select_res);
        //console.log(json);
        for (var i = json.length-1; i >=0 ; i--) {
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
            st="Suspect";
            sticon="ios-close-circle-outline";
            sttheme="danger";
          }
          var slogo="";
          if(json[i].device=="Windows" || json[i].device=="Mac OS"|| json[i].device=="Linux"){
            slogo="ios-desktop-outline";
          }
          else{
            if(json[i].device=="Android"){
                slogo="logo-android";
            }
            else if(json[i].device=="iOS"){
                slogo="logo-apple";
            }
          }
          var transaction={
              "system":json[i].device,
              "system_logo":slogo,
              "ip":json[i].ip,
              "date":json[i].date.substring(0,10)+"   "+json[i].date.substring(11,(json[i].date.toString().length)-8),
              "statut":json[i].statut,
              "stat_name":st,
              "stat_icon" :sticon,
              "stat_theme" :sttheme,
              "timesince" : this.msToTime((new Date(now)).valueOf() - (new Date(json[i].date)).valueOf())
          }

            this.cards.push(transaction);

        }

      }
      else{
          // error not connected to server
           $('#container14').html("<div class='normaltextcenter'>Pas d'historique de login</div>");
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
