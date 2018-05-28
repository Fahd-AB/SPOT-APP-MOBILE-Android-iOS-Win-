

export class Abonnement {
 public  id : number;
 public  id_client : number;
 public  id_evenement : number;
 public  date : string;
 public  statut : number;



      constructor(id:number,id_client:number,id_evenement:number,date:string,statut:number){
      this.id=id;
      this.id_client=id_client;
      this.id_evenement=id_evenement;
      this.date=date;
      this.statut=statut;
    }
    getId():number{
      return this.id;
    }
    setId(id:number){
    this.id=id;
    }

    getId_client():number{
      return this.id_client;
    }
    setId_client(id_client:number){
    this.id_client=id_client;
    }

    getId_evenement():number{
      return this.id_evenement;
    }
    setId_evenement(id_evenement:number){
       this.id_evenement=id_evenement;
    }


    getDate():string{
      return this.date;
    }
    setDate(date:string){
       this.date=date;
    }


    getStatut():number{
      return this.statut;
    }
    setStatut(statut:number){
       this.statut=statut;
    }


}
