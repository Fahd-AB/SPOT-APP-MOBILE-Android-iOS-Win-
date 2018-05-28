

export class Historique {
 public  id : number;
 public  id_client : number;
 public  device : string;
 public  ip : string;
 public  date : string;
 public  statut : number;



      constructor(id:number,id_client:number,device:string,ip:string,date:string,statut:number){
      this.id=id;
      this.id_client=id_client;
      this.device=device;
      this.ip=ip;
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

    getDevice():string{
      return this.device;
    }
    setDevice(device:string){
       this.device=device;
    }

    getIp():string{
      return this.ip;
    }
    setIp(ip:string){
      this.ip=ip;
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
