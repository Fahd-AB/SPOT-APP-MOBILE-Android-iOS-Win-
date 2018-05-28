import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController,ToastController,ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import {Connexion} from '../../classes/connexion';
import { Geolocation } from '@ionic-native/geolocation';
import { Trans } from '../trans/trans';
declare var google;
import * as $ from 'jquery';
/**
 * Generated class for the Transport page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transport',
  templateUrl: 'transport.html',
})
export class Transport {
  maps: any =[];
  cards:any;
  Profileid :string;
  url:string="";
  Region="Choix Région";
  specifiedreg:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
     public geolocation: Geolocation,public alertCtrl: AlertController,public http : Http
     , private storage :Storage,public toastCtrl: ToastController,public modalCtrl: ModalController) {
         var reg=this.navParams.get('TRegion');
         this.specifiedreg=reg;
         if(reg!=null && reg!=""){
           this.Region="Vers "+reg;
         }
       try{
         this.storage.get('url').then((val)=>{
         this.url=val;
         });
         this.storage.get('Profileid').then((val)=>{
         this.Profileid=val;
         });
       }catch(e){
        // error getting value or inexistant
       }
  }

  ionViewDidLoad() {
    if(this.specifiedreg!=null && this.specifiedreg!=""){
        this.loadalloffers(this.specifiedreg);
    }
    else{
       this.loadalloffers("");
    }
    console.log('ionViewDidLoad Transport');
  }














  loadalloffers(region){

    this.cards=[];
    let Data={
      region:region,
      operation: 'select'
    }
    let conn=new Connexion(this.http,this.storage);
    if(region!=null && region!=""){
        conn.select('transport_region',Data);
    }
    else{
        conn.select('transport',Data);
    }
    setTimeout(() => {
      var res=conn.result;
      var select_res=conn.select_res;

      if(res==2){
         // there is offers of transportation
         $('#container15').html('');
         var json = JSON.parse(select_res);

         this.cards=[];
         for (var i = 0; i < json.length; i++) {
           var x = (new Date()).getTimezoneOffset() * 60000;
           var now = (new Date(Date.now() - x)).toISOString();
           var datefromnow=(new Date(json[i].expiration_date)).valueOf() - (new Date(now)).valueOf();
          var offrestands="";
          var theme="";
           if(datefromnow>0){
             offrestands=this.expireTime(datefromnow);
             theme="temp-exp";
             $('#invrow'+json[i].id).removeClass('invisible');
           }
           else{
             offrestands="Offre Expiré";
             theme="temp-exp-red";
           }
           var offre={ "id":json[i].id,
                     "client_id":json[i].client_id,
                     "client_name": json[i].client_prenom+" "+json[i].client_nom_famille,
                     "client_photo": this.url+"/img/"+json[i].client_photo+".png",
                     "date": json[i].date.substring(0,10)+"   "+json[i].date.substring(11,(json[i].date.toString().length)-8),
                     "distance" : json[i].distance,
                     "destination":json[i].destination,
                     "tarif" : json[i].tarif,
                     "transport_type" : json[i].transport_type,
                     "nb_max_inscri" : json[i].nb_max_inscri,
                     "nb_inscri" : json[i].nb_inscri,
                     "statut" : json[i].statut,
                     "expiration_date" : json[i].expiration_date,
                     "id_begin_pos" : json[i].id_begin_pos,
                     "id_end_pos" : json[i].id_end_pos,
                     "p_begin_lat" : json[i].p_begin_lat,
                     "p_begin_lng" : json[i].p_begin_lng,
                     "p_end_lat" : json[i].p_end_lat,
                     "p_end_lng" : json[i].p_end_lng,
                     "offrestands" : offrestands,
                     "theme" : theme,
                     "timesince" : this.msToTime((new Date(now)).valueOf() - (new Date(json[i].date)).valueOf())
                   }
                this.cards.push(offre);
                var mapinfo={ "id":'Smap'+json[i].id,
                              "id_begin_pos" : json[i].id_begin_pos,
                              "id_end_pos" : json[i].id_end_pos,
                              "p_begin_lat" : json[i].p_begin_lat,
                              "p_begin_lng" : json[i].p_begin_lng,
                              "p_end_lat" : json[i].p_end_lat,
                              "p_end_lng" : json[i].p_end_lng
                            }
                 this.maps.push(mapinfo);
         }


             // last but not least
             setTimeout(() => {
             this.loadmaps();
             }, 1000);


      }
      else{
        // no offer found or error connect to server
            $('#container15').html('<div class="normaltextcenter">Aucun offre trouvé</div>');
      }
         //this.loadmaps();
    }, 3000);

  }







loadmaps(){

  for (var i = 0; i < this.maps.length; i++) {
    var latlng = new google.maps.LatLng(this.maps[i].p_begin_lat,this.maps[i].p_begin_lng);
    let map = new google.maps.Map(document.getElementById(this.maps[i].id), {
      center: latlng,
      zoom: 12
    });
    this.drawpoints(map,this.maps[i]);
  }

}
drawpoints(map,mapinfo){
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
     directionsDisplay.setMap(map);
     directionsService.route({
       origin: new google.maps.LatLng(mapinfo.p_begin_lat,mapinfo.p_begin_lng),
       destination: new google.maps.LatLng(mapinfo.p_end_lat,mapinfo.p_end_lng),
       travelMode: 'DRIVING',
       optimizeWaypoints: true,
     }, function(response, status) {
       if (status === 'OK') {
         directionsDisplay.setDirections(response);
       } else {
          console.log('Directions request failed');
       }
     });
}


rejoindre(id_offre){
  this.verifabonnement(this.Profileid,id_offre);
}
verifabonnement(id,id_offre){
  let Data={
    "client_id": id,
    "offre_id": id_offre
  }
  let conn=new Connexion(this.http,this.storage);
  conn.select('nb_trans_ab',Data);
  setTimeout(() => {
    var res=conn.result;
    var select_res=conn.select_res;
    if(res==2){
       var json = JSON.parse(select_res);
       if(json==0){
         this.addtransabonn(id,id_offre);
       }
       else{
          this.cusAlert('Vous avez déja rejoindre cet offre !');
       }
    }
    else{
      // no offer found or error connect to server
    }
       return json;
  }, 1000);
}



addtransabonn(id,id_offre){
  var x = (new Date()).getTimezoneOffset() * 60000;
  var today = (new Date(Date.now() - x)).toISOString();
  let Data={
    client_id : id,
    offre_id : id_offre,
    date: today
  }
  let conn=new Connexion(this.http,this.storage);
  conn.insert('transportation_add',Data);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
         this.cusAlert('Vous avez bien rejoindre cet offre !');
    }
    else{
        this.showerrToast('Erreur, Opération non effectué !');
    }
  }, 2000);

}

showerrToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }






loadspecoffers(region){
$('#container15').html('<div class="loadingcontainer"><img src="assets/img/loading_simple.gif" class="loadingimg"></div>');
this.cards=[];
this.maps=[];
this.loadalloffers(region);
}


 setregion(){

   let prompt = this.alertCtrl.create({
   message: 'Dans quel région vous chercher un offre de transport ?',
   mode : 'ios',
   inputs : [
   {
       type:'radio',
       label: "Ariana",
       value:'Ariana',
       checked: true
   },
   {
       type:'radio',
       label: "Béja",
       value:'Béja'
   },
   {
       type:'radio',
       label: "Ben Arous",
       value:'Ben Arous'
   },
   {
       type:'radio',
       label: "Bizerte",
       value:'Bizerte'
   },
   {
       type:'radio',
       label: "Gabes",
       value:'Gabes'
   },
   {
       type:'radio',
       label: "Gafsa",
       value:'Gafsa'
   },
   {
       type:'radio',
       label: "Jendouba",
       value:'Jendouba'
   },
   {
       type:'radio',
       label: "Kairouan",
       value:'Kairouan'
   },
   {
       type:'radio',
       label: "Kasserine",
       value:'Kasserine'
   },
   {
       type:'radio',
       label: "Kebili",
       value:'Kebili'
   },
   {
       type:'radio',
       label: "La Manouba",
       value:'La Manouba'
   },
   {
       type:'radio',
       label: "Le Kef",
       value:'Le Kef'
   },
   {
       type:'radio',
       label: "Mahdia",
       value:'Mahdia'
   },
   {
       type:'radio',
       label: "Médenine",
       value:'Médenine'
   },
   {
       type:'radio',
       label: "Monastir",
       value:'Monastir'
   },
   {
       type:'radio',
       label: "Nabeul",
       value:'Nabeul'
   },
   {
       type:'radio',
       label: "Sfax",
       value:'Sfax'
   },
   {
       type:'radio',
       label: "Sidi Bouzid",
       value:'Sidi Bouzid'
   },
   {
       type:'radio',
       label: "Siliana",
       value:'Siliana'
   },
   {
       type:'radio',
       label: "Sousse",
       value:'Sousse'
   },
   {
       type:'radio',
       label: "Tataouine",
       value:'Tataouine'
   },
   {
       type:'radio',
       label: "Tozeur",
       value:'Tozeur'
   }
   ,
   {
       type:'radio',
       label: "Tunis",
       value:'Tunis'
   },
    {
        type:'radio',
        label: "Zaghouan",
        value:'Zaghouan'
    },
     {
         type:'radio',
         label: "Tout les offres",
         value:'TLO'
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
       if(data=='TLO'){
          this.Region="Choix Région";
          this.loadspecoffers("");
       }
       else{
          this.Region="Vers "+data;
          this.loadspecoffers(data);
       }
        //this.type=data;
       }
   }]});
   prompt.present();

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

 expireTime(s) : string{
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  if(hrs==0 && mins==0)
      return "Expire dans "+secs+" sec";
  else if(hrs==0)
      return 'Expire dans '+mins+' min';
  else if(hrs<24)
      return 'Expire dans '+hrs+' hrs';
  else
      return 'Expire dans '+Math.floor(hrs/24)+' jrs';
}



  gotomain(){
    this.viewCtrl.dismiss();
  }

  tooffertras(){
    this.viewCtrl.dismiss();
    let modal= this.modalCtrl.create(Trans);
    modal.present();
  }


  connAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      mode: 'ios',
      subTitle: "Veuillez vérifier votre connection internet et revérifier l'activation de la géolocalisation.",
      buttons: ['OK']
    });
    alert.present();
  }



  cusAlert(msg) {
    let alert = this.alertCtrl.create({
      title: '',
      mode: 'ios',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
