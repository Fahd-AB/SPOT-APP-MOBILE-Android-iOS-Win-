import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Main } from '../pages/main/main';
import { Signup } from '../pages/signup/signup';
import { Plost } from '../pages/plost/plost';
import { Plostinfo } from '../pages/plostinfo/plostinfo';
import { Signup1 } from '../pages/signup1/signup1';
import { Signup2 } from '../pages/signup2/signup2';
import { Signup3 } from '../pages/signup3/signup3';
import { IonicStorageModule } from '@ionic/storage';
import { Login } from '../pages/login/login';
import { Slider } from '../pages/slider/slider';
import { Messages } from '../pages/messages/messages';
import { Tabs } from '../pages/tabs/tabs';
import { Settings } from '../pages/settings/settings';
import { Friends } from '../pages/friends/friends';
import { News } from '../pages/news/news';
import { Search } from '../pages/search/search';
import { Changeroot } from '../SControler/Changeroot';
import { Profile } from '../pages/profile/profile';
import { Event } from '../pages/event/event';
import { Chat } from '../pages/chat/chat';
import { Password } from '../pages/password/password';
import { Position } from '../pages/position/position';
import { Payement } from '../pages/payement/payement';
import { Transport } from '../pages/transport/transport';
import { Places } from '../pages/places/places';
import { Eventinfos } from '../pages/eventinfos/eventinfos';
import { Directions } from '../pages/directions/directions';
import { Pdirections } from '../pages/pdirections/pdirections';
import { Payementhist } from '../pages/payementhist/payementhist';
import { Gsettings } from '../pages/gsettings/gsettings';
import { Photos } from '../pages/photos/photos';
import { Notifications } from '../pages/notifications/notifications';
import { Profileinfo } from '../pages/profileinfo/profileinfo';
import { Reviews } from '../pages/reviews/reviews';
import { Eventedit } from '../pages/eventedit/eventedit';
import { Payementedit } from '../pages/payementedit/payementedit';
import { History } from '../pages/history/history';
import { Trans } from '../pages/trans/trans';
import { Oldpay } from '../pages/oldpay/oldpay';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NetworkInterface } from '@ionic-native/network-interface';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Main,
    Signup,
    Plost,
    Plostinfo,
    Signup1,
    Signup2,
    Signup3,
    Login,
    Slider,
    Messages,
    Tabs,
    Settings,
    Friends,
    News,
    Search,
    Profile,
    Event,
    Chat,
    Password,
    Position,
    Payement,
    Payementhist,
    Gsettings,
    Photos,
    Places,
    Directions,
    Eventinfos,
    Transport,
    Notifications,
    Pdirections,
    Profileinfo,
    Reviews,
    Eventedit,
    Payementedit,
    History,
    Trans,
    Oldpay,
    Changeroot
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Main,
    Signup,
    Plost,
    Plostinfo,
    Signup1,
    Signup2,
    Signup3,
    Login,
    Slider,
    Messages,
    Tabs,
    Settings,
    Friends,
    News,
    Search,
    Profile,
    Event,
    Chat,
    Password,
    Position,
    Payement,
    Payementhist,
    Gsettings,
    Photos,
    Places,
    Directions,
    Eventinfos,
    Transport,
    Notifications,
    Pdirections,
    Profileinfo,
    Reviews,
    Eventedit,
    Payementedit,
    History,
    Trans,
    Oldpay,
    Changeroot
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NetworkInterface,
    Camera,
    Transfer,
    Changeroot,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
