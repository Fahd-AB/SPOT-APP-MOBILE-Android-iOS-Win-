

export class Transaction {
 public  id : number;
 public  id_evenement : number;
 public  id_abonneur : number;
 public  id_abonnement : number;
 public  date : string;
 public  statut : number;



      constructor(id:number,id_evenement:number,id_abonneur:number,id_abonnement:number,date:string,statut:number){
      this.id=id;
      this.id_evenement=id_evenement;
      this.id_abonneur=id_abonneur;
      this.id_abonnement=id_abonnement;
      this.date=date;
      this.statut=statut;
    }
    getId():number{
      return this.id;
    }
    setId(id:number){
    this.id=id;
    }

    getId_evenement():number{
      return this.id_evenement;
    }
    setId_evenement(id_evenement:number){
    this.id_evenement=id_evenement;
    }

    getId_abonneur():number{
      return this.id_abonneur;
    }
    setId_abonneur(id_abonneur:number){
    this.id_abonneur=id_abonneur;
    }

    getId_abonnement():number{
      return this.id_abonnement;
    }
    setId_abonnement(id_abonnement:number){
    this.id_abonnement=id_abonnement;
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
