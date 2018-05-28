import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Connexion } from '../../classes/connexion';
import * as $ from 'jquery';
import { Profileinfo } from '../profileinfo/profileinfo';
import { Eventinfos } from '../eventinfos/eventinfos';
import { Profile } from '../profile/profile';



/**
 * Generated class for the Search page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class Search {
   text: string;
   cards: any;
   clcards: any;
   url:string="";
   myid:string;
   Events: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App,
     public viewCtrl: ViewController,private storage :Storage, public http : Http,
    public modalCtrl: ModalController) {
       try{
         this.storage.get('Profileid').then((val)=>{
         this.myid=val;
         });
         this.storage.get('url').then((val)=>{
         this.url=val;
         var tx= this.navParams.get('text');
         if(tx!="" || tx!=" " || tx!=null){
           this.text=tx;
           this.search();
         }
         });
       }catch(e){
        // error getting value or inexistant
       }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Search');
  }
search(){
    if(this.text==""||this.text==" "){
        $('#errcont').html("<div class='normaltextcenter'>Pas de résultats trouvé</div>");
          this.cards=[];
          this.clcards=[];
    }
    else{
      this.search_events(this.text);
      this.search_clients(this.text);
    }
}
gotomain(){
  this.viewCtrl.dismiss();
//this.app.getRootNav().setRoot( Tabs );
}

search_events(key){
  this.cards=[];
  $('#errcont').html("");
  let Data={
    keyword : key,
    operation : "select"
  }
  let conn=new Connexion(this.http,this.storage);
  conn.select('evenement_s',Data);
  setTimeout(() => {
    var res=conn.result;
    var select_res=conn.select_res;

    if(res==2){
      this.cards=[];
      var json=JSON.parse(select_res);
      this.Events=json;

      for (var i = 0; i < json.length; i++) {
        var Ami={ "ev_id":json[i].id,
                  "ev_titre":json[i].titre,
                  "ev_type":json[i].type,
                  "ev_description": json[i].description
                }
             this.cards.push(Ami);
      }
    }
    else if(res==1){
         // no result
         if(this.clcards==null){
        $('#errcont').html("<div class='normaltextcenter'>Pas de résultats trouvé</div>");
         }

    }
    else{
        // error not connected to server

        $('#errcont').html("<div class='normaltextcenter'>Pas de résultats trouvé</div>");
    }
  }, 2000);

}

search_clients(key){
  this.clcards=[];
  $('#errcont').html("");
  let Data={
    keyword : key,
    operation : "select"
  }
  let conn=new Connexion(this.http,this.storage);
  conn.select('clients_s',Data);
  setTimeout(() => {
    var res=conn.result;
    var select_res=conn.select_res;

    if(res==2){
      this.clcards=[];
      var json=JSON.parse(select_res);


      for (var i = 0; i < json.length; i++) {
        var Ami={ "ami_id":json[i].id,
                  "ami_prenom":json[i].prenom,
                  "ami_nom_famille":json[i].nom_famille,
                  "ami_photo": this.url+"/img/"+json[i].profilephoto+".png",
                  "ami_region": json[i].region,
                  "ami_statut" : json[i].statut
                }
             this.clcards.push(Ami);
      }

    }
    else if(res==1){
         // no result
         if(this.cards==null){
        $('#errcont').html("<div class='normaltextcenter'>Pas de résultats trouvé</div>");
         }
    }
    else{
        // error not connected to server
        $('#errcont').html("<div class='normaltextcenter'>Pas de résultats trouvé</div>");
    }
  }, 2000);

}





voir_ami(id){
  if(id==this.myid){
    let modal= this.modalCtrl.create(Profile);
    modal.present();
  }
  else{
    let modal= this.modalCtrl.create(Profileinfo,{'id':id});
    modal.present();
  }

}
voir_event(id){
  var passedData;
  for (var i = 0; i < this.Events.length; i++) {
    if(this.Events[i].id==id){
      passedData={
        id: this.Events[i].id,
        lat : this.Events[i].lat,
        lng: this.Events[i].lng,
        id_client :this.Events[i].id_client,
        titre : this.Events[i].titre,
        type: this.Events[i].type,
        description : this.Events[i].description,
        autre : this.Events[i].autre,
        prepaye: this.Events[i].prepaye,
        date : this.Events[i].date,
        nb_abonnees: this.Events[i].nb_abonnees,
        statut : this.Events[i].statut,
        positionlat :"",
        positionlng :""
      }
    }

  }
  let modal= this.modalCtrl.create(Eventinfos,passedData);
  modal.present();
}



}
