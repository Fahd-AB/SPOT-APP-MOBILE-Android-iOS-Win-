import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ModalController,LoadingController,Events } from 'ionic-angular';
import { Search } from '../search/search';
import { Event } from '../event/event';
import { Profile } from '../profile/profile';
import { Chat } from '../chat/chat';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {Connexion} from '../../classes/connexion';
import * as $ from 'jquery';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the Friends page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class Friends {
  Profileid : string="";
  url:string="";
  cards: any;
  text: string;
  SELECTED_FREIND :string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     private app: App, public modalCtrl: ModalController,private storage :Storage, public http : Http,
   public loadingCtrl: LoadingController,public toastCtrl: ToastController,public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Friends');
    //this.loadprofileinfos();

    this.events.subscribe('freinds:tabSelected', eventData => {
      this.cards=[];
      $('#container0').html('<div class="loadingcontainer"><img src="assets/img/loading_simple.gif" class="loadingimg"></div>');
      this.loadprofileinfos();
    });

  }
  loadprofileinfos(){

      try{
        this.storage.get('url').then((val)=>{
        this.url=val;
        });
      this.storage.get('Profileid').then((val)=>{
      this.Profileid=val;
      this.getfreinds(val);
      });
      }catch(e){
       // error getting value or inexistant
      }
    }




    getfreinds(id){
      let Data={
        client_id : id
      }
      let conn=new Connexion(this.http,this.storage);
      conn.select('freinds_all',Data);
      setTimeout(() => {
        var res=conn.result;
        var select_res=conn.select_res;

        if(res==2){
            var Json=JSON.parse(select_res);
          this.displayfreinds(Json);

        }
        else if(res==1){
             // no result
             $('#container0').html("<div class='normaltextcenter'>Pas d'amis actuellement</div>");
             this.cards=[];
        }
        else{
            // error not connected to server
            $('#container0').html("<div class='normaltextcenter'>Pas d'amis actuellement</div>");
            this.cards=[];
        }
      }, 3000);
    }




   displayfreinds(json){
     $('#container0').html("");
       this.cards=[];
       for (var i = 0; i < json.length; i++) {
         var Ami={"ami_id":json[i].id,
                   "ami_prenom":json[i].prenom,
                   "ami_nom_famille":json[i].nom_famille,
                   "ami_photo": this.url+"/img/"+json[i].profilephoto+".png",
                   "ami_region": json[i].region,
                   "ami_statut" : json[i].statut
                 }
              this.cards.push(Ami);
       }
   }


   ret(){
     var selected_id=this.SELECTED_FREIND;
     let Data={
       client_id : this.Profileid,
       freind_id: selected_id
     }
     let conn=new Connexion(this.http,this.storage);
     conn.delete('relation_del',Data);
     setTimeout(() => {
       var res=conn.result;

       if(res==2){
          this.showToast();
           setTimeout(() => {
           this.presentmedLoading();
           this.getfreinds(this.Profileid);
           this.SELECTED_FREIND="";
           }, 2000);
       }
       else if(res==1){
            // no result
             this.showerrToast();
       }
       else{
           // error not connected to server
            this.showerrToast();
       }
     }, 2000);
   }








  unfreind(id){
  this.SELECTED_FREIND=id;
  this.showConfirm();
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '',
      message: "Voulez-vous vraiment retirer ce membre de la liste d'amis?",
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
            this.ret();
          }
        }
      ]
    });
    confirm.present();
  }

  presentmedLoading() {
     let loader = this.loadingCtrl.create({
       content: "Please wait...",
       spinner: 'ios',
       duration: 3500
     });
     loader.present();
   }

   showToast() {
       let toast = this.toastCtrl.create({
         message: 'Ami retité avec succés !',
         duration: 2000,
         position: 'bottom'
       });

       toast.present(toast);
     }


     showerrToast() {
         let toast = this.toastCtrl.create({
           message: 'Erreur, Opération annulé !',
           duration: 2000,
           position: 'bottom'
         });

         toast.present(toast);
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
  contact(element){
    // click on chat bubble of freind
    let modal= this.modalCtrl.create(Chat,{E: element});
    modal.present();

  }
}
