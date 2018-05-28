import { Storage } from '@ionic/storage';
import { Client } from '../classes/client';

export class LocalStorage {
    public cl:Client;

      constructor(public storage :Storage){

    }



   storeClient(c: Client){
     this.storage.set('SPOT_SESSION', 'TRUE');
     this.storage.set('Profileid', c.getId().toString());
     this.storage.set('Profilename', c.getPrenom().toString()+" "+ c.getNom_famille().toString());
     this.storage.set('Profilefirstname', c.getPrenom().toString());
     this.storage.set('Profilelastname', c.getNom_famille().toString());
     this.storage.set('Profilefreinds', c.getNb_amis().toString());
     this.storage.set('Profileevents', c.getNb_evenement().toString());
     this.storage.set('Profileregion',c.getRegion().toString());
     this.storage.set('Profilegender', c.getSexe().toString());
     this.storage.set('Profilebirthdate',c.getDate_naissance().toString());
     this.storage.set('Profiletel', c.getTel().toString());
     this.storage.set('Profileadr', c.getAdresse().toString());
     this.storage.set('Profileemail', c.getEmail().toString());
     this.storage.set('Profilecurrentpass', c.getMot_de_passe().toString());
     this.storage.set('Profilephoto', c.getProfilephoto().toString());
     this.storage.set('Profilecover', c.getProfilecover().toString());
   }
   getClient(){
      var profileid;
      var profilefirstname;
      var profilelastname;
      var profileemail;
      var profiletel;
      var profilebirthdate;
      var profileadr;
      var profilecurrentpass;
      var profilefreinds;
      var profileevents;
      var profilegender;
      var profileregion;

      try{

      this.storage.get('Profilefirstname').then((val)=>{
      profilefirstname=val;
      });
      this.storage.get('Profilelastname').then((val)=>{
      profilelastname=val;
      });
      this.storage.get('Profileemail').then((val)=>{
      profileemail=val;
      });
      this.storage.get('Profiletel').then((val)=>{
      profiletel=val;
      });
      this.storage.get('Profilebirthdate').then((val)=>{
      profilebirthdate=val;
      });
      this.storage.get('Profileadr').then((val)=>{
      profileadr=val;
      });
      this.storage.get('Profilecurrentpass').then((val)=>{
      profilecurrentpass=val;
      });
      this.storage.get('Profilefreinds').then((val)=>{
      profilefreinds=val;
      });
      this.storage.get('Profileevents').then((val)=>{
      profileevents=val;
      });
      this.storage.get('Profilegender').then((val)=>{
      profilegender=val;
      });
      this.storage.get('Profileregion').then((val)=>{
      profileregion=val;
      });

      this.storage.get('Profileid').then((val)=>{
      profileid=val;
      });
      setTimeout(() => {
      this.cl=new Client(profilefirstname,profilelastname,profileemail,profiletel, profilebirthdate,profileadr,profilecurrentpass,parseInt(profilefreinds),parseInt(profileevents));
      this.cl.setId(parseInt(profileid));
      this.cl.setSexe(profilegender);
      this.cl.setRegion(profileregion);
    }, 500);


      }catch(e){
       console.log('error getting client');
      }



   }
   deleteClient(){

     this.storage.remove('SPOT_SESSION');
     this.storage.remove('Profilename');
     this.storage.remove('Profilefirstname');
     this.storage.remove('Profilelastname');
     this.storage.remove('Profilefreinds');
     this.storage.remove('Profileevents');
     this.storage.remove('Profileregion');
     this.storage.remove('Profilegender');
     this.storage.remove('Profilebirthdate');
     this.storage.remove('Profileid');
     this.storage.remove('Profiletel');
     this.storage.remove('Profileadr');
     this.storage.remove('Profileemail');
     this.storage.remove('Profilecurrentpass');
     this.storage.remove('Profilephoto');
     this.storage.remove('Profilecover');

   }


}
