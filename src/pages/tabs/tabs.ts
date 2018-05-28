import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Messages } from '../messages/messages';
import { Main } from '../main/main';
import { Friends } from '../friends/friends';
import { News } from '../news/news';
import { MenuController,Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {Connexion} from '../../classes/connexion';


/**
 * Generated class for the Tabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  template: `
     <ion-tabs tabsPlacement='top' mode="ios">
       <ion-tab tabIcon="ios-radio-outline" [root]="tabOne" (ionSelect)="mainopen()"></ion-tab>
       <ion-tab tabIcon="ios-paper-outline"  [root]="tabTwo" tabBadge="{{NbNEWS}}" tabBadgeStyle="danger" (ionSelect)="newsopen()"></ion-tab>
       <ion-tab tabIcon="ios-chatbubbles-outline" [root]="tabThree" tabBadge="{{NbMSG}}" mode="ios"  tabBadgeStyle="danger" (ionSelect)="msgsopen()"></ion-tab>
       <ion-tab tabIcon="ios-contacts-outline" [root]="tabFour" (ionSelect)="freindsopen()"></ion-tab>
     </ion-tabs>
     `,
})

export class Tabs {
tabOne = Main;
tabTwo= News;
tabThree= Messages;
tabFour= Friends;
NbMSG: string;
NbNEWS : string;
url:string="";
Profileid : string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public menuCtrl : MenuController, public events: Events,private storage :Storage, public http : Http) {
       this.NbMSG="";
       this.NbNEWS="";
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad Tabs');
    this.loadprofileinfos();
    //
    this.menuCtrl.swipeEnable(true);

  }
  ionViewWillLeave() {
      console.log('ionViewWillLeave Tabs');
      this.menuCtrl.swipeEnable(false);
    }
  newsopen(){
     this.events.publish('news:tabSelected');
  }
  mainopen(){
     this.events.publish('main:tabSelected');
  }
  freindsopen(){
     this.events.publish('freinds:tabSelected');
  }
  msgsopen(){
     this.events.publish('msgs:tabSelected');
  }

  loadprofileinfos(){

      try{
        this.storage.get('url').then((val)=>{
        this.url=val;
        });
      this.storage.get('Profileid').then((val)=>{
      this.Profileid=val;
      this.loadmsg_number(val);
      this.load_nb_news();
      });
      }catch(e){
       // error getting value or inexistant
      }
    }






  loadmsg_number(id){


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

        }
        else if(res==1){
             // no result

        }
        else{
            // error not connected to server

        }


        // finally
       if(Chat.length>0){
           this.NbMSG=Chat.length+"";
       }

      }, 2000);


    }

   load_nb_news(){
     let Data={
       operation : "select",
     }
     let conn=new Connexion(this.http,this.storage);
     conn.select('publication',Data);
     setTimeout(() => {
       var res=conn.result;
       var select_res=conn.select_res;

       if(res==2){
         var json=JSON.parse(select_res);
         this.NbNEWS=""+json.length;
       }
       else if(res==1){
            // no result

       }
       else{
           // error not connected to server
       }
     }, 2000);


   }



}
