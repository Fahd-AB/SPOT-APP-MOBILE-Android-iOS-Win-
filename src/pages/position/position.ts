import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController,AlertController,ToastController,LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Connexion } from '../../classes/connexion';
import { Evenement } from '../../classes/evenement';
import { Pos } from '../../classes/position';
import { Payement } from '../../classes/payement';
declare var google;
/**
 * Generated class for the Position page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-position',
  templateUrl: 'position.html',
})

export class Position {
  @ViewChild('map1') mapElement: ElementRef;
  map: any;
  public  lat: any;
  public  lng : any;
  public  MarkerCreated : string;
  inputs:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
     public modalCtrl: ModalController, public geolocation: Geolocation,public alertCtrl: AlertController,
     public toastCtrl: ToastController, public http : Http, public loadingCtrl: LoadingController,
     private storage:Storage) {
       this.MarkerCreated="NON";

  }

  ionViewDidLoad() {
    this.loadMap();
    this.loadlocations();
    this.MarkerCreated="NON";
    console.log('ionViewDidLoad Position');
  }
  next(){
    var markercreation=window.localStorage.getItem('MarkerCreated');
    if(markercreation=="OUI"){
      // tout va bien position fixed

      let Data={
        client_id :this.navParams.get('client_id'),
        lat:window.localStorage.getItem('lat'),
        lng:window.localStorage.getItem('lng'),
        titre :this.navParams.get('titre'),
        type: this.navParams.get('type'),
        autre: this.navParams.get('autre'),
        description: this.navParams.get('description'),
        prepaye : this.navParams.get('prepaye')
      };
      window.localStorage.setItem('MarkerCreated', 'NON');
      window.localStorage.setItem('lat', '');
      window.localStorage.setItem('lng', '');


      // send data to server
      let P=new Pos(Data.lat,Data.lng);
      var date: string = new Date().toISOString();
      let Ev=new Evenement(Data.titre,Data.type,Data.autre,Data.description,Data.prepaye,date,P);
      var id_e = (Math.floor(100000 + Math.random() * 900000)).toString();
      Ev.setId(parseInt(id_e));

        let conn=new Connexion(this.http,this.storage);

      if(Ev.getPrepaye().toString()=="true"){
        //console.log("true section");
        let Pay=new Payement(Ev.getId(),this.navParams.get('montant'),this.navParams.get('methode'),this.navParams.get('email'),this.navParams.get('page_url'));
        Ev.setPayement(Pay);
        let EData={
          id: Ev.getId().toString(),
          client_id : Data.client_id,
          titre : Ev.getTitre(),
          type: Ev.getType(),
          autre : Ev.getAutre(),
          description : Ev.getDescription(),
          prepaye : Ev.getPrepaye(),
          cdate : Ev.getDate(),
          lat : Ev.getPosition().getLat(),
          lng : Ev.getPosition().getLng(),
          montant: Ev.getPayement().getMontant(),
          methode :  Ev.getPayement().getMethode(),
          email: Ev.getPayement().getEmail(),
          page_url : Ev.getPayement().getPage_url()
        }
        // create a loading
          this.presentLoading();
        conn.insert('event',EData);
      }
      else{
      //  console.log("else section");
        let EData={
          id: Ev.getId().toString(),
          client_id : Data.client_id,
          titre : Ev.getTitre(),
          type: Ev.getType(),
          autre : Ev.getAutre(),
          description : Ev.getDescription(),
          prepaye : Ev.getPrepaye(),
          cdate : Ev.getDate(),
          lat : Ev.getPosition().getLat(),
          lng : Ev.getPosition().getLng(),
          montant: "",
          methode :  "",
          email: "",
          page_url : ""
        }
        // create a loading
          this.presentLoading();
        conn.insert('event',EData);
      }





      setTimeout(() => {
        var res=conn.result;
        //console.log(res);
        if(res==2){
          this.showToast();
          this.annuler();  // fermer la page si tout est bien
        }
        else{
            this.showerrcreateAlert();
        }
      }, 4100);
      //this.showToast();


    }
    else{
      // default position is your current location
      this.showConfirm();
    }

  }





loadlocations(){
  let Data={
    operation : "select",
  }
  let conn=new Connexion(this.http,this.storage);
  conn.select('places',Data);
  setTimeout(() => {
    var res=conn.result;
    var select_res=conn.select_res;
    if(res==2){
       var json = JSON.parse(select_res);
       this.displaylocations(json);
    }
    else{
        // error not connected to server
    }
  }, 2000);
}



displaylocations(json){
  this.inputs=[];
  for(var i=0; i<json.length; i++){
    var check=false;
    if(i==0){
      check=true;
    }
    var e=
      {
          type:'radio',
          label: json[i].nom+"("+json[i].type+")",
          value:  new Pos(json[i].lat,json[i].lng),
          checked: check
      }
      this.inputs.push(e);
  }


}


afficher_lieux(){
  if(this.inputs!=null){

     let prompt = this.alertCtrl.create({
      message: "Quel est le lieu dans lequel vous planifier l'organisation de votre événement ?",
      mode : 'ios',
      inputs : this.inputs,
      buttons : [
      {
          text: "Annuler",
          handler: data => {
          console.log("cancel clicked");
          }
      },
      {
          text: "Fixer",
          handler: data => {
          console.log("validate clicked");
          window.localStorage.setItem('lat',data.getLat());
          window.localStorage.setItem('lng', data.getLng());
          window.localStorage.setItem('MarkerCreated', 'OUI');
          this.next();

          }
      }]});

      prompt.present();
  }
  else{
    this.errlocAlert();
  }

}

errlocAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      mode: 'ios',
      subTitle: "Pas des lieux popuaires pour le moment.",
      buttons: ['OK']
    });
    alert.present();
  }




  annuler(){
    this.viewCtrl.dismiss();
  }
  showerrcreateAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: "Un problème est survenu, L'événement n'est pas crée !",
        buttons: ['Ok']
      });
      alert.present();
    }

  showToast() {
      let toast = this.toastCtrl.create({
        message: 'Evenement crée avec succès !',
        duration: 2000,
        position: 'bottom'
      });

      toast.present(toast);
    }

    presentLoading() {
       let loader = this.loadingCtrl.create({
         content: "Please wait...",
         spinner: 'ios',
         duration: 4000
       });
       loader.present();
     }
    showConfirm() {
      let confirm = this.alertCtrl.create({
        title: '',
        message: "Votre position actuelle sera adopté !",
        mode: 'ios',
        buttons: [
          {
            text: "Retour",
            handler: () => {
              //console.log('Disagree clicked');

            }
          },
          {
            text: 'Ok',
            handler: () => {
              //console.log('Agree clicked');
                window.localStorage.setItem('MarkerCreated', 'OUI');
              this.next();

            }
          }
        ]
      });
      confirm.present();
    }


    showcancelConfirm() {
      let confirm = this.alertCtrl.create({
        title: '',
        message: "Voulez-vous vraiment annuler la création de l'évenement ?",
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
                  this.annuler();
            }
          }
        ]
      });
      confirm.present();
    }







  loadMap(){
     var marker;
     this.geolocation.getCurrentPosition().then((position) => {

       let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       //set default event position to user current position
       window.localStorage.setItem('lat', position.coords.latitude.toString());
       window.localStorage.setItem('lng', position.coords.longitude.toString());

       let mapOptions = {
         center: latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }

       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
       let lmap=this.map;
       google.maps.event.addListener(lmap, 'click', function(event) {
            placeMarker(event.latLng);
          window.localStorage.setItem('lat', event.latLng.lat());
          window.localStorage.setItem('lng', event.latLng.lng());
         });

         function placeMarker(location) {
            window.localStorage.setItem('MarkerCreated', 'OUI');
            if (marker == undefined){
             marker = new google.maps.Marker({
                 position: location,
                 draggable: true,
                 icon : 'assets/markers/medical.png',
                 map: lmap
             });
             let content = "Position Choisie";
             let infoWindow = new google.maps.InfoWindow({
             content: content
             });
             google.maps.event.addListener(marker, 'click', () => {
               infoWindow.open(lmap, marker);
             });
           }
           else{
              marker.setPosition(location);
           }
             //marker.setPosition( location );
             lmap.panTo( location);
          //  console.log(window.localStorage.getItem('lat'));
         }
       setTimeout(() => {
         try{

          let marker = new google.maps.Marker({
            map: this.map,
            position: this.map.getCenter(),
            icon : 'assets/markers/locationmarker.png'
          });

          let content = "Vous êtes ici";

          this.addInfoWindow(marker, content);
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
   addInfoWindow(marker, content){
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

}
