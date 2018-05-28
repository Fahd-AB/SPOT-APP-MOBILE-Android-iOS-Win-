import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController,AlertController } from 'ionic-angular';
import { Event } from '../event/event';
import { Position } from '../position/position';

/**
 * Generated class for the Payement page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payement',
  templateUrl: 'payement.html',
})
export class Payement {
  Data:any;
  title : string="";
  paypal : boolean;
  xapo : boolean;
  montant : string;
  email : string;
  page_url : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public modalCtrl: ModalController, public alertCtrl: AlertController) {
  this.paypal = true;
  }

  ionViewDidLoad() {
     this.Data={
      client_id :this.navParams.get('client_id'),
      titre :this.navParams.get('titre'),
      type: this.navParams.get('type'),
      autre: this.navParams.get('autre'),
      description: this.navParams.get('description'),
      prepaye : this.navParams.get('prepaye')
    };
    this.title=this.Data.titre;
    console.log('ionViewDidLoad Payement');
  }

  back(){
    this.viewCtrl.dismiss();
      let modal= this.modalCtrl.create(Event);
      modal.present();
  }
  mpaypal(){
    this.paypal = true;
    this.xapo = false;

  }
  mxapo(){
    this.paypal = false;
    this.xapo = true;

  }


  gotoposition(){


       if(this.montant=="" || this.email=="" || this.page_url=="" || this.montant==null || this.email==null || this.page_url==null ){
         this.showerrAlert();
       }

       else{
               // all data is good
               var testemail=this.email.match(/@./) != null;
               if(testemail){
                 var testurl=this.page_url.match(/http:/) != null;
                   if(testurl){
                 if(this.paypal==true){
                   let GData={
                     client_id: this.Data.client_id,
                     titre : this.Data.titre,
                     type: this.Data.type,
                     autre: this.Data.autre,
                     description: this.Data.description,
                     prepaye : this.Data.prepaye,
                     montant: this.montant,
                     methode :  "paypal",
                     email: this.email,
                     page_url : this.page_url
                   }
                     this.viewCtrl.dismiss();
                     let modal= this.modalCtrl.create(Position ,GData);
                     modal.present();
                  //console.log("paypal");
                 }
                 else{
                   let GData={
                     client_id: this.Data.client_id,
                     titre : this.Data.titre,
                     type: this.Data.type,
                     autre: this.Data.autre,
                     description: this.Data.description,
                     prepaye : this.Data.prepaye,
                     montant: this.montant,
                     methode :  "xapo",
                     email: this.email,
                     page_url : this.page_url
                   }
                     this.viewCtrl.dismiss();
                     let modal= this.modalCtrl.create(Position ,GData);
                     modal.present();
                 //console.log("xapo");
                 }
               }
               else{
                 //url incorrecte
                 this.showerrurlAlert() ;
               }
               }
               else{
                 // error email form
                 this.showerremailAlert() ;
               }



       }


  }
  showerrAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: 'Tous les informations sont obligatoires !',
        buttons: ['Corriger']
      });
      alert.present();
    }
    showerremailAlert() {
        let alert = this.alertCtrl.create({
          title: '',
          mode: 'ios',
          subTitle: "L'adresse email introduite est incorrecte !",
          buttons: ['Corriger']
        });
        alert.present();
      }
      showerrurlAlert() {
          let alert = this.alertCtrl.create({
            title: '',
            mode: 'ios',
            subTitle: "L'adresse web du page payement est incorrecte !",
            buttons: ['Corriger']
          });
          alert.present();
        }


}
