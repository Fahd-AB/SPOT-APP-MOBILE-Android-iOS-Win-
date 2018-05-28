import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Tabs } from '../tabs/tabs';
import { Signup } from '../signup/signup';
import { Plost } from '../plost/plost';
import { AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from 'ionic-native';
import { Http } from '@angular/http';
import { Connexion } from '../../classes/connexion';
import { JsonParse } from '../../classes/jsonparse';
import { Client } from '../../classes/client';
import { LocalStorage } from '../../classes/localstorage';
import { Platform } from 'ionic-angular';
import { NetworkInterface } from '@ionic-native/network-interface';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
linput : string;
pinput : string;
Resp : any;
platform:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
    private storage :Storage, private app: App, public http : Http,public alertCtrl: AlertController,
    public plt: Platform,private networkInterface: NetworkInterface,public geolocation: Geolocation) {
    StatusBar.show();
  }

  ionViewDidLoad() {
    if (this.plt.is('ios')) {
        this.platform="iOS";
    }
    if (this.plt.is('android')) {
          this.platform="Android";
    }
    if (this.plt.is('windows')) {
          this.platform="Windows Phone";
    }

    console.log('ionViewDidLoad Login');
    StatusBar.show();
  }
  presentLoading() {
     let loader = this.loadingCtrl.create({
       content: "Please wait...",
       spinner: 'ios',
       duration: 2000
     });
     loader.present();
   }


  signinm(){
  //this.storage.set('v',this.pinput);
  //this.storage.get('v').then((val)=>{alert(val)});
    if(this.linput!=null && this.pinput!=null){
      this.verifierloginmdp();
    }
    else{
    this.showerrmdpAlert();
    }
  }

  signupm(){
  this.navCtrl.push(Signup);
  }

  lostm(){
  this.navCtrl.push(Plost);
  }

verifierloginmdp(){
  this.presentLoading();
  let Data={
    login : this.linput,
    password : this.pinput
  }

  let conn=new Connexion(this.http,this.storage);
  conn.select('client_verify',Data);
  setTimeout(() => {
    var res=conn.result;
    var select_res=conn.select_res;
    //console.log(res);
    if(res==2){

       this.presentLoading();
       let c:Client;
       let jp=new JsonParse();
       c=jp.JsonToClient(select_res);
       let ls=new LocalStorage(this.storage);
       ls.storeClient(c);
       this.changeregion(c.id);
       this.insert_history(c.id);
       this.app.getRootNav().setRoot(Tabs);
    }
    else if(res==1){
         this.showerrmdpAlert();
    }
    else{
        this.showerrAlert();
    }
  }, 2000);

}


changeregion(id){
  var city;
  let conn=new Connexion(this.http,this.storage);
  var geocoder = new google.maps.Geocoder();
  this.geolocation.getCurrentPosition().then((position) => {
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
    //city data
    //console.log(city.short_name);
    var cityname="";
    if(city.short_name=="Tunis"){
      cityname=city.short_name+" ";
    }
    else{
      cityname=city.short_name;
    }
                        let Data={
                          client_id : id,
                      		region : cityname,
                          status: "1"
                        }
                        conn.update('up_stat_region',Data);
                        setTimeout(() => {
                          var res=conn.result;
                          if(res==2){
                             console.log('sucess');
                          }
                          else{
                                console.log('error updating stat_reg');
                          }
                        }, 500);
    } else {
     // alert("No results found");
    }
  } else {
    //alert("Geocoder failed due to: " + status);
  }
});
  }, (err) => {
    console.log(err);
  });

}


/*
changestat(id,reg){
  let Data={
    client_id : id,
		region : reg,
    status: "1"
  }
  let conn=new Connexion(this.http,this.storage);
  conn.update('up_stat_region',Data);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
       console.log('sucess');
    }
    else{
          console.log('error updating stat_reg');
    }
  }, 500);
}

*/





insert_history(id){
  /*
  networkinterface.getIPAddress(function (ip) {
    alert(ip);
  });
  */

  var ip="unknown";
  var x = (new Date()).getTimezoneOffset() * 60000;
  var today = (new Date(Date.now() - x)).toISOString();
  let Data={
    client_id : id,
    device: this.platform,
    ip: ip,
    date :today,
    status: "1"
  }
  let conn=new Connexion(this.http,this.storage);
  conn.insert('historique_login',Data);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
       console.log('sucess');
       //this.app.getRootNav().setRoot(Tabs);
    }
    else{
          console.log('error inserting history');
    }
  }, 500);
}

  showerrmdpAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: "Login ou mot de passe incorrecte !",
        buttons: ['Ok']
      });
      alert.present();
    }
    showerrAlert() {
        let alert = this.alertCtrl.create({
          title: '',
          mode: 'ios',
          subTitle: "Un problème est survenu, vérifier votre connexion internet !",
          buttons: ['Ok']
        });
        alert.present();
      }

}
