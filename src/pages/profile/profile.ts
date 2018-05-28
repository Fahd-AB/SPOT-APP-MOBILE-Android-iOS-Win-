import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController,ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Settings } from '../settings/settings';
import { Notifications } from '../notifications/notifications';
import { Photos } from '../photos/photos';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import {Connexion} from '../../classes/connexion';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  Profileid : string="";
  ProfileName : string="";
  ProfileRegion : string="";
  Profilefreinds : string="";
  Profileevents : string="";
  Profilegender : string="";
  Profilebirthdate : string="";
  Profilephoto : string="";
  Profilecouverture : string="";
  addedPhoto : string="";
  base64Image : string;
  newstext : string;
  date: string;
  url:string="";
  cards: any;
  Profilepic :string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,
     private app: App,public viewCtrl: ViewController, public modalCtrl: ModalController,
     private storage :Storage,public loadingCtrl: LoadingController, public alertCtrl: AlertController,
     public http : Http,private camera: Camera,private transfer: Transfer) {
  }

  ionViewDidLoad() {
    this.loadprofileinfos();
    this.addedPhoto="assets/img/whiteline.png";
    console.log('ionViewDidLoad Profile');
  this.loadnews();
  }
  showToast() {
      let toast = this.toastCtrl.create({
        message: 'Publié avec succés !',
        duration: 2000,
        position: 'bottom'
      });

      toast.present(toast);
    }

  loadprofileinfos(){

    try{
      this.storage.get('url').then((val)=>{
      this.url=val;
      });
      this.storage.get('Profilephoto').then((val)=>{
        if(val=="" || val==null)
        {
          this.Profilephoto="assets/img/profile_m_default.png";
        }
        else{
          this.Profilephoto=this.url+'/img/'+val+'.png';
        }
        this.Profilepic=val;
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
    this.storage.get('Profileid').then((val)=>{
    this.Profileid=val;
    });
    this.storage.get('Profilename').then((val)=>{
    this.ProfileName=val;
    });
    this.storage.get('Profileregion').then((val)=>{
    this.ProfileRegion=val;
    });
    this.storage.get('Profilefreinds').then((val)=>{
    this.Profilefreinds=val;
    });
    this.storage.get('Profileevents').then((val)=>{
    this.Profileevents=val;
    });
    this.storage.get('Profilegender').then((val)=>{
      if(val=="m"){
          this.Profilegender="Homme";
      }
      else if(val=="f"){
          this.Profilegender="Femme";
      }
      else{
        this.Profilegender=val;
      }

    });
    this.storage.get('Profilebirthdate').then((val)=>{
    this.Profilebirthdate=val;
    });
    }catch(e){
     // error getting value or inexistant
    }

  }
  gotomain(){
    this.viewCtrl.dismiss();

  //this.app.getRootNav().setRoot( Tabs );
  }
  gotosettings(){
    this.viewCtrl.dismiss();
      let modal= this.modalCtrl.create(Settings);
      modal.present();
  }
  gotonotif(){
    this.viewCtrl.dismiss();
      let modal= this.modalCtrl.create(Notifications);
      modal.present();
  }

  publish(){
    if(this.newstext==null){
      this.emptyerr();
    }
    else{
    //loading and publish
    if(this.base64Image!=null){
      var name = (Math.floor(100000 + Math.random() * 900000)).toString();
      this.upload(this.base64Image,name);
      this.presentlongLoading();
    }
    else{
      this.createnews();
      this.presentLoading();
    }
    }

  }
  emptyerr(){

        let alert = this.alertCtrl.create({
          title: '',
          mode: 'ios',
          subTitle: "Vous devez écrire une chose !",
          buttons: ['Ok']
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
   }
   presentlongLoading() {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        spinner: 'ios',
        duration: 6000
      });
      loader.present();
    }

   createnews(){
     var x = (new Date()).getTimezoneOffset() * 60000;
     this.date = (new Date(Date.now() - x)).toISOString();
     let Data={
       client_id : this.Profileid,
       news_text: this.newstext,
       date_n: this.date,
       media: "NO"
     }

     let conn=new Connexion(this.http,this.storage);
     conn.insert('news',Data);
     setTimeout(() => {
       var res=conn.result;
       console.log(res);
       if(res==2){
         this.newstext="";
         this.base64Image="";
         this.showToast();
         // wait 2 second
           setTimeout(() => { this.loadnews(); }, 2000);
       }
       else{
           this.showerrcreateAlert();
       }
     }, 3000);

     }



       showerrcreateAlert() {
           let alert = this.alertCtrl.create({
             title: '',
             mode: 'ios',
             subTitle: "Un problème est survenu, publication annulée !",
             buttons: ['Ok']
           });
           alert.present();
         }


gotophotos(){
  this.viewCtrl.dismiss();
    let modal= this.modalCtrl.create(Photos);
    modal.present();
}
updateUrl(event){



}

addPhoto(){
this.showConfirm();
}

showConfirm() {
  let confirm = this.alertCtrl.create({
    title: '',
    message: "Choisissez la méthode d'importation de l'image au publication",
    mode: 'ios',
    buttons: [
      {
        text: "Galerie",
        handler: () => {
          //console.log('Disagree clicked');
          this.galery();
        }
      },
      {
        text: 'Prendre une photo',
        handler: () => {
          //console.log('Agree clicked');
            // ok quit
               this.takePhoto();
        }
      }
    ]
  });
  confirm.present();
}




takePhoto(){
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
 this.base64Image = 'data:image/png;base64,' + imageData;
}, (err) => {
 // Handle error
 console.log(err);
});
}

