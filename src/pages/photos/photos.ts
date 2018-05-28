import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController,ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Profile } from '../profile/profile';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Connexion } from '../../classes/connexion';
/**
 * Generated class for the Photos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class Photos {
  Profileid : string="";
  Profilephoto : string;
  Profilegender: string="";
  Profilecouverture : string;
  url:string="";
  base64Image : string;
  base64Imagecover: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
     private app: App,public viewCtrl: ViewController, public modalCtrl: ModalController,
     public storage :Storage,public loadingCtrl: LoadingController, public alertCtrl: AlertController,
      public http : Http,private camera: Camera,private transfer: Transfer) {


  }

  ionViewDidLoad() {
    this.loadprofileinfos();
    this.presentLoading();
    console.log('ionViewDidLoad Photos');
  }
backtoprofile(){
  this.viewCtrl.dismiss();
  let modal= this.modalCtrl.create(Profile);
  modal.present();
}


presentLoading() {
   let loader = this.loadingCtrl.create({
     content: "Please wait...",
     spinner: 'ios',
     duration: 2000
   });
   loader.present();
 }




  loadprofileinfos(){

    try{
    this.storage.get('url').then((val)=>{
    this.url=val;
    });
    this.storage.get('Profileid').then((val)=>{
    this.Profileid=val;
    });
    this.storage.get('Profilegender').then((val)=>{
    this.Profilegender=val;
    });
    this.storage.get('Profilephoto').then((val)=>{
      if(val=="" || val==null)
      {
        this.Profilephoto="assets/img/profile_m_default.png";
      }
      else{
        this.Profilephoto=this.url+'/img/'+val+'.png';
      }
    });
    this.storage.get('Profilecover').then((val)=>{
      if(val=="" || val==null)
      {
          this.Profilecouverture="assets/img/profile_couverture_dafault.png";
      }
      else{
        this.Profilecouverture=this.url+'/img/'+val+'.png';
      }

    });



    }catch(e){
     // error getting value or inexistant
    }

  }

  updateUrl(event){
/*
    if(this.Profilegender=="m"){
      this.Profilephoto="assets/img/profile_m_default.png";
    }
    else if(this.Profilegender=="f"){
      this.Profilephoto="assets/img/profile_f_default.png";
    }
    else{
      this.Profilephoto="assets/img/profile_m_default.png";
    }
    this.Profilecouverture="assets/img/profile_couverture_dafault.png";
*/
  }

takePhoto(){
  const options: CameraOptions = {
  quality: 100,
  targetHeight: 105,
  targetWidth: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.PNG,
  mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.base64Image = 'data:image/png;base64,' + imageData;
}, (err) => {
 // Handle error
 console.log(err);
});
}

galery(){
  const options: CameraOptions = {
  quality: 100,
  targetHeight: 105,
  targetWidth: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.PNG,
  sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.base64Image = 'data:image/png;base64,' + imageData;
}, (err) => {
 // Handle error
 console.log(err);
});
}







// for cover photos





takePhotoCover(){
  const options: CameraOptions = {
  quality: 100,
  targetHeight: 540,
  targetWidth: 720,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.PNG,
  mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.base64Imagecover = 'data:image/png;base64,' + imageData;
}, (err) => {
 // Handle error
 console.log(err);
});
}

galeryCover(){
  const options: CameraOptions = {
  quality: 100,
  targetHeight: 540,
  targetWidth: 720,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.PNG,
  sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.base64Imagecover = 'data:image/png;base64,' + imageData;
}, (err) => {
 // Handle error
 console.log(err);
});
}

 // update photos
updatephoto(){
      var name = (Math.floor(100000 + Math.random() * 900000)).toString();
      this.upload(this.base64Image,"profile",name);
}

updatephotocov(){
      var name = (Math.floor(100000 + Math.random() * 900000)).toString();
      this.upload(this.base64Imagecover,"cover",name);
}




upload(imageData : string,type: string, name: string){
const fileTransfer: TransferObject = this.transfer.create();
  let options1: FileUploadOptions = {
     fileKey: 'file',
     fileName: name+'.png',
     headers: {}
  }
  let Data={
    client_id : this.Profileid,
    photourl : name
  }
  let conn=new Connexion(this.http,this.storage);
  this.presentlongLoading();
fileTransfer.upload(imageData, this.url+'/upload.php', options1)
.then((data) => {
 // success upload
 if(type=="profile"){
   conn.update('client_photo',Data);
 }
 else{
   conn.update('client_cover',Data);
 }
 setTimeout(() => {
   var res=conn.result;

   if(res==2){
         // all is done ok !!!!
         if(type=="profile"){
           this.storage.set('Profilephoto',name);
         }
         else{
          this.storage.set('Profilecover',name);
         }
      // alert("success");

      this.showConfirm();
   }
   else if(res==1){
     //console.log("no answer from server");
     this.showerrAlert();
   }
   else{
    //  console.log("not connected to server");
    this.showerrAlert();
   }
 }, 2000);
}, (err) => {
this.showerrAlert();
});


}

  showerrAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: "Un problème est survenu, opération annulée !",
        buttons: ['Ok']
      });
      alert.present();
    }
    showConfirm() {
      let confirm = this.alertCtrl.create({
        title: '',
        message: "Photo ajoutées avec succées !",
        mode: 'ios',
        buttons: [
          {
            text: "Retour",
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Quitter',
            handler: () => {
              console.log('Agree clicked');
                // ok quit
                this.viewCtrl.dismiss();
            }
          }
        ]
      });
      confirm.present();
    }
    shownochangeConfirm() {
      let confirm = this.alertCtrl.create({
        title: '',
        message: "Vous devez modifier les photos !",
        mode: 'ios',
        buttons: [
          {
            text: "Retour",
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Quitter',
            handler: () => {
              console.log('Agree clicked');
                // ok quit
                this.viewCtrl.dismiss();
            }
          }
        ]
      });
      confirm.present();
    }


   presentlongLoading() {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        spinner: 'ios',
        duration: 6000
      });
      loader.present();
    }
}
