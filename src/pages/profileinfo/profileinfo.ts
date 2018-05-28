import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,ViewController,ModalController,
AlertController,LoadingController } from 'ionic-angular';
//import * as $ from 'jquery';
import { Http } from '@angular/http';
import {Connexion} from '../../classes/connexion';
//import {Client} from '../../classes/client';
import { Storage } from '@ionic/storage';
import { Chat } from '../chat/chat';
/**
 * Generated class for the Profileinfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profileinfo',
  templateUrl: 'profileinfo.html',
})
export class Profileinfo {
  myid : string="";

  ProfileName : string="";
  ProfileRegion : string="";
  Profilefreinds : string="";
  Profileevents : string="";
  Profilegender : string="";
  Profilebirthdate : string="";
  Profilephoto : string="";
  Profilecouverture : string="";
  AMIS:any;
  PROFILE:any;
  cards: any;
  url:string="";
  pid : string;
  BTN : string="Chargement";
  BTNSTYLE : string="ios-repeat-outline";
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage :Storage,
   public http : Http,public toastCtrl: ToastController,public viewCtrl: ViewController,
   public modalCtrl: ModalController, public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
    this.pid=this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.presentmedLoading();
    this.Profilephoto='assets/img/loading_simple.gif';
    this.Profilecouverture='assets/img/white.png';
    this.loadprofileinfos();
    console.log('ionViewDidLoad Profileinfo');
  }
  loadprofileinfos(){

      try{
        this.storage.get('url').then((val)=>{
        this.url=val;
        });
      this.storage.get('Profileid').then((val)=>{
      this.myid=val;
           this.chargeprofile(this.pid,val);
      });
      }catch(e){
       // error getting value or inexistant
      }
    }
    loadamis(){
      let Data={
        client_id : this.myid
      }
      let conn=new Connexion(this.http,this.storage);
      conn.select('relation_s',Data);
      setTimeout(() => {
        var res=conn.result;
        var select_res=conn.select_res;
        if(res==2){
            var json=JSON.parse(select_res);
            var currentisfreind=false;
            for (var i=0; i<json.length; i++) {
              if(json[i].id==this.pid){
                currentisfreind=true;
              }
            }
            if(currentisfreind==true){
              // he is a freind
              this.BTN="Ne plus suivre";
              this.BTNSTYLE="ios-remove-circle-outline";
            }
            else{
              // he is not a freind
              this.BTN ="Suivre";
              this.BTNSTYLE="ios-add-circle-outline";
            }
        }
        else if(res==1){
             // no result
            console.log("cannot load freinds list");
        }
        else{
            // error not connected to server
            console.log("cannot load freinds list");
        }
      }, 2000);
    }


    chargeprofile(id,client_id){
      let Data={
        client_id : client_id,
        ami_id : id
      }
      let conn=new Connexion(this.http,this.storage);
      conn.select('show_profile_infos',Data);
      setTimeout(() => {
        var res=conn.result;
        var select_res=conn.select_res;
        if(res==2){
          var json=JSON.parse(select_res);
          this.PROFILE=json[0];
          this.ProfileName=json[0].prenom+" "+json[0].nom_famille;
          this.ProfileRegion=json[0].region;
          this.Profilefreinds=json[0].nb_amis;
          this.Profileevents=json[0].nb_evenement;
          if(json[0].sexe=="m"){
            this.Profilegender="Homme";
          }
          else if(json[0].sexe=="f"){
            this.Profilegender="Femme";
          }
          else{
            this.Profilegender="--";
          }
          this.Profilebirthdate=json[0].date_naissance;
          this.Profilephoto=this.url+'/img/'+json[0].profilephoto+'.png';
          this.Profilecouverture=this.url+'/img/'+json[0].profilecover+'.png';

        }
        else if(res==1){
             // no result
            this.showerrToast();
        }
        else{
            // error not connected to server
            this.showerrToast();
        }
        this.loadamis();
        this.loadnews();
      }, 1000);
    }

  contacter(){
    var Ami={ "ami_id":this.PROFILE.id,
              "ami_prenom":this.PROFILE.prenom,
              "ami_nom_famille":this.PROFILE.nom_famille,
              "ami_photo": this.url+"/img/"+this.PROFILE.profilephoto+".png",
              "ami_region": this.PROFILE.region,
              "ami_statut" : this.PROFILE.statut
            }
            let modal= this.modalCtrl.create(Chat,{E: Ami});
            modal.present();
  }


  check(){
    if(this.BTN=="Suivre"){
      this.ajout_ami();
    }
    else{
      this.retirer_ami();
    }
  }
  retirer_ami(){
  this.showConfirm();
  }
  ajout_ami(){
    var x = (new Date()).getTimezoneOffset() * 60000;
    var today= (new Date(Date.now() - x)).toISOString();
    var selected_id=this.pid;
    let Data={
      client_id : this.myid,
      ami_id: selected_id,
      date : today
    }
    let conn=new Connexion(this.http,this.storage);
    conn.insert('relation_add',Data);
    setTimeout(() => {
      var res=conn.result;
      if(res==2){
        this.addnotification('0',selected_id,'a commancé à vous suivre','INV');
        this.showsecondToast();
         setTimeout(() => {
         this.presentmedLoading();
         this.Profilephoto='assets/img/loading_simple.gif';
         this.Profilecouverture='assets/img/white.png';
         this.loadprofileinfos();
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









  addnotification(target,target_c,texte,type){
    var id= this.myid;
    var x = (new Date()).getTimezoneOffset() * 60000;
    var today= (new Date(Date.now() - x)).toISOString();
    var data = {
    type : type, // EVE PUB PAY
    texte: texte,
    target_client: target_c,
    target: target, // ab,ev,pub,rel
    source_client: id,
    date :  today,
    vu : "0"
  }
  let conn=new Connexion(this.http,this.storage);
  conn.insert('notif_inv',data);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
          //this.showcustomToast('Notifié avec succès');
    }
    else{
       //this.showcustomToast('Erreur, Opération annulé !');
    }
  }, 1000);
  }
  /*
  showcustomToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: 'bottom'
      });

      toast.present(toast);
    }
  */





  ret(){
    var selected_id=this.pid;
    let Data={
      client_id : this.myid,
      freind_id: selected_id
    }
    let conn=new Connexion(this.http,this.storage);
    conn.delete('relation_del',Data);
    setTimeout(() => {
      var res=conn.result;

      if(res==2){
        this.addnotification('0',selected_id,'ne vous suit plus','INV');
         this.showToast();
          setTimeout(() => {
          this.presentmedLoading();
          this.Profilephoto='assets/img/loading_simple.gif';
          this.Profilecouverture='assets/img/white.png';
          this.loadprofileinfos();
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


  loadnews(){
    // lunch loading
    //this.presentmedLoading();

    let Data={
      id : this.pid
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
    showsecondToast() {
        let toast = this.toastCtrl.create({
          message: 'Ami ajouté avec succés !',
          duration: 2000,
          position: 'bottom'
        });

        toast.present(toast);
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











    showerrToast() {
        let toast = this.toastCtrl.create({
          message: 'Erreur, Profile pas chargé !',
          duration: 2000,
          position: 'bottom'
        });

        toast.present(toast);
      }

    gotomain(){
      this.viewCtrl.dismiss();
    //this.app.getRootNav().setRoot( Tabs );
    }
}
