import { Client} from '../classes/client';
export class JsonParse {


    constructor(){

    }

    JsonToClient(JsonData : any) :Client{
      var Data : any;
      Data = JSON.parse(JsonData);
       var id=JSON.stringify(Data[0].id);
       var stid=id.toString().substring(1,(id.toString().length)-1);
       var prenom=JSON.stringify(Data[0].prenom);
       var stprenom=prenom.toString().substring(1,(prenom.toString().length)-1);
       var nom_famille=JSON.stringify(Data[0].nom_famille);
       var stnom_famille=nom_famille.toString().substring(1,(nom_famille.toString().length)-1);
       var email=JSON.stringify(Data[0].email);
       var stemail=email.toString().substring(1,(email.toString().length)-1);
       var tel=JSON.stringify(Data[0].tel);
       var sttel=tel.toString().substring(1,(tel.toString().length)-1);
       var date_naissance=JSON.stringify(Data[0].date_naissance);
       var stdate_naissance=date_naissance.toString().substring(1,(date_naissance.toString().length)-1);
       var adresse=JSON.stringify(Data[0].adresse);
       var stadresse=adresse.toString().substring(1,(adresse.toString().length)-1);
       var mot_de_passe=JSON.stringify(Data[0].mot_de_passe);
       var stmot_de_passe=mot_de_passe.toString().substring(1,(mot_de_passe.toString().length)-1);
       var region=JSON.stringify(Data[0].region);
       var stregion=region.toString().substring(1,(region.toString().length)-1);
       var sexe=JSON.stringify(Data[0].sexe);
       var stsexe="";
       if(sexe=='""'){
        stsexe="-";
       }
       else{
        stsexe=sexe.toString().substring(1,(sexe.toString().length)-1);
       }
       var nb_amis=JSON.stringify(Data[0].nb_amis);
       var stnb_amis=nb_amis.toString().substring(1,(nb_amis.toString().length)-1);
       var nb_evenement=JSON.stringify(Data[0].nb_evenement);
       var stnb_evenement=nb_evenement.toString().substring(1,(nb_evenement.toString().length)-1);
       var profilephoto=JSON.stringify(Data[0].profilephoto);
       var stprofilephoto=profilephoto.toString().substring(1,(profilephoto.toString().length)-1);
       var profilecover=JSON.stringify(Data[0].profilecover);
       var stprofilecover=profilecover.toString().substring(1,(profilecover.toString().length)-1);
     let c=new Client(stprenom,stnom_famille,stemail,sttel,stdate_naissance,stadresse,stmot_de_passe,parseInt(stnb_amis),parseInt(stnb_evenement));
     c.setSexe(stsexe);
     c.setId(parseInt(stid));
     c.setRegion(stregion);
     c.setProfilephoto(stprofilephoto);
     c.setProfilecover(stprofilecover);


    return c;
    }


}
