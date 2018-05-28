import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController,AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Password } from '../password/password';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Connexion } from '../../classes/connexion';
/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {
Profileid : string="";
ProfileName : string="";
ProfileRegion : string="";
Profilephoto : string="";
date_naissance : Date;
email : string;
tel : string;
adresse : string;
gender : string;
url:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController
    ,private storage :Storage, public modalCtrl: ModalController, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,public toastCtrl: ToastController, public http : Http) {
  }

  ionViewDidLoad() {
    this.loadprofileinfos();
    console.log('ionViewDidLoad Settings');
  }

gotomain(){
    this.viewCtrl.dismiss();
}


loadprofileinfos(){

    try{
      this.storage.get('url').then((val)=>{
      this.url=val;
      });
      this.storage.get('Profilephoto').then((val)=>{
        if(val=="" || val==null)
        {
          try{
          this.storage.get('Profilegender').then((val)=>{
            if(val=="m"){
                this.Profilephoto="assets/img/profile_m_default.png";
            }
            else if(val=="f"){
                this.Profilephoto="assets/img/profile_f_default.png";
            }

          });
        }catch(e){
         // error getting value or inexistant
         this.Profilephoto="assets/img/profile_m_default.png";
        }
        }
        else{
          this.Profilephoto=this.url+'/img/'+val+'.png';
        }
      });
    this.storage.get('Profileid').then((val)=>{
    this.Profileid=val;
    });
    this.storage.get('Profilename').then((val)=>{
    this.ProfileName=val;
    });
    this.storage.get('Profileregion').then((val)=>{
    this.ProfileRegion=val;
    });
    this.storage.get('Profilebirthdate').then((val)=>{
    this.date_naissance=val;
    });
    this.storage.get('Profileemail').then((val)=>{
    this.email=val;
    });
    this.storage.get('Profiletel').then((val)=>{
    this.tel=val;
    });
    this.storage.get('Profileadr').then((val)=>{
    this.adresse=val;
    });
    this.storage.get('Profilegender').then((val)=>{
        this.gender=val;
    });

    }catch(e){
     // error getting value or inexistant
    }
  }









gotomdpchange(){
  this.viewCtrl.dismiss();

    let modal= this.modalCtrl.create(Password);
    modal.present();
}
update(){
  if(this.email=="" || this.tel=="" || this.gender=="-" || this.adresse=="" || this.gender==""){
   this.showerrAlert();
  }
  else{
      // verif
      var testemail=this.email.match(/@./) != null;
      if(testemail){
         //ok email
         this.presentLoading();
     }
     else{
         this.showerremailAlert() ;
     }

  }
}
doupdate(){
  let Data={
    operation : "update",
    client_id : this.Profileid,
    email : this.email,
    tel : this.tel,
    date_naissance : this.date_naissance,
    adresse : this.adresse,
    sexe: this.gender
  }
  //console.log(Data);
  //var link = 'https://www.spot-app.online/Ex/api.php';


  let conn=new Connexion(this.http,this.storage);
   conn.update('client',Data);
   setTimeout(() => {
     var res=conn.result;

     if(res==2){
           // all is done ok !!!!
           this.storage.set('Profilegender', this.gender);
           this.storage.set('Profilebirthdate',this.date_naissance);
           this.storage.set('Profiletel', this.tel);
           this.storage.set('Profileadr', this.adresse);
           this.storage.set('Profileemail', this.email);
           setTimeout(() => {
           this.showToast();
           this.gotomain();
         }, 2000);
        // alert("success");


     }
     else if(res==1){
       //console.log("no answer from server");
      this.showerrupdateAlert();
     }
     else{
      //  console.log("not connected to server");
      this.showerrupdateAlert();
     }
   }, 2000);




}


showerrAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      mode: 'ios',
      subTitle: 'Vous devez introduire tout les informations !',
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
    presentLoading() {
       let loader = this.loadingCtrl.create({
         content: "Please wait...",
         spinner: 'ios',
         duration: 1500
       });
       loader.present();
      // do stuff
      this.doupdate();
     }
     showToast() {
         let toast = this.toastCtrl.create({
           message: 'Profil mis à jour !',
           duration: 2000,
           position: 'bottom'
         });

         toast.present(toast);
       }
       showerrupdateAlert() {
           let alert = this.alertCtrl.create({
             title: '',
             mode: 'ios',
             subTitle: "Un problème est survenu, mise à jour annulée !",
             buttons: ['Ok']
           });
           alert.present();
         }

         back(){
           this.showConfirm();
         }
         showConfirm() {
           let confirm = this.alertCtrl.create({
             title: '',
             message: "Voulez-vous vraiment annuler la modification ?",
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

confirmchanges(){
  this.showConfirmchanges();
}

showConfirmchanges() {
  let confirm = this.alertCtrl.create({
    title: '',
    message: "Voulez-vous appliquer les modifications ?",
    mode: 'ios',
    buttons: [
      {
        text: "Quitter",
        handler: () => {
          console.log('Disagree clicked');
            this.gotomain();
        }
      },
      {
        text: 'Appliquer',
        handler: () => {
          console.log('Agree clicked');
            this.update();
        }
      }
    ]
  });
  confirm.present();
}



updateUrl(event){
  if(this.gender=="Homme"){
    this.Profilephoto="assets/img/profile_m_default.png";
  }
  else if(this.gender=="Femme"){
    this.Profilephoto="assets/img/profile_f_default.png";
  }
  else{
    this.Profilephoto="assets/img/profile_m_default.png";
  }

}



}
