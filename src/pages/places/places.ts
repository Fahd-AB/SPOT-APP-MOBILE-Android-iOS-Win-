import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController,AlertController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import {Connexion} from '../../classes/connexion';
import { Pdirections } from '../pdirections/pdirections';
import { Reviews } from '../reviews/reviews';
//import * as $ from 'jquery';
/**
 * Generated class for the Places page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class Places {
  url:string="";
  cards: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private storage :Storage,public toastCtrl: ToastController, public http : Http,
     public loadingCtrl: LoadingController,public alertCtrl: AlertController,  public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Places');
    try{
      this.storage.get('url').then((val)=>{
      this.url=val;
      this.listplaces();
      });
    }catch(e){
     // error getting value or inexistant
    }

  }
  gotomain(){
    this.viewCtrl.dismiss();
  }
  showToast() {
      let toast = this.toastCtrl.create({
        message: 'Avis ajouté avec succés !',
        duration: 2000,
        position: 'bottom'
      });

      toast.present(toast);
    }
    presentmedLoading() {
       let loader = this.loadingCtrl.create({
         content: "Please wait...",
         spinner: 'ios',
         duration: 2000
       });
       loader.present();
     }
  listplaces(){
    // lunch loading
    this.presentmedLoading();
    let Data={
      operation : "select",
    }
    let conn=new Connexion(this.http,this.storage);
    conn.select('places',Data);
    setTimeout(() => {
      var res=conn.result;
      var select_res=conn.select_res;

      if(res==2){
        this.cards=[];
        var D : any;
        D = JSON.parse(select_res);
        let result=JSON.stringify(D);
        let Data :any = JSON.parse(result);
        for (var i = 0; i < Data.length; i++) {
          var id=JSON.stringify(Data[i].id);
          var nom=JSON.stringify(Data[i].nom);
          var type=JSON.stringify(Data[i].type);
          var description=JSON.stringify(Data[i].description);
          var photo=JSON.stringify(Data[i].photo);
          var region=JSON.stringify(Data[i].region);
          var lat=JSON.stringify(Data[i].lat);
          var lng=JSON.stringify(Data[i].lng);
          // convert data to stringify
          var stid=id.toString().substring(1,(id.toString().length)-1);
          var stnom=nom.toString().substring(1,(nom.toString().length)-1);
          var sttype=type.toString().substring(1,(type.toString().length)-1);
          var stdescription=description.toString().substring(1,(description.toString().length)-1);
          var stphoto=photo.toString().substring(1,(photo.toString().length)-1);
          var stregion=region.toString().substring(1,(region.toString().length)-1);
          var stlat=lat.toString().substring(1,(lat.toString().length)-1);
          var stlng=lng.toString().substring(1,(lng.toString().length)-1);
          var RowData=[];
          RowData.push([stid]);
          RowData.push([stnom]);
          RowData.push([sttype]);
          var logo="";
          switch (sttype) {
             case "Café / Salon de thé":
             logo="ios-cafe-outline";
             break;
             case "Sportif":
             logo="ios-trophy-outline";
             break;
             case "Bar":
             logo="ios-beer-outline";
             break;
             case "Galerie":
             logo="ios-camera-outline";
             break;
             case "Musical":
             logo="ios-musical-notes-outline";
             break;
             case "Fast Food":
             logo="ios-pizza-outline";
             break;
             case "Emploi":
             logo="ios-briefcase-outline";
             break;
             case "Vente":
             logo="ios-cart-outline";
             break;
             case "Salle de conférence":
             logo="ios-chatbubbles-outline";
             break;
             case "Salle de cinéma":
             logo="ios-film-outline";
             break;
             case "Laboratoire":
             logo="ios-flask-outline";
             break;
             case "Salle de jeu":
             logo="ios-game-controller-b-outline";
             break;
             case "Lieu romantique":
             logo="ios-heart-outline";
             break;
             case "Maison":
             logo="ios-home-outline";
             break;
             case "Airoport":
             logo="ios-plane-outline";
             break;
             case "Restaurent":
             logo="ios-restaurant-outline";
             break;
             case "Faculté":
             logo="ios-school-outline";
             break;
             case "Autre":
             logo="ios-star-outline";
             break;
           }


          RowData.push([stdescription]);

          if(stphoto=="" || stphoto==null ){
              RowData.push(["assets/img/whiteline.png"]);
          }
          else{
              RowData.push([this.url+"/img/"+stphoto+".png"]);
          }
          RowData.push([stregion]);
          RowData.push([logo]);
          RowData.push([stlat]);
          RowData.push([stlng]);

           this.cards.push([RowData]);
        }
      //console.log(this.cards);

      }
      else if(res==1){
           // no result
      }
      else{
          // error not connected to server
      }
    }, 2000);



  }

  opendirections(id,lat,lng,nom,type){
    let passedData={
      id : id,
      lat : lat,
      lng :lng,
      nom: nom,
      type: type
    }
    this.viewCtrl.dismiss();
    let modal= this.modalCtrl.create(Pdirections,passedData);
    modal.present();
    //console.log(id,lat,lng);
  }




  openavi(id,nom,type){
    let passedData={
      id : id,
      nom: nom,
      type: type
    }
    this.viewCtrl.dismiss();
    let modal= this.modalCtrl.create(Reviews,passedData);
    modal.present();

  }

}
