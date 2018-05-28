import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { Changeroot } from '../SControler/Changeroot';
import { Storage } from '@ionic/storage';
import { MenuController,Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  Data : any;
  Profileid : string="";
  ProfileName : string="";
  ProfileRegion : string="";
  Profilephoto : string="";
  Profilegender : string="";
  PPhoto : string="";
  PName: string="";
  PRegion: string="";
  url:string="";
  stop : number =0;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public http : Http,
     public changeroot: Changeroot, private storage :Storage, public menuCtrl: MenuController, public events: Events) {
    platform.ready().then(() => {
      this.events.subscribe('main:tabSelected', eventData => {
      this.loadprofileinfos();
      });
      splashScreen.hide();
      statusBar.overlaysWebView(true);
      statusBar.backgroundColorByHexString('#136f80');

    });
  }


menuOpened() {
  this.loadprofileinfos();
}
// !!!!! Menu Links !!!!!
  logoutApp(){ ///<-- call from static button
      this.changeroot.logout(); ///<-- call
    }
  callsearch(){ ///<-- call from static button
        this.changeroot.gosearch(); ///<-- call
      }
  callsettings(){ ///<-- call from static button
        this.changeroot.gosettings(); ///<-- call
      }
      callgsettings(){ ///<-- call from static button
            this.changeroot.gogsettings(); ///<-- call
          }
 callcreateevent(){
   this.changeroot.gocreateevent();
 }
 callpayhist(){
   this.changeroot.gohistpayement(); ///<-- call
 }
 calltransport(){
   this.changeroot.gotransport(); ///<-- call
 }
 callpay(){
    this.changeroot.gopay(); ///<-- call
 }

 loadprofileinfos(){

     try{
       this.storage.get('url').then((val)=>{
       this.url=val;
       });
       this.storage.get('Profilephoto').then((val)=>{
         if(val=="" || val==null)
         {
           try{
           this.storage.get('Profilegender').then((val)=>{
             if(val=="m"){
                 this.PPhoto="assets/img/profile_m_default.png";
             }
             else if(val=="f"){
                 this.PPhoto="assets/img/profile_f_default.png";
             }

           });
         }catch(e){
          // error getting value or inexistant
          this.PPhoto="assets/img/profile_m_default.png";
         }


         }
         else{
           this.PPhoto=this.url+'/img/'+val+'.png';
         }
       });
     this.storage.get('Profilename').then((val)=>{
     this.PName=val;
     });
     this.storage.get('Profileregion').then((val)=>{
     this.PRegion=val;
     });


     }catch(e){
      // error getting value or inexistant
     }




   }


 updateUrl(event){
   /*
   if(this.Profilegender=="Homme"){
     this.PPhoto="assets/img/profile_m_default.png";
   }
   else if(this.Profilegender=="Femme"){
     this.PPhoto="assets/img/profile_f_default.png";
   }
   else{
     this.PPhoto="assets/img/profile_m_default.png";
   }
*/
 }
 reload(){
   /*
   this.PPhoto="http://localhost/img/profile"+this.Profileid+".png";
   this.PName=this.ProfileName;
   this.PRegion=this.ProfileRegion;
   */
 }

}
