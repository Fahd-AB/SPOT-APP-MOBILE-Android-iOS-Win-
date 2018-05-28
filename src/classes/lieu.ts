
export class Lieu {
 public  id : number;
 public  nom : string;
 public  type : string;
 public  region : string;
 public  description : string;
 public  id_position : number;
 public  id_client : number;
 public  photo : string;



      constructor(id:number,id_client:number,nom:string,type:string,region:string,description:string,id_position:number,photo:string){
      this.id=id;
      this.id_client=id_client;
      this.nom=nom;
      this.type=type;
      this.region=region;
      this.description=description;
      this.id_position=id_position;
      this.photo=photo;
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

    getNom():string{
      return this.nom;
    }
    setNom(nom:string){
       this.nom=nom;
    }

    getType():string{
      return this.type;
    }
    setType(type:string){
       this.type=type;
    }

    getRegion():string{
      return this.region;
    }
    setRegion(region:string){
       this.region=region;
    }

    getDescription():string{
      return this.description;
    }
    setDescription(description:string){
       this.description=description;
    }

    getId_position():number{
      return this.id_position;
    }
    setId_position(id_position:number){
      this.id_position=id_position;
    }

    getPhoto():string{
      return this.photo;
    }
    setPhoto(photo:string){
      this.photo=photo;
    }




}
