import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import {Connexion} from '../../classes/connexion';
/**
 * Generated class for the Notifications page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class Notifications {
  Profileid : string="";
  url:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
   private storage :Storage,public http : Http,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notifications');
   //this.presentmedLoading();
  this.loadprofileinfos();
  }
  gotomain(){
    this.viewCtrl.dismiss();
  }




  loadprofileinfos(){
    try{
      this.storage.get('url').then((val)=>{
      this.url=val;
      });
      this.storage.get('Profileid').then((val)=>{
      this.Profileid=val;
        this.loadnotifications(val);
      });
    }catch(e){
     // error getting value or inexistant
     console.log("error getting profile");
    }
  }




  loadnotifications(id){
    let Data={
      client_id : this.Profileid,
    }
    let conn=new Connexion(this.http,this.storage);
    conn.select('notifs',Data);
    setTimeout(() => {
      var res=conn.result;
      if(res==2){
        let json=JSON.parse(conn.select_res);
        this.displayresults(json);
      }
      else{
          $('#customloader').html('');
          $('#container').html('<div class="normaltextcenter">Aucune notification</div>');
      }
    }, 3000);
  }

  displayresults(json){
      $('#customloader').html('');
    if(json.length==0){
      $('#container').html('<div class="normaltextcenter">Aucune notification</div>');
    }
    else{
      var cont="<table>";
      for (var i = json.length-1; i >=0; i--) {
      var timesinse=(new Date()).valueOf() - (new Date(json[i].date)).valueOf();


      if(json[i].type=="EVE"){
       // une notification sur un événement violet
            cont+="<tr> <td><img src='assets/img/not5.png'></td><td><table><tr><td class='greytime'>"+this.msToTime(timesinse)+"</td></tr><tr><td class='clname'>"+json[i].prenom+" "+json[i].nom_famille+" <div class='notiftext'>"+json[i].texte+"</div></td></tr></table></td></tr>";
      }
      else if(json[i].type=="PUB"){
        // une notification sur une publication gris
          cont+="<tr> <td><img src='assets/img/not1.png'></td><td><table><tr><td class='greytime'>"+this.msToTime(timesinse)+"</td></tr><tr><td class='clname'>"+json[i].prenom+" "+json[i].nom_famille+" <div class='notiftext'>"+json[i].texte+"</div></td></tr></table></td></tr>";
      }
      else if(json[i].type=="INV"){
        // une invitation bleu
        cont+="<tr> <td><img src='assets/img/not2.png'></td><td><table><tr><td class='greytime'>"+this.msToTime(timesinse)+"</td></tr><tr><td class='clname'>"+json[i].prenom+" "+json[i].nom_famille+" <div class='notiftext'>"+json[i].texte+"</div></td></tr></table></td></tr>";
      }
      else if(json[i].type=="PAY"){
        // signal d'un payement vert
          cont+="<tr> <td><img src='assets/img/not4.png'></td><td><table><tr><td class='greytime'>"+this.msToTime(timesinse)+"</td></tr><tr><td class='clname'>"+json[i].prenom+" "+json[i].nom_famille+" <div class='notiftext'>"+json[i].texte+"</div></td></tr></table></td></tr>";
      }


      }
        cont+="</table>";
      $('#container').html(cont);
    }
  }
  /*
  changeColor(){
  $('#x').html('<div style="color:green;">new content</div>');
  }
  */



  presentmedLoading() {
     let loader = this.loadingCtrl.create({
       content: "Please wait...",
       spinner: 'ios',
       duration: 3500
     });
     loader.present();
   }

   msToTime(s) : string{
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if(hrs==0 && mins==0)
        return "à l'instant";
    else if(hrs==0)
        return 'il y a '+mins+' mins';
    else if(hrs<24)
        return 'il y a '+hrs+' hrs';
    else
        return 'il y a '+Math.floor(hrs/24)+' jrs';
  }

}
