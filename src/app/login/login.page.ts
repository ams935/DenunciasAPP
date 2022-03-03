import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthConstants } from '../config/auth-constants';
import { ServicesService } from '../services/services.service';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userData = {
    email_address: '',
    password: ''
  }

  
  public id: string = "";
  public first_name: string = "";
  public last_name: string = "";
  public department_id: number = 0;
  public email_address: string = ""; 
  public password: string = "";
  public rol: string = "";

  constructor(
    public servicio: ServicesService, 
    private router: Router,
    private loading: LoadingController,
    private toast: ToastController,
    public userService: UserService,
    public storageService: StorageService
    ) { }

  ngOnInit() {
    //this.load_User();
  }

  validateInputs(){
    let email_address = this.userData.email_address.trim();
    let password = this.userData.password.trim();
    return (
      this.userData.email_address && 
      this.userData.password && 
      email_address.length > 0 &&
      password.length > 0
    )
  }

  /*
  loginAction(){
    if(this.validateInputs()){
      this.userService.login(this.userData).subscribe((res: any) => {
        if(res.info.item){
          this.storageService.store('email', res.info.item.email_address);
          this.storage.set('user_id', res.info.item.email_address);
          this.router.navigate(['communications']);
          console.log(this.storage);
          console.log(this.storageService);
          this.storage.set('name', 'Max');

          // Or to get a key/value pair
          this.storage.get('name').then((val) => {
            console.log(val);
          });
          
        }else{
          console.log('Email o contraseña incorrecto');
        }
      }, (error: any) => {
        console.log("Error de conexión");
      })
    }else{
      console.log('Introduzca todos los campos');
    }
  }
  */
 
  
  async login(){
    if(this.email_address == ""){
      this.presentToast('Introduzca tu email');
    }else if(this.password == ""){
      this.presentToast('Introduzca tu contraseña');
    }else{
      let l = await this.loading.create();
      l.present();
      this.servicio.getUser(this.email_address, this.password)
        .subscribe((data: any) => {
          l.dismiss();
          //console.log(data.info.item.communication_id);
          if(data.info.item.user_id > 0){
            this.id = data.info.item.user_id;
            console.log(this.id);
            //this.storageService.storeCurrentUser(this.id);
            //this.id = this.storageService.getCurrentUser();
            this.first_name = data.info.item.first_name;
            this.last_name = data.info.item.last_name;
            this.department_id = data.info.item.department_id;
            //this.password = data.info.item.type_communication;
            this.rol = data.info.item.rol;
            //console.log(this.type_communication);
            this.servicio.goTo('/communications/' + this.id);
            console.log(this.first_name);
            console.log(this.last_name);
            console.log(this.rol);
          }else{
            l.dismiss();
            this.servicio.message('Email o contraseña incorrecto', 'danger');
            this.servicio.goTo('/login');
          }
        }, (error: any) => {
          l.dismiss();
          this.servicio.message('No se pudo realizar la petición', 'danger');
          this.servicio.goTo('/login');
      });
    }
    
  } 
  

  // login(){
  //   const user = {email_address: this.email_address, password: this.password};
  //   this.userService.login(user).subscribe( data => {
  //     console.log(data);
  //   })
  // }
  getUserId(){
    return this.id;
  }

  async logout(){
    this.id = "";
    this.first_name = "";
    this.last_name = "";
    this.department_id = 0;
    this.rol = "";
    this.email_address = "";
    this.password = "";
    this.servicio.message('La sesión se finalizo de forma exitosa', 'success');
    this.servicio.goTo('/login')
  }

  async presentToast(a){
    const toast = await this.toast.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  
}
