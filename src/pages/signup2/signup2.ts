import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Signup3 } from '../signup3/signup3';

/**
 * Generated class for the Signup2 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup2',
  templateUrl: 'signup2.html',
})
export class Signup2 {
  email : string;
  tel : string;
  prenom : string;
  nom_famille : string;
  date_naissance : string;
  adresse : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.email= this.navParams.get('email');
    this.tel= this.navParams.get('tel');
    this.prenom= this.navParams.get('prenom');
    this.nom_famille= this.navParams.get('nom_famille');
    console.log('ionViewDidLoad Signup2');
  }
  next(){
    if(this.date_naissance!=null && this.adresse!=null){
    let Data={
      prenom : this.prenom,
      nom_famille: this.nom_famille,
      email : this.email,
      tel : this.tel,
      date_naissance : this.date_naissance,
      adresse : this.adresse
    }
  this.navCtrl.push(Signup3, Data);
}
else{
  this.showerrAlert() ;
}  
  }



  showerrAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: 'Les informations introduites sont erronées !',
        buttons: ['Corriger']
      });
      alert.present();
    }
}
