
export class Client {
 public  id : number;
 public  prenom : string;
 public  nom_famille : string;
 public  sexe : string;
 public email : string;
 public tel : string;
 public  date_naissance : string;
 public  adresse : string;
 public  mot_de_passe : string;
 public  nb_amis : number;
 public  nb_evenement : number;
 public  region : string;
 public  profilephoto :string;
 public  profilecover : string;

      constructor(prenom : string,nom_famille : string,email : string,
        tel : string,date_naissance : string,adresse : string,
        mot_de_passe : string, nb_amis:number, nb_evenement:number){
      this.prenom=prenom;
      this.nom_famille=nom_famille;
      this.email=email;
      this.tel=tel;
      this.date_naissance=date_naissance;
      this.adresse=adresse;
      this.mot_de_passe=mot_de_passe;
      this.nb_amis=nb_amis;
      this.nb_evenement=nb_evenement;
    }
    getId():number{
      return this.id;
    }
    setId(id:number){
    this.id=id;
    }
    getPrenom():string{
      return this.prenom;
    }
    getNom_famille():string{
      return this.nom_famille;
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
    setDate_naissance(date_naissance:string){
    this.date_naissance=date_naissance;
    }
    getDate_naissance():string{
      return this.date_naissance;
    }
    setAdresse(adresse:string){
    this.adresse=adresse;
    }
    getAdresse():string{
      return this.adresse;
    }
    setMot_de_passe(mot_de_passe:string){
    this.mot_de_passe=mot_de_passe;
    }
    getMot_de_passe():string{
      return this.mot_de_passe;
    }
    setNb_amis(nb_amis:number){
    this.nb_amis=nb_amis;
    }
    getNb_amis():number{
      return this.nb_amis;
    }
    setNb_evenement(nb_evenement:number){
    this.nb_evenement=nb_evenement;
    }
    getNb_evenement():number{
      return this.nb_evenement;
    }
    setSexe(sexe:string){
    this.sexe=sexe;
    }
    getSexe():string{
      return this.sexe;
    }
    setRegion(region:string){
    this.region=region;
    }
    getRegion():string{
      return this.region;
    }
    setProfilephoto(profilephoto:string){
    this.profilephoto=profilephoto;
    }
    getProfilephoto():string{
      return this.profilephoto;
    }
    setProfilecover(profilecover:string){
    this.profilecover=profilecover;
    }
    getProfilecover():string{
      return this.profilecover;
    }



}
