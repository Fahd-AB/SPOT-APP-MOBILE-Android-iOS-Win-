
export class Demande_recuperation {

 public email : string;
 public tel : string;


      constructor(tel : string,email : string){
      this.email=email;
      this.tel=tel;
    }

    setEmail(email:string){
    this.email=email;
    }
    getEmail():string{
      return this.email;
    }
    setTel(tel:string){
    this.tel=tel;
    }
    getTel():string{
      return this.tel;
    }


}
