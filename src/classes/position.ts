
export class Pos {
 public  id : number;
 public  Lat : string;
 public  Lng : string;


      constructor(lat : string,lng : string){
      this.Lat=lat;
      this.Lng=lng;

    }


    getId():number{
      return this.id;
    }
    setId(id:number){
    this.id=id;
    }
    setLat(lat:string){
    this.Lat=lat;
    }
    getLat():string{
      return this.Lat;
    }
    setLng(lng:string){
    this.Lng=lng;
    }
    getLng():string{
      return this.Lng;
    }


}