galery(){
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
 this.base64Image = 'data:image/png;base64,' + imageData;
}, (err) => {
 // Handle error
 console.log(err);
});
}



upload(imageData : string, name: string){
const fileTransfer: TransferObject = this.transfer.create();
  let options1: FileUploadOptions = {
     fileKey: 'file',
     fileName: name+'.png',
     headers: {}
  }
  this.presentlongLoading();
fileTransfer.upload(imageData, this.url+'/upload.php', options1)
.then((data) => {
  //sucess upload
  var x = (new Date()).getTimezoneOffset() * 60000;
  this.date = (new Date(Date.now() - x)).toISOString();
  let Data={
    client_id : this.Profileid,
    client_name : this.ProfileName,
    client_photo : this.Profilepic,
    news_text: this.newstext,
    date_n: this.date,
    media: name
  }

  let conn=new Connexion(this.http,this.storage);
  conn.insert('news',Data);
  setTimeout(() => {
    var res=conn.result;
    console.log(res);
    if(res==2){
      this.newstext=null;
      this.base64Image=null;
      this.addedPhoto="assets/img/whiteline.png";
      this.showToast();
    }
    else{
        this.showerrcreateAlert();
    }
  }, 3000);


}, (err) => {
    this.showerrcreateAlert();
});


}
presentmedLoading() {
   let loader = this.loadingCtrl.create({
     content: "Please wait...",
     spinner: 'ios',
     duration: 2500
   });
   loader.present();
 }


loadnews(){
  // lunch loading
  //this.presentmedLoading();

  this.storage.get('Profileid').then((val)=>{
    let Data={
      id : val,
      operation : "select",
    }
    let conn=new Connexion(this.http,this.storage);
    conn.select('client_publication',Data);
    setTimeout(() => {
      var res=conn.result;
      var select_res=conn.select_res;

      if(res==2){
        this.cards=[];
        var json=JSON.parse(select_res);
        //console.log(json);
          for (var i=json.length-1; i>=0; i--) {

            var x = (new Date()).getTimezoneOffset() * 60000;
            var now = (new Date(Date.now() - x)).toISOString();
            var med="";
            if(json[i].media=="NO"){
                med="assets/img/whiteline.png";
            }
            else{
                med=this.url+"/img/"+json[i].media+".png";
            }
            var pub={
              "pub_id":json[i].id,
              "pub_id_client":json[i].id_client,
              "pub_text":json[i].text,
              "pub_date":json[i].date.substring(0,10)+"   "+json[i].date.substring(11,(json[i].date.toString().length)-8),
              "pub_nb_likes":json[i].nb_likes,
              "pub_nb_comm":json[i].nb_comm,
              "pub_media":med,
              "pub_client_name":json[i].prenom+" "+json[i].nom_famille,
              "pub_profilephoto": this.url+"/img/"+json[i].profilephoto+".png",
              "timesince" :   this.msToTime((new Date(now)).valueOf() - (new Date(json[i].date)).valueOf())
            }
            this.cards.push(pub);
          }
      }
      else if(res==1){
           // no result
      }
      else{
          // error not connected to server
      }
    }, 2000);


  });


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
