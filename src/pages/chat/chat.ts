import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController,ToastController } from 'ionic-angular';
import * as $ from 'jquery';
import { Http } from '@angular/http';
import {Connexion} from '../../classes/connexion';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the Chat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {
  Profileid : string="";
  url:string="";
 amiId : string ="";
 amiName : string;
 amiPhoto : string;
 amiRegion : string;
 stat: string;
 Element : any;
 msginput : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App,
     public viewCtrl: ViewController,private storage :Storage, public http : Http,
     public toastCtrl: ToastController) {
  this.Element=this.navParams.get('E');
  }

  ionViewDidLoad() {
    this.loadprofileinfos();
    //this.loadconersation();
    console.log('ionViewDidLoad Chat');
  }
  loadprofileinfos(){

      try{
        this.storage.get('url').then((val)=>{
        this.url=val;
        });
      this.storage.get('Profileid').then((val)=>{
      this.Profileid=val;
       this.loadconversation();
      });
      }catch(e){
       // error getting value or inexistant
      }
    }




  loadconversation(){
    this.amiId=this.Element.ami_id;
    this.amiName=this.Element.ami_prenom+" "+this.Element.ami_nom_famille;
    this.amiPhoto=this.Element.ami_photo;
    this.amiRegion=this.Element.ami_region;
    this.stat=this.Element.ami_statut;
    if(this.stat=="1"){
        $('#sta').html('<div class="activeicon"></div>');
    }
    this.loadchatbox(this.Profileid,this.amiId);
  }


 loadchatbox(id,amiid){
   let Data={
     client_id : id,
     ami_id : amiid
   }
   let conn=new Connexion(this.http,this.storage);
   conn.select('chat_conv_all',Data);
   setTimeout(() => {
     var res=conn.result;
     var select_res=conn.select_res;
     if(res==2){
       var Json=JSON.parse(select_res);
       this.displaychat(Json);
     }
     else if(res==1){
          // no result
          //$('#container0').html("<div class='normal-text-center'>Pas d'amis actuellement</div>");
     }
     else{
         // error not connected to server
         //$('#container0').html("<div class='normal-text-center'>Pas d'amis actuellement</div>");
     }
   }, 3000);
 }




displaychat(json){
$('#chatbox').html('');
var cont="";
 for (var i = 0; i < json.length; i++) {
   if(json[i].emetteur==this.Profileid){
     cont+='<div class="bubble me">'+json[i].texte+'</div>';
   }
   else{
     cont+='<div class="bubble you">'+json[i].texte+'</div>';
   }
 }
   $('#chatbox').html(cont);
/*
    setTimeout(() => {
      this.loadconversation();
    }, 10000);
    */
}


send(){
  var msg=this.msginput;
    this.msginput="";
  var x = (new Date()).getTimezoneOffset() * 60000;
  var today = (new Date(Date.now() - x)).toISOString();
  let Data={
    client_id : this.Profileid,
    ami_id : this.amiId,
    msg : msg,
    date: today
  }
  let conn=new Connexion(this.http,this.storage);
  conn.insert('newmsg',Data);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
       this.loadconversation();
    }
    else if(res==1){
         // no result
         this.showerrToast();
    }
    else{
        // error not connected to server
        this.showerrToast();
    }
  }, 300);
}






showerrToast() {
    let toast = this.toastCtrl.create({
      message: 'Erreur, Message non envoyé !',
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }




















  gotomain(){
      this.viewCtrl.dismiss();
  //this.app.getRootNav().setRoot( Tabs );
  }
}
