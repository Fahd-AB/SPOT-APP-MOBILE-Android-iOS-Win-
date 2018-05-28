import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Signup2 } from '../signup2/signup2';

/**
 * Generated class for the Signup1 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup1',
  templateUrl: 'signup1.html',
})
export class Signup1 {
 email : string;
 tel : string;
 prenom : string;
 nom_famille : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.prenom= this.navParams.get('prenom');
    this.nom_famille= this.navParams.get('nom_famille');
    console.log('ionViewDidLoad Signup1');
  }
  next(){
   if(this.email!=null && this.tel!=null){
     var testemail=this.email.match(/@./) != null;
     if(testemail){
        let Data={
          prenom : this.prenom,
          nom_famille: this.nom_famille,
          email : this.email,
          tel : this.tel
                 }
         this.navCtrl.push(Signup2, Data);
    }
    else{
        this.showerremailAlert() ;
    }
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
    showerremailAlert() {
        let alert = this.alertCtrl.create({
          title: '',
          mode: 'ios',
          subTitle: "L'adresse email introduite est incorrecte !",
          buttons: ['Corriger']
        });
        alert.present();
      }
}
