

export class Avis {
 public  id : number;
 public  id_client : number;
 public  id_lieu : number;
 public  note : number;
 public  commentaire : string;
 public  date : string;




      constructor(id:number,id_client:number,id_lieu:number,note:number,commentaire:string,date:string){
      this.id=id;
      this.id_client=id_client;
      this.id_lieu=id_lieu;
      this.note=note;
      this.commentaire=commentaire;
      this.date=date;
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

    getId_lieu():number{
      return this.id_lieu;
    }
    setId_lieu(id_lieu:number){
       this.id_lieu=id_lieu;
    }

    getNote():number{
      return this.note;
    }
    setNote(note:number){
      this.note=note;
    }

    getCommentaire():string{
      return this.commentaire;
    }
    setCommentaire(commentaire:string){
       this.commentaire=commentaire;
    }


    getDate():string{
      return this.date;
    }
    setDate(date:string){
       this.date=date;
    }








}
