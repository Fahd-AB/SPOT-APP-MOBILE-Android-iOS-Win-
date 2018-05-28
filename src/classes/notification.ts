
export class Notification {
 public  id : number;
 public  titre : string;
 public  type : string;
 public  texte : string;
 public target_client : number;
 public source_client : number;
 public  target : number;
 public  date : string;
 public  vu : number;


      constructor(id:number,titre:string,type:string,texte:string,target_client:number,source_client:number,target:number,date:string,vu:number){
      this.id=id;
      this.titre=titre;
      this.type=type;
      this.texte=texte;
      this.target_client=target_client;
      this.source_client=source_client;
      this.target=target;
      this.date=date;
      this.vu=vu;
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


    getTexte():string{
      return this.texte;
    }
    setTexte(texte:string){
       this.texte=texte;
    }

    getTarget_client():number{
      return this.target_client;
    }
    setTarget_client(target_client:number){
      this.target_client=target_client;
    }

    getSource_client():number{
      return this.source_client;
    }
    setSource_client(source_client:number){
      this.source_client=source_client;
    }

    getTarget():number{
      return this.target;
    }
    setTarget(target:number){
      this.target=target;
    }


    getDate():string{
      return this.date;
    }
    setDate(date:string){
       this.date=date;
    }


    getVu():number{
      return this.vu;
    }
    setVu(vu:number){
      this.vu=vu;
    }



}
