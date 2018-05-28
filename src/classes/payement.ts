
export class Payement {
 public  id : number;
 public  event_id : number;
 public  montant : string;
 public  methode : string;
 public  email : string;
 public  page_url : string;


      constructor(event_id : number,montant : string,methode : string,email : string,page_url : string){
      this.event_id=event_id;
      this.montant=montant;
      this.methode=methode;
      this.email=email;
      this.page_url=page_url;
    }


    getId():number{
      return this.id;
    }
    setId(id:number){
    this.id=id;
    }
    getEvent_Id():number{
      return this.event_id;
    }
    setEvent_Id(event_id:number){
    this.event_id=event_id;
    }
    setMontant(montant:string){
    this.montant=montant;
    }
    getMontant():string{
      return this.montant;
    }
    setMethode(methode:string){
    this.methode=methode;
    }
    getMethode():string{
      return this.methode;
    }
    setEmail(email:string){
    this.email=email;
    }
    getEmail():string{
      return this.email;
    }
    setPage_url(page_url:string){
    this.page_url=page_url;
    }
    getPage_url():string{
      return this.page_url;
    }


}
