import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ViewController,ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import {Connexion} from '../../classes/connexion';
import * as $ from 'jquery';
/**
 * Generated class for the Reviews page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class Reviews {
  nomdulieu: string;
  D : any;
  Profileid : string="";
  url:string="";
  cards: any;
  ProfileName : string="";
  Profilephoto : string="";
  NOTE: string="Insèrer un avi";
  notetext: string;
  DEJADONNE:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage :Storage,
     public http : Http,public alertCtrl: AlertController,public viewCtrl: ViewController,
     public toastCtrl: ToastController) {
    this.D={
      id : this.navParams.get('id'),
      type: this.navParams.get('type'),
      nom : this.navParams.get('nom'),
    }
  }

  ionViewDidLoad() {
    this.nomdulieu=this.D.nom;
    this.loadprofileinfos();
    console.log('ionViewDidLoad Reviews');
  }
  loadprofileinfos(){

      try{
        this.storage.get('url').then((val)=>{
        this.url=val;
              this.storage.get('Profilephoto').then((val1)=>{
              this.Profilephoto=this.url+'/img/'+val1+'.png';
              });
        });
        this.storage.get('Profilename').then((val)=>{
        this.ProfileName=val;
        });
        this.storage.get('Profileid').then((val)=>{
        this.Profileid=val;
          this.getreviews();
        });
      }catch(e){
       // error getting value or inexistant
      }
    }





  getreviews(){
    let Data={
      lieu_id : this.D.id
    }
    let conn=new Connexion(this.http,this.storage);
    conn.select('reviews_all',Data);
    setTimeout(() => {
      var res=conn.result;
      var select_res=conn.select_res;

      if(res==2){
          var json=JSON.parse(select_res);
           this.displayavis(json);
      }
      else if(res==1){
           // no result
           $('#container10').html("<div class='normaltextcenter'>Pas d'avis pour ce lieu actuellement</div>");
           this.cards=[];
      }
      else{
          // error not connected to server
          $('#container10').html("<div class='normaltextcenter'>Pas d'avis pour ce lieu actuellement</div>");
          this.cards=[];
      }
    }, 3000);
  }


  displayavis(json){
    $('#container10').html("");
      this.cards=[];
      for (var i = json.length-1; i >=0 ; i--) {
        var x = (new Date()).getTimezoneOffset() * 60000;
        var now = (new Date(Date.now() - x)).toISOString();
        if(json[i].id_client==this.Profileid){
          this.DEJADONNE=true;
        }
        var Ami={ "avi_id":json[i].id,
                  "avi_id_client":json[i].id_client,
                  "avi_id_lieu":json[i].id_lieu,
                  "cl_name": json[i].prenom+" "+json[i].nom_famille,
                  "cl_Profilephoto" : this.url+"/img/"+json[i].Profilephoto+".png",
                  "avi_note" : json[i].note,
                  "avi_commentaire" : json[i].commentaire,
                  "avi_date" : json[i].date.substring(0,10)+"   "+json[i].date.substring(11,(json[i].date.toString().length)-8),
                  "timesince" : this.msToTime((new Date(now)).valueOf() - (new Date(json[i].date)).valueOf())
                }
             this.cards.push(Ami);
      }
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



inseravi(){

      let prompt = this.alertCtrl.create({
      message: 'Que pensez-vous de cet endroit ?',
      mode : 'ios',
      inputs : [
      {
          type:'radio',
          label: "J'ai détesté",
          value:'1',
          checked: true
      },
      {
          type:'radio',
          label: "Pas mal",
          value:'2'
      },
      {
          type:'radio',
          label: "Acceptable",
          value:'3'
      },
      {
          type:'radio',
          label: "Très bien",
          value:'4'
      },
      {
          type:'radio',
          label: "Excellent",
          value:'5'
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
           this.NOTE=data;
          }
      }]});
      prompt.present();

}


donner_avi(){
if(this.NOTE=="Insèrer un avi"){
  this.showerrcreateAlert("Il faut donner une note pour l'emplacement !");
}
else if(this.notetext==null || this.notetext==""){
  this.showerrcreateAlert("Donner des commentaires a propos de ce lieu !");
}
else{
  this.donneravi(this.NOTE,this.notetext);
}
}



donneravi(note,texte){
  this.notetext="";
  if(this.DEJADONNE){
    this.showerrcreateAlert('Vous avez déja donner un avi à propos de ce lieu !');
  }
  else{
  var x = (new Date()).getTimezoneOffset() * 60000;
  var today = (new Date(Date.now() - x)).toISOString();
  let Data={
    client_id : this.Profileid,
    lieu_id : this.D.id,
    comm: texte,
    note: note,
    date: today
  }
  let conn=new Connexion(this.http,this.storage);
  conn.insert('avi_new',Data);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
        this.showToast();
          // wait 1 second
        setTimeout(() => {
          this.cards=[];
          $('#container10').html('<div class="loadingcontainer"><img src="assets/img/loading_simple.gif" class="loadingimg"></div>');
          this.getreviews();
         }, 1000);
    }
    else{
          this.showerrToast();
    }
  }, 2000);
}
}


showToast() {
    let toast = this.toastCtrl.create({
      message: 'Avi ajouté avec succés !',
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }
  showerrToast() {
      let toast = this.toastCtrl.create({
        message: 'Erreur, Avi non publié !',
        duration: 2000,
        position: 'bottom'
      });

      toast.present(toast);
    }


       showerrcreateAlert(msg) {
           let alert = this.alertCtrl.create({
             title: '',
             mode: 'ios',
             subTitle: msg,
             buttons: ['Ok']
           });
           alert.present();
         }



gotomain(){
  this.viewCtrl.dismiss();
//this.app.getRootNav().setRoot( Tabs );
}
}
