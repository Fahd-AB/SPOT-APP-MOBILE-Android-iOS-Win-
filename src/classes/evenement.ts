import { Pos } from './position';
import { Payement } from './payement';
export class Evenement {
 public  id : number;
 public  titre : string;
 public  type : string;
 public  autre : string;
 public  description : string;
 public  prepaye : string;
 public  date : string;
 public  position : Pos;
 public  payement : Payement;


      constructor(titre : string,type : string,autre : string,
      description : string,prepaye : string,date : string,
      position : Pos){
      this.titre=titre;
      this.type=type;
      this.autre=autre;
      this.description=description;
      this.prepaye=prepaye;
      this.date=date;
      this.position=position;

    }
    getId():number{
      return this.id;
    }
    setId(id:number){
    this.id=id;
    }
    getTitre():string{
      return this.titre;
    }
    setTitre(titre:string){
    this.titre=titre;
    }
    getType():string{
      return this.type;
    }
    setType(type:string){
    this.type=type;
    }
    getAutre():string{
      return this.autre;
    }
    setAutre(autre:string){
    this.autre=autre;
    }
    getDescription():string{
      return this.description;
    }
    setDescription(description:string){
    this.description=description;
    }
    getPrepaye():string{
      return this.prepaye;
    }
    setPrepaye(prepaye:string){
    this.prepaye=prepaye;
    }
    getDate():string{
      return this.date;
    }
    setDate(date:string){
    this.date=date;
    }
    getPosition():Pos{
      return this.position;
    }
    setPosition(position:Pos){
    this.position=position;
    }
    getPayement():Payement{
      return this.payement;
    }
    setPayement(payement:Payement){
    this.payement=payement;
    }


}
