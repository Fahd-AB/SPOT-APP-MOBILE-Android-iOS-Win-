

export class Message {
 public  id : number;
 public  emetteur : number;
 public  recepteur : number;
 public  texte : string;
 public  date : string;
 public  vu : number;



      constructor(id:number,emetteur:number,recepteur:number,texte:string,date:string,vu:number){
      this.id=id;
      this.emetteur=emetteur;
      this.recepteur=recepteur;
      this.texte=texte;
      this.date=date;
      this.vu=vu;
    }
    getId():number{
      return this.id;
    }
    setId(id:number){
    this.id=id;
    }

    getEmetteur():number{
      return this.emetteur;
    }
    setEmetteur(emetteur:number){
    this.emetteur=emetteur;
    }

    getRecepteur():number{
      return this.recepteur;
    }
    setRecepteur(recepteur:number){
    this.recepteur=recepteur;
    }

    getTexte():string{
      return this.texte;
    }
    setTexte(texte:string){
      this.texte=texte;
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
