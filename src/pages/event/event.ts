import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController, AlertController, ModalController   } from 'ionic-angular';
import { Payement } from '../payement/payement';
import { Position } from '../position/position';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Event page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class Event {
   Profileid : string="";
   statusTarefa : boolean;
   prepaye : boolean;
   Valider : string= "Fixer l'emplacement";
   btn_icon : string="ios-send-outline";
   titre : string;
   type : string="Type de l'événement";
   autre : string;
   description : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App,
     public viewCtrl: ViewController, public alertCtrl: AlertController, public modalCtrl: ModalController,
   private storage :Storage) {
    this.statusTarefa = true;
    this.prepaye = false;
  }

  ionViewDidLoad() {
    try{
      this.storage.get('Profileid').then((val)=>{
      this.Profileid=val;
      });
    }
    catch(e){
      // error getting value or inexistant
    }
    console.log('ionViewDidLoad Event');
  }
  gotomain(){
      this.viewCtrl.dismiss();
  //this.app.getRootNav().setRoot( Tabs );
  }
  create(){

     if(this.titre=="" || this.description=="" || this.titre==null || this.description==null){
       this.showerrAlert();
     }
     else{
        if(this.type=="Type de l'événement" && this.autre=="" || this.type=="Type de l'événement" && this.autre==null){
          this.showerrtypeAlert();
        }
        else{
             // all data is good now make choice prepayed or free
          if(this.prepaye==true){
            this.topayement();
          }
          else{
              this.fixeventposition();
          }

        }
     }

  }
  back(){
    this.showConfirm();
  }
  showerrAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: 'Vous devez introduire tout les informations obligatoires !',
        buttons: ['Corriger']
      });
      alert.present();
    }
    showerrtypeAlert() {
        let alert = this.alertCtrl.create({
          title: '',
          mode: 'ios',
          subTitle: "Type de l'évenement indéfini !",
          buttons: ['Corriger']
        });
        alert.present();
      }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '',
      message: "Voulez-vous vraiment annuler la création ?",
      mode: 'ios',
      buttons: [
        {
          text: "Retour",
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            console.log('Agree clicked');
                this.gotomain();
          }
        }
      ]
    });
    confirm.present();
  }
  free(){
    this.statusTarefa = true;
    this.prepaye = false;
    this.Valider="Fixer l'emplacement";
    this.btn_icon="ios-send-outline";
  }
  prep(){
    this.statusTarefa = false;
    this.prepaye = true;
    this.Valider="Fixer le Payement";
    this.btn_icon="ios-card";
  }

  fixeventposition(){


    let Data={
      client_id: this.Profileid,
      titre : this.titre,
      type: this.type,
      autre: this.autre,
      description: this.description,
      prepaye : this.prepaye
    }
      this.viewCtrl.dismiss();
      let modal= this.modalCtrl.create(Position ,Data);
      modal.present();
  }
  topayement(){


    let Data={
      client_id: this.Profileid,
      titre : this.titre,
      type: this.type,
      autre: this.autre,
      description: this.description,
      prepaye : this.prepaye
    }
      this.viewCtrl.dismiss();
      let modal= this.modalCtrl.create(Payement ,Data);
      modal.present();
  }



 settype(){

   let prompt = this.alertCtrl.create({
   message: 'Quel est le type de votre événement ?',
   mode : 'ios',
   inputs : [
   {
       type:'radio',
       label: "Café",
       value:'Café',
       checked: true
   },
   {
       type:'radio',
       label: "Conférence",
       value:'Conférence'
   },
   {
       type:'radio',
       label: "Soutenance",
       value:'Soutenance'
   },
   {
       type:'radio',
       label: "Théatre",
       value:'Théatre'
   },
   {
       type:'radio',
       label: "Cinéma",
       value:'Cinéma'
   },
   {
       type:'radio',
       label: "Domicile",
       value:'Domicile'
   },
   {
       type:'radio',
       label: "Education",
       value:'Education'
   },
   {
       type:'radio',
       label: "Jeu",
       value:'Jeu'
   },
   {
       type:'radio',
       label: "Bar",
       value:'Bar'
   },
   {
       type:'radio',
       label: "Hotel",
       value:'Hotel'
   },
   {
       type:'radio',
       label: "Sport",
       value:'Sport'
   },
   {
       type:'radio',
       label: "Musical",
       value:'Musical'
   },
   {
       type:'radio',
       label: "Voyage",
       value:'Voyage'
   },
   {
       type:'radio',
       label: "Restaurent",
       value:'Restaurent'
   },
   {
       type:'radio',
       label: "Marriage",
       value:'Marriage'
   },
   {
       type:'radio',
       label: "Fiancaille",
       value:'Fiancaille'
   },
   {
       type:'radio',
       label: "Emploi",
       value:'Emploi'
   },
   {
       type:'radio',
       label: "Mode",
       value:'Mode'
   },
   {
       type:'radio',
       label: "Dance",
       value:'Dance'
   },
   {
       type:'radio',
       label: "Tournage",
       value:'Tournage'
   },
   {
       type:'radio',
       label: "Religion",
       value:'Religion'
   },
   {
       type:'radio',
       label: "Magazinage",
       value:'Magazinage'
   }
   ,
   {
       type:'radio',
       label: "Autre",
       value:'Autre'
   }],
   buttons : [
   {
       text: "Annuler",
       handler: data => {
       console.log("cancel clicked");
       }
   },
   {
       text: "Valider",
       handler: data => {
       console.log("validate clicked");
        this.type=data;
       }
   }]});
   prompt.present();

 }





















}
