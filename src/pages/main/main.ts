import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, AlertController,Events } from 'ionic-angular';
import { MenuController, ModalController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Geolocation } from '@ionic-native/geolocation';
import { Search } from '../search/search';
import { Event } from '../event/event';
import { Profile } from '../profile/profile';
import { Directions } from '../directions/directions';
import { Eventinfos } from '../eventinfos/eventinfos';
import { Places } from '../places/places';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Connexion } from '../../classes/connexion';


declare var google;
/**
 * Generated class for the Main page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',

})

export class Main {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl : MenuController,
     public geolocation: Geolocation,private viewCtrl: ViewController, private app: App,
     public alertCtrl: AlertController, public modalCtrl: ModalController,  private storage :Storage,
      public http : Http, public events: Events) {
     StatusBar.show();

  }

  ionViewDidLoad() {
    this.events.subscribe('main:tabSelected', eventData => {
     // this.refresh();
       this.loadMap();
    });
    console.log('ionViewDidLoad Main');
  }

  loadMap(){

     this.geolocation.getCurrentPosition().then((position) => {

       let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

       let mapOptions = {
         center: latLng,
         zoom: 16,
         disableDefaultUI: true,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }

       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
       setTimeout(() => {
         try{

          let marker = new google.maps.Marker({
            map: this.map,
            position: this.map.getCenter(),
            icon : 'assets/markers/locationmarker.png'
          });

          let content = "Vous êtes ici";

          this.addInfoWindow1(marker, content);
          this.getevents();


           }
           catch(e){
          // problem connexion internet
            this.connAlert();
           }
       }, 2000);
     }, (err) => {
       console.log(err);
     });

   }

  getevents(){
    let Data={
      operation : "select",
    }
    let conn=new Connexion(this.http,this.storage);
    conn.select('evenement',Data);
    setTimeout(() => {
      var res=conn.result;
      var select_res=conn.select_res;

      if(res==2){
        var D : any;
        D = JSON.parse(select_res);
        let result=JSON.stringify(D);
        this.addMarkers(result);
      }
      else if(res==1){
           // no result
      }
      else{
          // error not connected to server
      }
    }, 2000);

  }



   addMarkers(r: any){
     var Data : any;
     Data = JSON.parse(r);
     for (var i = 0; i < Data.length; i++) {
       var lat=JSON.stringify(Data[i].lat);
       var lng=JSON.stringify(Data[i].lng);
       var titre=JSON.stringify(Data[i].titre);
       var type=JSON.stringify(Data[i].type);
       var prepaye=JSON.stringify(Data[i].prepaye);
       var nb_abonnees=JSON.stringify(Data[i].nb_abonnees);
       var statut=JSON.stringify(Data[i].statut);
       var id=JSON.stringify(Data[i].id);
       var id_client=JSON.stringify(Data[i].id_client);
       var date=JSON.stringify(Data[i].date);
       var autre=JSON.stringify(Data[i].autre);
       var description=JSON.stringify(Data[i].description);
       // get string values
       var stlat=lat.toString().substring(1,(lat.toString().length)-1);
       var stlng=lng.toString().substring(1,(lng.toString().length)-1);
       var sttitre=titre.toString().substring(1,(titre.toString().length)-1);
       var sttype=type.toString().substring(1,(type.toString().length)-1);
       var stprepaye=prepaye.toString().substring(1,(prepaye.toString().length)-1);
       var stnb_abonnees=nb_abonnees.toString().substring(1,(nb_abonnees.toString().length)-1);
       var ststatut=statut.toString().substring(1,(statut.toString().length)-1);
       var stid=id.toString().substring(1,(id.toString().length)-1);
       var stid_client=id_client.toString().substring(1,(id_client.toString().length)-1);
       var stdate=date.toString().substring(1,(date.toString().length)-1);
       var stautre=autre.toString().substring(1,(autre.toString().length)-1);
       var stdescription=description.toString().substring(1,(description.toString().length)-1);
       let passedData={
         id: stid,
         lat : stlat,
         lng: stlng,
         id_client :stid_client,
         titre : sttitre,
         type: sttype,
         description : stdescription,
         autre : stautre,
         prepaye: stprepaye,
         date : stdate,
         nb_abonnees: stnb_abonnees,
         statut : ststatut,
         positionlat :this.map.getCenter().lat(),
         positionlng :this.map.getCenter().lng()
       }

       var icon="";
       var etitle=sttitre;
       switch (sttype) {
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


       let marker = new google.maps.Marker({
         map: this.map,
         position: new google.maps.LatLng(stlat,stlng),
         icon : 'assets/markers/'+icon+'.png'
       });



       if(stprepaye=="1"){
         // evenement avec payement
         if(ststatut=="1"){
           // evenement encore disponible
           let content = "<html><div class='infobox'>"+etitle+"<div class='infodot'></div><br><div class='ppayement'>Prepayé</div>Abonnements : ("+stnb_abonnees+")<br><br><button id='"+stid+"' class='infobtn'>Info</button><button id='"+stid+"directions' class='dirbtn'>Directions</button></div></html>";
           this.addInfoWindow(marker, content, passedData);

         }
         else{
           // evenement expiré
           let content = "<html><div class='infobox'>"+etitle+"<div class='inforeddot'></div><br><div class='ppayement'>Prepayé</div>Abonnements : ("+stnb_abonnees+")<br><br><button id='"+stid+"' class='infobtn' >Info</button><button id='"+stid+"directions' class='dirbtn'>Directions</button></div></html>";
           this.addInfoWindow(marker, content, passedData);
         }
       }
       else{
         // evenement gratuit
          if(ststatut=="1"){
             // evenement encore disponible
         let content = "<html><div class='infobox'>"+etitle+"<div class='infodot'></div><br><div class='payement'>Gratuit</div>Abonnements : ("+stnb_abonnees+")<br><br><button id='"+stid+"' class='infobtn' >Info</button><button id='"+stid+"directions' class='dirbtn'>Directions</button></div></html>";
         this.addInfoWindow(marker, content, passedData);
       }
       else{
         // evenement expiré
         let content = "<html><div class='infobox'>"+etitle+"<div class='inforeddot'></div><br><div class='payement'>Gratuit</div>Abonnements : ("+stnb_abonnees+")<br><br><button id='"+stid+"' class='infobtn' >Info</button><button id='"+stid+"directions' class='dirbtn'>Directions</button></div></html>";
         this.addInfoWindow(marker, content, passedData);
       }
       }




     }


   }




  addInfoWindow(marker, content, passedData){
    let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
  google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
    document.getElementById(passedData.id).addEventListener('click', () => {
            this.info(passedData);
        });
  });
  google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
    document.getElementById(passedData.id+"directions").addEventListener('click', () => {
            this.directions(passedData);
        });
  });
}



addInfoWindow1(marker, content){
  let infoWindow = new google.maps.InfoWindow({
  content: content
});

google.maps.event.addListener(marker, 'click', () => {
  infoWindow.open(this.map, marker);
});

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



getItems(){
  let tx={
    text : this.text
  }
  let modal= this.modalCtrl.create(Search,tx);
    this.text="";
  modal.present();


//this.app.getRootNav().setRoot( Search );
}
createevent(){
  let modal= this.modalCtrl.create(Event);
  modal.present();
//this.app.getRootNav().setRoot( Event );
}
seeprofile(){
  let modal= this.modalCtrl.create(Profile);
  modal.present();
//this.app.getRootNav().setRoot( Profile );
}
refresh(){
this.loadMap();
}
gotoplaces(){
  let modal= this.modalCtrl.create(Places);
  modal.present();
}

info(passedData){
  let modal= this.modalCtrl.create(Eventinfos,passedData);
  modal.present();
  //console.log(passedData);
}
directions(passedData){
  let modal= this.modalCtrl.create(Directions,passedData);
  modal.present();
  //console.log(passedData);
}


}
