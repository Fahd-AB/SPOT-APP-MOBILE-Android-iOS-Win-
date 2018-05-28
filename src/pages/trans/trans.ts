import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
/**
 * Generated class for the Trans page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trans',
  templateUrl: 'trans.html',
})
export class Trans {
  @ViewChild('mapdep') mapElement: ElementRef;
  mapdep: any;
  @ViewChild('mapdes') mapElement1: ElementRef;
  mapdes: any;
  type : string="Moyen de transport";
  Profileid : string="";
  RegDep :string="Recherche";
  RegDes:string="Recherche";
  Distance:string="Calcul";
  nb_pers : string;
  tarif:string;
  date_exp: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
   private storage :Storage, public alertCtrl: AlertController, public geolocation: Geolocation,
   public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
     window.localStorage.setItem('MarkerDEPCreated', 'NON');
     window.localStorage.setItem('MarkerDESCreated', 'NON');
  }

  ionViewDidLoad() {
    try{
      this.storage.get('Profileid').then((val)=>{
      this.Profileid=val;
      });
    }
    catch(e){
      // error getting {value or inexistant
    }
    this.initiatemaps();
    console.log('ionViewDidLoad Trans');
  }


  showToast() {
      let toast = this.toastCtrl.create({
        message: 'Offre crée avec succés !',
        duration: 2000,
        position: 'bottom'
      });

      toast.present(toast);
    }
  gotomain(){
    this.viewCtrl.dismiss();
  }
  back(){
    this.viewCtrl.dismiss();
  }

  initiatemaps(){

    // map1 départ

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //set default event position to user current position
      window.localStorage.setItem('PositionDEP_Lat', latLng.lat());
      window.localStorage.setItem('PositionDEP_Lng', latLng.lng());

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.mapdep = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let map1=this.mapdep;
      var marker1;
      google.maps.event.addListener(map1, 'click', function(event) {
           window.localStorage.setItem('MarkerDEPCreated', 'OUI');
           window.localStorage.setItem('PositionDEP_Lat', event.latLng.lat());
           window.localStorage.setItem('PositionDEP_Lng', event.latLng.lng());
           placeMarker(event.latLng,map1,marker1);
        });
    }, (err) => {
      console.log(err);
    });



    setTimeout(() => {
      try{

       let marker = new google.maps.Marker({
         map: this.mapdep,
         position: this.mapdep.getCenter(),
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



// map2 destination
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //set default event position to user current position
      window.localStorage.setItem('PositionDES_Lat', latLng.lat());
      window.localStorage.setItem('PositionDES_Lng', latLng.lng());
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.mapdes = new google.maps.Map(this.mapElement1.nativeElement, mapOptions);
      let map2=this.mapdes;
      var marker2;
      google.maps.event.addListener(map2, 'click', function(event) {
           window.localStorage.setItem('MarkerDESCreated', 'OUI');
           window.localStorage.setItem('PositionDES_Lat', event.latLng.lat());
           window.localStorage.setItem('PositionDES_Lng', event.latLng.lng());
           placeMarker(event.latLng,map2,marker2);
        });
    }, (err) => {
      console.log(err);
    });




    setTimeout(() => {
      try{

       let marker = new google.maps.Marker({
         map: this.mapdes,
         position: this.mapdes.getCenter(),
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



// place marker
    function placeMarker(location,map,marker) {

       if (marker == undefined){
        marker = new google.maps.Marker({
            position: location,
            draggable: true,
            icon : 'assets/markers/medical.png',
            map: map
        });
        let content = "Position Choisie";
        let infoWindow = new google.maps.InfoWindow({
        content: content
        });
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker);
        });
      }
      else{
         marker.setPosition(location);
      }
        //marker.setPosition( location );
        map.panTo( location);
     //  console.log(window.localStorage.getItem('lat'));

    }



  }



  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
    content: content
  });
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.mapdep, marker);
  });
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.mapdes, marker);
  });

  }

  presentLoading() {
     let loader = this.loadingCtrl.create({
       content: "Please wait...",
       spinner: 'ios',
       duration: 2500
     });
     loader.present();
   }


create(){


  var pos_dep=window.localStorage.getItem('MarkerDEPCreated');
  var pos_des=window.localStorage.getItem('MarkerDESCreated');

  if(this.type=="Moyen de transport" || this.type==null || this.type==""){
    this.showerrAlert('Vous devez choisir un moyen de transport !');
  }
  else if(this.tarif==""|| this.nb_pers==""|| this.date_exp==""|| this.date_exp=="0" || this.tarif==null|| this.nb_pers==null|| this.date_exp==null){
      this.showerrAlert('Tous les champs sont obligatoires !');
  }
  else if(pos_dep!="OUI" && pos_des!="OUI"){
        this.showerrAlert('Les positions doivent etres différents !');
  }
  else{
    this.presentLoading();
    var lat_dep=window.localStorage.getItem('PositionDEP_Lat');
    var lng_dep=window.localStorage.getItem('PositionDEP_Lng');
    var lat_des=window.localStorage.getItem('PositionDES_Lat');
    var lng_des=window.localStorage.getItem('PositionDES_Lng');
     var DESTLatlng = new google.maps.LatLng(lat_des, lng_des);
     this.extraire_region(DESTLatlng);
     this.extract_dist(lat_dep,lng_dep,lat_des,lng_des);
     setTimeout(() => {
         // remplir la distance dans l'interface
        var milage=window.localStorage.getItem('Distance_km');
        var RegD=window.localStorage.getItem('RegDes');
        //console.log(milage,RegD);
        var data={
          type: this.type,
          date_ex: this.date_exp,
          lat_dep: lat_dep,
          lng_dep: lng_dep,
          lat_des: lat_des,
          lng_des: lng_des,
          milage: milage,
          RegD: RegD
        }
        this.create_offer(data);
      }, 1500);
  }


}


create_offer(data){
  console.log(data);
  var id= this.Profileid;
  var x = (new Date()).getTimezoneOffset() * 60000;
  var today= (new Date(Date.now() - x)).toISOString();
  var d1 = new Date (), date_ex = new Date ( d1 );
  date_ex.setMinutes ( d1.getMinutes() + parseInt(data.date_ex));
  var exp_date=date_ex.toISOString();
  
}


extract_dist(lat_dep,lng_dep,lat_des,lng_des){
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsService.route({
    origin: new google.maps.LatLng(lat_dep,lng_dep),
    destination: new google.maps.LatLng(lat_des,lng_des),
    travelMode: 'WALKING',
    optimizeWaypoints: true,
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      for (var i = 0; i < route.legs.length; i++) {
       window.localStorage.setItem('Distance_km',route.legs[i].distance.text);
      // console.log(route.legs[i].distance.text) ;
      }
    } else {
      //window.alert('Directions request failed due to ' + status);
      console.log('Directions request failed');
    }
  });
  directionsDisplay.setOptions( { suppressMarkers: true } );

}



showerrAlert(msg) {
    let alert = this.alertCtrl.create({
      title: '',
      mode: 'ios',
      subTitle: msg,
      buttons: ['Ok']
    });
    alert.present();
  }


   extraire_region(latLng){
      var city;
      var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'latLng': latLng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                    break;
                }
            }
        }
              //console.log(city.short_name);
              window.localStorage.setItem('RegDes',city.short_name);
              //this.RegDep=cityname;

        } else {
         // alert("No results found");
        }
      } else {
        //alert("Geocoder failed due to: " + status);
      }

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


  settype(){

    let prompt = this.alertCtrl.create({
    message: 'Quel est votre moyen de transport ?',
    mode : 'ios',
    inputs : [
    {
        type:'radio',
        label: "Taxi",
        value:'Taxi',
        checked: true
    },
    {
        type:'radio',
        label: "Bus",
        value:'Bus'
    },
    {
        type:'radio',
        label: "Train",
        value:'Train'
    },
    {
        type:'radio',
        label: "Metro",
        value:'Metro'
    },
    {
        type:'radio',
        label: "Voiture",
        value:'Voiture'
    },
    {
        type:'radio',
        label: "Avion",
        value:'Avion'
    },
    {
        type:'radio',
        label: "Moto",
        value:'Moto'
    },
    {
        type:'radio',
        label: "Bateau",
        value:'Bateau'
    },
    {
        type:'radio',
        label: "Autre",
        value:'Autre'
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
         this.type=data;
        }
    }]});
    prompt.present();

  }


}
