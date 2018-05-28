import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
export class Connexion {
   public link: string;
   public result:number;
   public select_res:any;
   public rowcount:number;


      constructor(public http : Http, public storage:Storage){
        var url="http://localhost";
        //var url="https://www.spot-app.online/Mobile";
        //var url="http://192.168.23.1";
        this.link= url+'/api.php';
        this.storage.set("url",url);
    }
    
      insert(table:string,data:any){
      data.operation= "insert";
      data.table= table;

      var Jdata = JSON.stringify(data);
      this.http.post(this.link, Jdata).subscribe(data => {
        var rep=data['_body'];
        if(rep=="[]"){
         console.log("no answer from server");
         this.result= 1;
        }
        else{
          console.log("item added");
           this.result= 2;
        }

      }, error => {
        console.log("error send to server");
       this.result=0;
      });

    }

    select(table:string, d:any){
      d.operation= "select";
      d.table= table;
      // select condition is fixed inside data
      var Jdata = JSON.stringify(d);
      this.http.post(this.link, Jdata).subscribe(data => {
        var rep=data['_body'];
        if(rep=="[]"){
         console.log("no answer from server");
         this.result= 1;
        }
        else{
          console.log("result is back");
          this.result= 2;
          this.select_res=rep;
        }

      }, error => {
        console.log("error send to server");
       this.result=0;
      });

    }

   update(table:string,data:any){
     data.operation= "update";
     data.table= table;

     var Jdata = JSON.stringify(data);
     this.http.post(this.link, Jdata).subscribe(data => {
       var rep=data['_body'];
       if(rep=="[]"){
        console.log("no answer from server");
        this.result= 1;
       }
       else{
         console.log("item updated");
          this.result= 2;
       }

     }, error => {
       console.log("error send to server");
      this.result=0;
     });
   }


   delete(table:string,data:any){
     data.operation= "delete";
     data.table= table;

     var Jdata = JSON.stringify(data);
     this.http.post(this.link, Jdata).subscribe(data => {
       var rep=data['_body'];
       if(rep=="[]"){
        console.log("no answer from server");
        this.result= 1;
       }
       else{
         console.log("item deleted");
          this.result= 2;
       }

     }, error => {
       console.log("error send to server");
      this.result=0;
     });
   }

   exist(table:string, d:any){
     d.operation= "select";
     d.table= table;
     // select condition is fixed inside data
     var Jdata = JSON.stringify(d);
     this.http.post(this.link, Jdata).subscribe(data => {
       var rep=data['_body'];
       if(rep=="[]"){
        console.log("no answer from server");
        this.result= 1;
       }
       else{
         console.log("result is back");
         this.result= 2;
         this.rowcount=rep;
       }

     }, error => {
       console.log("error send to server");
      this.result=0;
     });

   }

}
