import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from '../login/login';
import { Tabs } from '../tabs/tabs';
import { StatusBar } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Slider } from '../slider/slider';
import { MenuController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


  constructor(public navCtrl: NavController,private storage :Storage, public menuCtrl: MenuController) {

 this.menuCtrl.swipeEnable(false);
  StatusBar.show();
  setTimeout(() => {
 this.testfirstwork();
 }, 2500);

  //this.storage.remove('firstv');
  }


 ionViewDidLoad() {
//test internet connection
   }
next(){
this.navCtrl.push(Login);
}
testfirstwork(){

try{
this.storage.get('firstv').then((val)=>{
// value exist redirect to login
if(val=='non'){
  try{
  this.storage.get('SPOT_SESSION').then((val)=>{
  // value exist redirect to main page
  if(val=='TRUE'){
   this.navCtrl.push(Tabs);
  }
  else{
    this.next();
  }
  });
  }catch(e){
    // inexistant session to login page
  this.next();
  }

}
else{
this.toslider();
// vers slider page
}

});
}catch(e){
// set value and redirect to slider
this.toslider();
}

}
toslider(){
this.storage.set('firstv','non');
this.navCtrl.push(Slider);
}


}
