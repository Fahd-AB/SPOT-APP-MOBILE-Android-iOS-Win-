import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController,AlertController,ModalController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {Connexion} from '../../classes/connexion';
import { ToastController } from 'ionic-angular';
import * as $ from 'jquery';
import { Eventedit } from '../eventedit/eventedit';
/**
 * Generated class for the Eventinfos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eventinfos',
  templateUrl: 'eventinfos.html',
})
export class Eventinfos {
  logotype: string="assets/img/loading_simple.gif";
  titre: string;
  type: string;
  desc: string;
  status: string;
  date_creation: string;
  nb_abonnes: string;
  payement : string;
  color: string;
  abonner:string="Abonner";
  btnicon:string="ios-notifications-outline";
  Profileid: string;
  Data : any;
  PayementData : any=null;
  cards: any;
  url:string;
  ANCREQ:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
  private storage :Storage, public http : Http,public loadingCtrl: LoadingController,
  public toastCtrl: ToastController, public alertCtrl: AlertController,public modalCtrl: ModalController) {
    let passedData={
      id: this.navParams.get('id'),
      lat : this.navParams.get('lat'),
      lng: this.navParams.get('lng'),
      id_client :this.navParams.get('id_client'),
      titre : this.navParams.get('titre'),
      type: this.navParams.get('type'),
      description : this.navParams.get('description'),
      autre : this.navParams.get('autre'),
      prepaye: this.navParams.get('prepaye'),
      date : this.navParams.get('date'),
      nb_abonnees: this.navParams.get('nb_abonnees'),
      statut : this.navParams.get('statut'),
      positionlat :this.navParams.get('positionlat'),
      positionlng :this.navParams.get('positionlng')
    }
    this.Data=passedData;
  }

  ionViewDidLoad() {
    try{
      this.storage.get('url').then((val)=>{
      this.url=val;
      });
      this.storage.get('Profileid').then((val)=>{
      this.Profileid=val;
      });
    }
    catch(e){
      // error getting value or inexistant
    }
      this.presentLoading();
      this.geteventpayement(this.Data.id);
    console.log('ionViewDidLoad Eventinfos');
  }

  gotomain(){
    this.viewCtrl.dismiss();

  //this.app.getRootNav().setRoot( Tabs );
  }


  geteventpayement(e_id){
    let Data={
      operation : "select",
      id_event:  e_id
    }
    let conn=new Connexion(this.http,this.storage);
    conn.select('payement_s',Data);
    setTimeout(() => {
      var res=conn.result;
      var select_res=conn.select_res;

      if(res==2){
        let json :any = JSON.parse(select_res);
        for (var i = 0; i < json.length; i++) {
          var id=JSON.stringify(json[i].id);
          var montant=JSON.stringify(json[i].montant);
          var methode=JSON.stringify(json[i].methode);
          var email=JSON.stringify(json[i].email);
          var page_url=JSON.stringify(json[i].page_url);
          // convert data to stringify
          var stid=id.toString().substring(1,(id.toString().length)-1);
          var stmontant=montant.toString().substring(1,(montant.toString().length)-1);
          var stmethode=methode.toString().substring(1,(methode.toString().length)-1);
          var stemail=email.toString().substring(1,(email.toString().length)-1);
          var stpage_url=page_url.toString().substring(1,(page_url.toString().length)-1);

          let auxData={
            id: stid,
            event_id : e_id,
            montant: stmontant,
            methode : stmethode,
            email: stemail,
            page_url: stpage_url
          }
          this.PayementData=auxData;
        }
      //console.log(this.cards);

      }
      else if(res==1){
           // no result
      }
      else{
          // error not connected to server
      }
        this.loaddetails();
    }, 2000);

  }



  loaddetails(){
    var icon;
    switch (this.Data.type) {
       case "Café":
       icon="coffee-n-tea";
       break;
       case "Conférence":
       icon="community";
       break;
       case "Soutenance":
       icon="schools";
       break;
       case "Théatre":
       icon="nightlife";
       break;
       case "Cinéma":
       icon="movies";
       break;
       case "Domicile":
       icon="residential-places";
       break;
       case "Education":
       icon="books-media";
       break;
       case "Jeu":
       icon="pool-halls";
       break;
       case "Bar":
       icon="bars";
       break;
       case "Hotel":
       icon="hotels";
       break;
       case "Sport":
       icon="sports";
       break;
       case "Musical":
       icon="musical";
       break;
       case "Voyage":
       icon="automotive";
       break;
       case "Restaurent":
       icon="food";
       break;
       case "Marriage":
       icon="jewelry";
       break;
       case "Fiancaille":
       icon="matrimonial";
       break;
       case "Emploi":
       icon="jobs";
       break;
       case "Mode":
       icon="fashion";
       break;
       case "Dance":
       icon="dance-clubs";
       break;
       case "Tournage":
       icon="photography";
       break;
       case "Religion":
       icon="religious-organizations";
       break;
       case "Magazinage":
       icon="shopping";
       break;
       case "Autre":
       icon="default";
       break;
       }
   this.logotype="assets/markers/"+icon+".png";
   if(this.PayementData!=null){
     this.titre=this.Data.titre;
     this.type=this.Data.type;
     this.date_creation=this.Data.date.substring(0,10)+"   "+this.Data.date.substring(11,(this.Data.date.length)-8);
     this.nb_abonnes=this.Data.nb_abonnees;
     this.desc=this.Data.description;
     this.payement=this.PayementData.montant+" $ - Via "+this.PayementData.methode;
     this.status="Prepayé";
     this.color="danger";
     console.log("load with payement");
   }
   else{
    this.titre=this.Data.titre;
    this.type=this.Data.type;
    this.date_creation=this.Data.date.substring(0,10)+"   "+this.Data.date.substring(11,(this.Data.date.length)-8);
    this.nb_abonnes=this.Data.nb_abonnees;
    this.desc=this.Data.description;
    this.payement="Gratuit - Aucun Payement";
    this.status="Gratuit";
    this.color="secondary";

     console.log("load without any payement");
   }

   let Data={
     client_id : this.Data.id_client,
     event_id : this.Data.id
   }

   let conn=new Connexion(this.http,this.storage);
   conn.exist('count_abonnement',Data);
   setTimeout(() => {
     var res=conn.result;
     if(res==2){
       var count=conn.rowcount;
       if(count==0 ){
         //do abonnement
       }
       else{
         // vous ete déja abonnée a cet evenement
         this.abonner="ANNULER ABONNEMENT";
         this.btnicon="ios-notifications-off-outline";
         // inviter vos amis
         this.loadinvitations();
       }
     }
     else{
         // err conn to server
     }
   }, 1500);

   this.checkowner();
  }


checkowner(){
  if(this.Data.id_client==this.Profileid){
    $('#ctrlbuttons').removeClass('invisible');
  }
}
loadinvitations(){
  this.ANCREQ=[];
  let Data={
    client_id : this.Profileid,
    ev_id : this.Data.id,
    text : 'a vous invité à rejoindre un événement'
  }
  let conn=new Connexion(this.http,this.storage);
  conn.select('notifs_inv',Data);
  setTimeout(() => {
    var res=conn.result;
    var select_res=conn.select_res;
    if(res==2){
        var json=JSON.parse(select_res);
        for (var i = 0; i < json.length; i++) {
            this.ANCREQ.push(json[i].id);
        }
    }
    else{
    }
    this.loadamis();
  }, 1500);

}


loadamis(){
  let Data={
    client_id : this.Profileid
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
         this.cards=[];
    }
    else{
        // error not connected to server
        this.cards=[];
    }
  }, 1500);
}
displayfreinds(json){
    this.cards=[];
    for (var i = 0; i < json.length; i++) {
      var btn="Inviter";
      var ico="ios-send-outline";
      if(this.ANCREQ.includes(json[i].id)){
        btn="Déja invité";
        ico="ios-checkmark-outline";
      }
      var Ami={"ami_id":json[i].id,
                "ami_prenom":json[i].prenom,
                "ami_nom_famille":json[i].nom_famille,
                "ami_photo": this.url+"/img/"+json[i].profilephoto+".png",
                "ami_region": json[i].region,
                "ami_statut" : json[i].statut,
                "button" : btn,
                "icon" : ico
              }
           this.cards.push(Ami);
    }
}




inviter_ami(ami_id){

  if(this.ANCREQ.includes(ami_id)){
   this.showerrAlert();
  }
  else{
  var id= this.Profileid;
  var x = (new Date()).getTimezoneOffset() * 60000;
  var today= (new Date(Date.now() - x)).toISOString();
  var data = {
  type : "EVE",
  texte: "a vous invité à rejoindre un événement",
  target_client: ami_id,
  target: this.Data.id,
  source_client: id,
  date :  today,
  vu : "0"
}
let conn=new Connexion(this.http,this.storage);
conn.insert('notif_inv',data);
setTimeout(() => {
  var res=conn.result;
  if(res==2){
this.showcustomToast('Ami invité avec succèes !');
this.loadinvitations();
  }
  else{
this.showcustomToast('Erreur, Opération annulé !');
  }
}, 1000);
}
}







modifier(){
    this.viewCtrl.dismiss();
  let modal= this.modalCtrl.create(Eventedit,{E: this.Data});
   modal.present();
}
supprimer(){

  let Data={
    event_id : this.Data.id
  }
  let conn=new Connexion(this.http,this.storage);
  conn.delete('delete_event',Data);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
      this.showcustomToast('Evenement supprimé avec succèes !');
      this.gotomain();
    }
    else{
       this.showcustomToast('Erreur, évenement non supprimé !');
    }
  }, 2000);

}






  presentLoading() {
     let loader = this.loadingCtrl.create({
       content: "Please wait...",
       spinner: 'ios',
       duration: 3500
     });
     loader.present();
   }
   presentshortLoading() {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        spinner: 'ios',
        duration: 2000
      });
      loader.present();
    }





abonnement(){
  this.presentshortLoading();
  if(this.abonner=="Abonner"){
    //abonner
    var x = (new Date()).getTimezoneOffset() * 60000;
    var date_time = (new Date(Date.now() - x)).toISOString();
    var stat="1";
    if((this.Data.prepaye=="1") && (this.Data.id_client!=this.Profileid)){
      stat="0";
    }
    let data={
      client_id : this.Profileid,
      event_id : this.Data.id,
      createur_id : this.Data.id_client,
      date_time: date_time,
      statut : stat
    }

    let conn=new Connexion(this.http,this.storage);
    conn.insert('abonnement_add',data);
    setTimeout(() => {
      var res=conn.result;
      if(res==2){
        if(this.Data.id_client!=this.Profileid){
        this.addnotification(this.Data.id,this.Data.id_client,'a abonné a votre événement',"EVE");
            }
        this.abonner="ANNULER ABONNEMENT";
        this.btnicon="ios-notifications-off-outline";
        this.cards=null;
        this.geteventpayement(this.Data.id);
        if(this.Data.prepaye=="1"){
           if(this.Data.id_client!=this.Profileid){
             this.showAlert();
           }
           else{
             this.showToast();
           }
        }
        else{
           this.showToast();
        }
      }
      else{
          this.showerrToast();
      }
    }, 2000);

  }
  else{
    // désabonner
    let Data={
      operation: "delete",
      client_id : this.Data.id_client,
      event_id : this.Data.id,
    }
    let conn=new Connexion(this.http,this.storage);
    conn.delete('abonnement',Data);
    setTimeout(() => {
      var res=conn.result;
      console.log(res);
      if(res==2){
        // remove abonnement
        if(this.Data.id_client!=this.Profileid){
        this.addnotification(this.Data.id,this.Data.id_client,'a désabonné de votre événement',"EVE");
        }
        this.showdelToast();
        this.abonner="Abonner";
        this.btnicon="ios-notifications-outline";
        this.cards=null;
        this.geteventpayement(this.Data.id);
      }
      else{
          this.showerrdelToast();
      }
    }, 2000);
  }


}



addnotification(target,target_c,texte,type){
  var id= this.Profileid;
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





showerrAlert() {
  let confirm = this.alertCtrl.create({
    title: '',
    message: "Vous avez déja invité cet ami à l'événement !",
    mode: 'ios',
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          console.log('Agree clicked');
        }
      }
    ]
  });
  confirm.present();
}



showAlert() {
  let confirm = this.alertCtrl.create({
    title: '',
    message: "Abonnement en attente de payement, L'abonnement n'est pas valide que lorsque vous signaler le payement dans la page des abonnements !",
    mode: 'ios',
    buttons: [
      {
        text: 'Page de payement',
        handler: () => {
          console.log('Agree clicked');
        //  console.log(this.PayementData);
          window.open(this.PayementData.page_url, '_system');
        }
      }
    ]
  });
  confirm.present();
}

showcustomToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }

showConfirm() {
  let confirm = this.alertCtrl.create({
    title: '',
    message: "Voulez-vous vraiment supprimer cet événement ?",
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
          this.supprimer();
        }
      }
    ]
  });
  confirm.present();
}

showToast() {
    let toast = this.toastCtrl.create({
      message: 'Abonnée avec succés !',
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }
  showerrToast() {
      let toast = this.toastCtrl.create({
        message: "Echec de l'abonnement !",
        duration: 2000,
        position: 'bottom'
      });

      toast.present(toast);
    }
    showdelToast() {
        let toast = this.toastCtrl.create({
          message: 'Désabonnement effectué avec succées !',
          duration: 2000,
          position: 'bottom'
        });

        toast.present(toast);
      }
      showerrdelToast() {
          let toast = this.toastCtrl.create({
            message: "Echec de l'opération !",
            duration: 2000,
            position: 'bottom'
          });

          toast.present(toast);
        }

}
