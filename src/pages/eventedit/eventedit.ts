import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController,ToastController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {Connexion} from '../../classes/connexion';
/**
 * Generated class for the Eventedit page.
 *
 * See http:Element : any;//ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eventedit',
  templateUrl: 'eventedit.html',
})
export class Eventedit {
Evenement : any;
Eventname: string;

Profileid : string;
prepaye:string;
Valider : string= "Valider les changements";
btn_icon : string="ios-checkmark-outline";
titre : string;
type : string="Type de l'événement";
autre : string;
description : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
  public alertCtrl: AlertController, private storage :Storage, public http : Http,
  public toastCtrl: ToastController,public modalCtrl: ModalController) {
      this.Evenement=this.navParams.get('E');
  }

  ionViewDidLoad() {
    this.Eventname=this.Evenement.titre;
    try{
      this.storage.get('Profileid').then((val)=>{
      this.Profileid=val;
      });
    }
    catch(e){
      // error getting value or inexistant
    }
    this.loadevdetails();
    console.log('ionViewDidLoad Eventedit');
  }
  gotomain(){
      this.viewCtrl.dismiss();
  }
  back(){
    this.showConfirm();
  }

  loadevdetails(){
    this.titre=this.Evenement.titre;
    this.autre=this.Evenement.autre;
    this.description=this.Evenement.description;
    this.type=this.Evenement.type;
    this.prepaye=this.Evenement.prepaye;
  }

  update(){

    if(this.titre=="" || this.description=="" || this.titre==null || this.description==null){
      this.showerrAlert();
    }
    else{
       if(this.type=="Type de l'événement" && this.autre=="" || this.type=="Type de l'événement" && this.autre==null){
         this.showerrtypeAlert();
       }
       else{
            // all data is good now make choice prepayed or free
            let Data={
              ev_id: this.Evenement.id,
              ev_titre : this.titre,
              ev_type: this.type,
              ev_autre: this.autre,
              ev_desc: this.description,
              ev_prepaye : this.prepaye
            }

              this.updateandescape(Data);


       }
    }


  }





updateandescape(vals){
  let conn=new Connexion(this.http,this.storage);
  conn.update('event_up_s',vals);
  setTimeout(() => {
    var res=conn.result;
    if(res==2){
      //all done
        this.showcustomToast('Evenement modifié avec succès !');
        this.gotomain();
    }
    else{
        // error not connected to server
        this.showcustomToast('Erreur, Opération annulé !');
    }

  }, 2000);

}



























  showcustomToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: 'bottom'
      });

      toast.present(toast);
    }

  showerrAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        mode: 'ios',
        subTitle: 'Vous devez introduire tout les informations obligatoires !',
        buttons: ['Corriger']
      });
      alert.present();
    }
    showerrtypeAlert() {
        let alert = this.alertCtrl.create({
          title: '',
          mode: 'ios',
          subTitle: "Type de l'évenement indéfini !",
          buttons: ['Corriger']
        });
        alert.present();
      }

   settype(){

     let prompt = this.alertCtrl.create({
     message: 'Quel est le type de votre événement ?',
     mode : 'ios',
     inputs : [
     {
         type:'radio',
         label: "Café",
         value:'Café',
         checked: true
     },
     {
         type:'radio',
         label: "Conférence",
         value:'Conférence'
     },
     {
         type:'radio',
         label: "Soutenance",
         value:'Soutenance'
     },
     {
         type:'radio',
         label: "Théatre",
         value:'Théatre'
     },
     {
         type:'radio',
         label: "Cinéma",
         value:'Cinéma'
     },
     {
         type:'radio',
         label: "Domicile",
         value:'Domicile'
     },
     {
         type:'radio',
         label: "Education",
         value:'Education'
     },
     {
         type:'radio',
         label: "Jeu",
         value:'Jeu'
     },
     {
         type:'radio',
         label: "Bar",
         value:'Bar'
     },
     {
         type:'radio',
         label: "Hotel",
         value:'Hotel'
     },
     {
         type:'radio',
         label: "Sport",
         value:'Sport'
     },
     {
         type:'radio',
         label: "Musical",
         value:'Musical'
     },
     {
         type:'radio',
         label: "Voyage",
         value:'Voyage'
     },
     {
         type:'radio',
         label: "Restaurent",
         value:'Restaurent'
     },
     {
         type:'radio',
         label: "Marriage",
         value:'Marriage'
     },
     {
         type:'radio',
         label: "Fiancaille",
         value:'Fiancaille'
     },
     {
         type:'radio',
         label: "Emploi",
         value:'Emploi'
     },
     {
         type:'radio',
         label: "Mode",
         value:'Mode'
     },
     {
         type:'radio',
         label: "Dance",
         value:'Dance'
     },
     {
         type:'radio',
         label: "Tournage",
         value:'Tournage'
     },
     {
         type:'radio',
         label: "Religion",
         value:'Religion'
     },
     {
         type:'radio',
         label: "Magazinage",
         value:'Magazinage'
     }
     ,
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


  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '',
      message: "Voulez-vous vraiment annuler la modification ?",
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
                this.gotomain();
          }
        }
      ]
    });
    confirm.present();
  }
}
