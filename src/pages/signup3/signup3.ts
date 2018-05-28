import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Connexion } from '../../classes/connexion';
import { Client } from '../../classes/client';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the Signup3 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup3',
  templateUrl: 'signup3.html',
})
export class Signup3 {
  email : string;
  tel : string;
  prenom : string;
  nom_famille : string;
  date_naissance : string;
  adresse : string;
  password : string;
  cpassword : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
     public http : Http, public loadingCtrl: LoadingController,private storage:Storage) {

  }

  ionViewDidLoad() {
    this.email= this.navParams.get('email');
    this.tel= this.navParams.get('tel');
    this.prenom= this.navParams.get('prenom');
    this.nom_famille= this.navParams.get('nom_famille');
    this.date_naissance= this.navParams.get('date_naissance');
    this.adresse= this.navParams.get('adresse');
    console.log('ionViewDidLoad Signup3');
  }
  showAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: 'Votre compte a été crée avec succès.',
        buttons: ['OK']
      });
      alert.present();
    }
  finish(){
    if(this.password==this.cpassword){
    this.createclient();
    this.presentLoading();

  //console.log(Data);

  }
  else{
    // password dont match
    this.showerrAlert() ;
  }
  }
  showerrAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: 'Les mot de passe ne sont pas conformes !',
        buttons: ['Corriger']
      });
      alert.present();
    }
    showerrcreateAlert() {
        let alert = this.alertCtrl.create({
          title: '',
          mode: 'ios',
          subTitle: "Un problème est survenu, Le compte n'est pas crée !",
          buttons: ['Ok']
        });
        alert.present();
      }
      presentLoading() {
         let loader = this.loadingCtrl.create({
           content: "Please wait...",
           spinner: 'ios',
           duration: 4000
         });
         loader.present();
       }
  createclient(){
    let client=new Client(this.prenom,this.nom_famille,this.email,this.tel,this.date_naissance,this.adresse,this.password,0,0);
    let Data={
      prenom : client.getPrenom(),
      nom_famille: client.getNom_famille(),
      email : client.getEmail(),
      tel : client.getTel(),
      date_naissance : client.getDate_naissance(),
      adresse : client.getAdresse(),
      password : client.getMot_de_passe()
    }

    let conn=new Connexion(this.http,this.storage);
    conn.insert('client',Data);
    setTimeout(() => {
      var res=conn.result;
      //console.log(res);
      if(res==2){
        this.showAlert();
        this.navCtrl.push(Login);
      }
      else{
          this.showerrcreateAlert();
      }
    }, 4100);


    }


}
