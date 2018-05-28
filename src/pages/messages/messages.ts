import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App,ModalController,Events } from 'ionic-angular';
import { Search } from '../search/search';
import { Event } from '../event/event';
import { Profile } from '../profile/profile';
import { Chat } from '../chat/chat';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {Connexion} from '../../classes/connexion';
import * as $ from 'jquery';
/**
 * Generated class for the Messages page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class Messages {
  Profileid : string="";
  url:string="";
  text: string;
  cards: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App,
     public modalCtrl: ModalController,private storage :Storage, public http : Http,
    public events: Events) {
  }

  ionViewDidLoad() {
    //this.loadprofileinfos();
    console.log('ionViewDidLoad Messages');
    this.events.subscribe('msgs:tabSelected', eventData => {
      this.cards=[];
      $('#container1').html('<div class="loadingcontainer"><img src="assets/img/loading_simple.gif" class="loadingimg"></div>');
    this.loadprofileinfos();
    });
  }
  getItems(){
    let tx={
      text : this.text
    }
    let modal= this.modalCtrl.create(Search,tx);
      this.text="";
    modal.present();
  }
  createevent(){
    let modal= this.modalCtrl.create(Event);
    modal.present();
  //this.app.getRootNav().setRoot( Event );
  }
  seeprofile(){
    let modal= this.modalCtrl.create(Profile);
    modal.present();
  //this.app.getRootNav().setRoot( Profile );
  }

 forward(element){
  let modal= this.modalCtrl.create(Chat,{E: element});
   modal.present();
//this.app.getRootNav().setRoot( Chat );
 }




 loadprofileinfos(){

     try{
       this.storage.get('url').then((val)=>{
       this.url=val;
       });
     this.storage.get('Profileid').then((val)=>{
     this.Profileid=val;
     this.getmessages(val);
     });
     }catch(e){
      // error getting value or inexistant
     }
   }





 getmessages(id){
     this.cards=[];

   let Data={
     operation : "select",
     client_id : id
   }
   let conn=new Connexion(this.http,this.storage);
   conn.select('messages_c',Data);
   setTimeout(() => {
     var res=conn.result;
     var select_res=conn.select_res;

     if(res==2){
        var Json=JSON.parse(select_res);
      var Chat=[];
     for (var i = 0; i < Json.length; i++) {
       var diss=[];
               for (var j = 0; j < Json.length; j++) {
                   if(Json[i].c_id==Json[j].emetteur || Json[i].c_id==Json[j].recepteur){
                      diss.push(Json[j]);
                   }
               }
       var Ami={"ami_id":Json[i].c_id,
                 "ami_prenom":Json[i].prenom,
                 "ami_nom_famille":Json[i].nom_famille,
                 "ami_photo": this.url+"/img/"+Json[i].profilephoto+".png",
                 "lastmsg": diss[diss.length-1].texte,
                 "ami_region" : Json[i].region,
                 "ami_statut" : Json[i].statut
               }

               //<div class="activeicon" style="background : url('assets/img/active.png') no-repeat;"></div>
               var exist=false;
               for (var j = 0; j < Chat.length; j++) {
                 var a=JSON.stringify(Chat[j]);
                 var b=JSON.stringify(Ami);

                 if(a==b)
                 {
                    exist=true;
                 }
               }

               if(exist==false){
                 Chat.push(Ami);
               }



       }
          $('#container1').html("");
          this.cards=Chat;

          setTimeout(() => {
          for (var k = 0; k < Chat.length; k++) {
              if(Chat[k].ami_statut=="1"){
                $('#clstat'+Chat[k].ami_id).html('<div class="activeicon"></div>');
              }
              else{
                $('#clstat'+Chat[k].ami_id).html('');
              }
          }
        }, 1000);



     //console.log(this.cards[0].ami_id);

     }
     else if(res==1){
          // no result
          $('#container1').html('<div class="normaltextcenter">Aucun message</div>');
     }
     else{
         // error not connected to server
         $('#container1').html('<div class="normaltextcenter">Aucun message</div>');
     }
   }, 2000);


 }

}
