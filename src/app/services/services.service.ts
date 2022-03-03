import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private URL_API: string = 'http://localhost:8080/API/'; //puerto 8080

  constructor(
    private router:Router,
    private http: HttpClient,
    private toast: ToastController
  ) { }

  goTo(url: string){
    this.router.navigateByUrl(url);
  }
  
  communications_list(_text: String = ''){
    return this.http.post(this.URL_API + 'list-communication', this.objectToFormData( {
      text: _text
    }));
  }

  communication_list(_id: Number){ 
    return this.http.get(this.URL_API + 'consult-communication/' + _id);
  }

  communications_list_user(_id: Number, _text: String = ''){ 
    return this.http.post(this.URL_API + 'list-communication/' + _id, this.objectToFormData( {
      text: _text
    }));
  }

  communications_type_list(_text: String = ''){
    return this.http.post(this.URL_API + 'list-typeOfCommunication', this.objectToFormData( {
      text: _text
    }));
  }

  users_list(_text: String = ''){
    return this.http.post(this.URL_API + 'list-user', this.objectToFormData( {
      text: _text
    }));
  }

  departments_list(_text: String = ''){
    return this.http.post(this.URL_API + 'list-department', this.objectToFormData( {
      text: _text
    }));
  }

  communication_save(data: any){
    console.log(data.department_id);
    return this.http.post(this.URL_API + (data.communication_id == 0 ? 'create-communication' : 'update-communication' + data.communication_id), this.objectToFormData( {
      communication_id: data.communication_id,
      communication_type_id: data.communication_type_id,
      communication_sender_id: data.communication_sender_id,
      communication_recipient_id: data.communication_recipient_id,
      communication_department_id: data.communication_department_id,
      anonymous: data.anonymous, //data.anonymous,
      message: data.message,
      status: data.status
    }));
  }

  //Login and logout

  getUser(_email_address: string, _password: string){
    return this.http.get(this.URL_API + 'consult-user/' + _email_address + ',' + _password);
  }

  logout(){

  }

  async message(texto: string, tipo: string = 'success'){
    let t = await this.toast.create({
      message: texto,
      color: tipo,
      duration: 3000
    });
    t.present();
  }

  objectToFormData(obj: any, form?: any, namespace?: any) {
    let fd: any = form || new FormData();
    let formKey: any;
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }

      }
    }
    return fd;
  };
}
