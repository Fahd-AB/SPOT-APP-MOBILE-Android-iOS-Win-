import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController,AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Settings } from '../settings/settings';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Changeroot } from '../../SControler/Changeroot';
import { Connexion } from '../../classes/connexion';
/**
 * Generated class for the Password page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class Password {
  Profileid : string="";
  ProfileName : string="";
  ProfileRegion : string="";
  Profilephoto : string="";
  Profilegender : string="";
  currentpassword: string="";
  oldpassword: string;
  newpassword: string;
  cpassword: string;
  url:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
     public modalCtrl: ModalController, public changeroot: Changeroot, private storage :Storage, public alertCtrl: AlertController,
     public loadingCtrl: LoadingController,public toastCtrl: ToastController, public http : Http) {
  }

  ionViewDidLoad() {
      this.loadprofileinfos();
    console.log('ionViewDidLoad Password');
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
      this.storage.get('Profilecurrentpass').then((val)=>{
      this.currentpassword=val;
      });


      }catch(e){
       // error getting value or inexistant
      }
    }




backbtn(){
  this.showConfirmback();
}
gotomain(){
  this.viewCtrl.dismiss();
}
updatemdp(){
  if(this.oldpassword==null || this.newpassword==null || this.cpassword==null){
   this.showerrAlert();
  }
  else{

    if(this.oldpassword==this.currentpassword){
      if(this.newpassword==this.cpassword){
        //ok update mdp
        this.presentLoading();
      }
      else{
      this.showerridenticalAlert();
      }
    }
    else{
      this.showerrpassAlert();
    }

}
}
doupdatemdp(){
// do update mdp
let Data={
  //operation : "update_mdp",
  operation : "update",
  client_id : this.Profileid,
  password : this.newpassword
}

let conn=new Connexion(this.http,this.storage);
 conn.update('client_mdp',Data);
 setTimeout(() => {
   var res=conn.result;


        if(res==2){
              // all is done ok !!!!
              this.showToast();
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




/*
var link = 'http://localhost/api.php';
var data = JSON.stringify(Data);
this.http.post(link, data).subscribe(data => {
  var rep=data['_body'];
  if(rep=="[]"){
    //console.log('empty');
   this.showerrupdateAlert();
  }
  else{
    //all cool
  this.showToast();
  }


}, error => {
    this.showerrupdateAlert();
});
*/
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
showerrAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      mode: 'ios',
      subTitle: 'Tous les champs sont obligatoires !',
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
  this.doupdatemdp();
 }
 showToast() {
     let toast = this.toastCtrl.create({
       message: 'Mot de passe mis à jour ! déconnexion en cours..',
       duration: 2000,
       position: 'bottom'
     });

     toast.present(toast);
     // wait 2 seconds and logout
     setTimeout(() => {
     this.gotomain();
     this.changeroot.logout();
      }, 2000);
   }
showerrpassAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      mode: 'ios',
      subTitle: "L'ancien mot de passe est incorrecte !",
      buttons: ['Ressayer']
    });
    alert.present();
  }
showerridenticalAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      mode: 'ios',
      subTitle: 'Les mot de passe ne sont pas conformes !',
      buttons: ['Corriger']
    });
    alert.present();
  }
back(){
  this.showConfirm();
}
showConfirm() {
  let confirm = this.alertCtrl.create({
    title: '',
    message: "Voulez-vous vraiment annuler la modification du mot de passe ?",
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

showConfirmback() {
  let confirm = this.alertCtrl.create({
    title: '',
    message: "Voulez-vous retourner sur paramètres ?",
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
        text: 'Paramètres',
        handler: () => {
          console.log('Agree clicked');
          this.viewCtrl.dismiss();
          let modal= this.modalCtrl.create(Settings);
          modal.present();
        }
      }
    ]
  });
  confirm.present();
}


updateUrl(event){
  if(this.Profilegender=="Homme"){
    this.Profilephoto="assets/img/profile_m_default.png";
  }
  else if(this.Profilegender=="Femme"){
    this.Profilephoto="assets/img/profile_f_default.png";
  }
  else{
    this.Profilephoto="assets/img/profile_m_default.png";
  }

}



}
