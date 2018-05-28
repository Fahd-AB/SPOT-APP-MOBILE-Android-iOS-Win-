import { Component ,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController, AlertController, ModalController} from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Transport } from '../transport/transport';
declare var google;
/**
 * Generated class for the Directions page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html',
})
export class Directions {
  @ViewChild('map2') mapElement: ElementRef;
  map2: any;
  Data : any;
  dmilage : string='Calcul...';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
     public geolocation: Geolocation,public alertCtrl: AlertController,public http : Http,
      public modalCtrl: ModalController) {
      this.Data={
        lat : this.navParams.get('lat'),
        lng: this.navParams.get('lng'),
        titre : this.navParams.get('titre'),
        type: this.navParams.get('type'),
        statut : this.navParams.get('statut'),
        prepaye : this.navParams.get('prepaye'),
      }


  }

  ionViewDidLoad() {
    window.localStorage.setItem('destlat',this.Data.lat);
    window.localStorage.setItem('destlng',this.Data.lng);
    this.loadMap();
    console.log('ionViewDidLoad Directions');
  }

  loadMap(){
     window.localStorage.setItem('milage','');
     this.geolocation.getCurrentPosition().then((position) => {

       let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

       let mapOptions = {
         center: latLng,
         zoom: 16,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }

       this.map2 = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

       setTimeout(() => {
         try{

          let marker = new google.maps.Marker({
            map: this.map2,
            position: this.map2.getCenter(),
            icon : 'assets/markers/locationmarker.png'
          });

          let content = "Vous êtes ici";

          this.addInfoWindow(marker, content);


           }
           catch(e){
          // problem connexion internet
            this.connAlert();
           }

           var icon="";
           var etitle=this.Data.titre;
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


              let marker = new google.maps.Marker({
                map: this.map2,
                position: new google.maps.LatLng(this.Data.lat,this.Data.lng),
                icon : 'assets/markers/'+icon+'.png'
              });

              if(this.Data.prepaye=="1"){
                // evenement avec payement
                if(this.Data.statut=="1"){
                  // evenement encore disponible
                  let content = "<html><div class='infobox'>"+etitle+"<div class='infodot'></div><br><div class='ppayement'>Prepayé</div></div></html>";
                  this.addInfoWindow(marker, content);

                }
                else{
                  // evenement expiré
                  let content = "<html><div class='infobox'>"+etitle+"<div class='inforeddot'></div><br><div class='ppayement'>Prepayé</div></div></html>";
                  this.addInfoWindow(marker, content);
                }
              }
              else{
                // evenement gratuit
                 if(this.Data.statut=="1"){
                    // evenement encore disponible
                let content = "<html><div class='infobox'>"+etitle+"<div class='infodot'></div><br><div class='payement'>Gratuit</div></div></html>";
                this.addInfoWindow(marker, content);
              }
              else{
                // evenement expiré
                let content = "<html><div class='infobox'>"+etitle+"<div class='inforeddot'></div><br><div class='payement'>Gratuit</div></div></html>";
                this.addInfoWindow(marker, content);
              }
              }

              var directionsService = new google.maps.DirectionsService;
              var directionsDisplay = new google.maps.DirectionsRenderer;
               directionsDisplay.setMap(this.map2);

               if (navigator.geolocation) {
                     navigator.geolocation.getCurrentPosition(function(position) {
                     var pos = {
                       lat: position.coords.latitude,
                       lng: position.coords.longitude
                     };

                     var destLat=window.localStorage.getItem('destlat');
                     var destLng=window.localStorage.getItem('destlng');
                     //make waypoint

                     directionsService.route({
                       origin: new google.maps.LatLng(pos.lat,pos.lng),
                       destination: new google.maps.LatLng(destLat,destLng),
                       travelMode: 'WALKING',
                       optimizeWaypoints: true,
                     }, function(response, status) {
                       if (status === 'OK') {
                         directionsDisplay.setDirections(response);
                         var route = response.routes[0];
                         for (var i = 0; i < route.legs.length; i++) {
                          window.localStorage.setItem('milage',route.legs[i].distance.text);
                          //console.log(route.legs[i].distance.text) ;
                         }
                       } else {
                         //window.alert('Directions request failed due to ' + status);
                         console.log('Directions request failed');
                       }
                     });
                     directionsDisplay.setOptions( { suppressMarkers: true } );






                     }, function() {
                     // location error
                     });
                   } else {
                     // Browser doesn't support Geolocation

                   }



        setTimeout(() => {
            // remplir la distance dans l'interface
           var milage=window.localStorage.getItem('milage');
           this.dmilage=milage;
           var destLat=window.localStorage.getItem('destlat');
           var destLng=window.localStorage.getItem('destlng');
           this.codeLatLng(destLat,destLng);
         }, 1500);
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
     infoWindow.open(this.map2, marker);
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
   gotomain(){
     this.viewCtrl.dismiss();
   //this.app.getRootNav().setRoot( Tabs );
   }
   transport(){
     var val=window.localStorage.getItem('TR');
     this.viewCtrl.dismiss();
     let modal= this.modalCtrl.create(Transport,{'TRegion':val});
     modal.present();
     window.localStorage.removeItem('TR');
   }

   codeLatLng(lat, lng) {
     var geocoder;
     var city;
     geocoder = new google.maps.Geocoder();
     var latlng = new google.maps.LatLng(lat, lng);
     geocoder.geocode({'latLng': latlng}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         if (results[1]) {
              for (var i=0; i<results[0].address_components.length; i++) {
             for (var b=0;b<results[0].address_components[i].types.length;b++) {
             //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                 if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                     //this is the object you are looking for
                     city= results[0].address_components[i];
                     break;
                 }
             }
         }
         //city data
         window.localStorage.setItem('TR',city.short_name);
         } else {
          // alert("No results found");
         }
       } else {
         //alert("Geocoder failed due to: " + status);
       }
     });
   }







}
