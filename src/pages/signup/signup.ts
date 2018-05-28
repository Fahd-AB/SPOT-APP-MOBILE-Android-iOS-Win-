import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Signup1 } from '../signup1/signup1';
import { Login } from '../login/login';
/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
 prenom : string;
 nom_famille : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }
  next(){
    if(this.prenom!=null && this.nom_famille!=null){
    let Data={
      prenom : this.prenom,
      nom_famille: this.nom_famille
    }
     this.navCtrl.push(Signup1, Data);
    }
    else{
      this.showerrAlert() ;
    }
  }
  back(){
  this.showConfirm();
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '',
      message: "Voulez-vous vraiment annuler l'inscription ?",
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
              this.navCtrl.push(Login);
          }
        }
      ]
    });
    confirm.present();
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
