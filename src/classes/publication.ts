

export class Publication {
 public  id : number;
 public  id_client : number;
 public  texte : string;
 public  date : string;
 public  nb_likes : number;
 public  nb_comm : number;
 public  media : string;


      constructor(id:number,id_client:number,texte:string,date:string,nb_likes:number,nb_comm:number,media:string){
      this.id=id;
      this.id_client=id_client;
      this.texte=texte;
      this.date=date;
      this.nb_likes=nb_likes;
      this.nb_comm=nb_comm;
      this.media=media;
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

    getTexte():string{
      return this.texte;
    }
    setTexte(texte:string){
       this.texte=texte;
    }

    getNb_likes():number{
      return this.nb_likes;
    }
    setNb_likes(nb_likes:number){
      this.nb_likes=nb_likes;
    }

    getNb_comm():number{
      return this.nb_comm;
    }
    setNb_comm(nb_comm:number){
      this.nb_comm=nb_comm;
    }


    getDate():string{
      return this.date;
    }
    setDate(date:string){
       this.date=date;
    }


    getMedia():string{
      return this.media;
    }
    setMedia(media:string){
       this.media=media;
    }





}
