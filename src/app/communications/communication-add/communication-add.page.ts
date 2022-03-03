import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-communication-add',
  templateUrl: './communication-add.page.html',
  styleUrls: ['./communication-add.page.scss'],
})
export class CommunicationAddPage implements OnInit {

  public id: number = 0;
  public type_id: number = 0;
  public sender_id: string;
  public recipient_id: number = 0;
  public department_id: number = 0;
  public anonymous: boolean = false;
  public message: string = '';
  public status: boolean = true;

  public communications_type: any[] = [];
  public communications_users: any[] = [];
  public communications_departments: any[] = [];

  private text: string = '';

  constructor(
    public servicio: ServicesService,
    public loading: LoadingController,
    public route: ActivatedRoute
  ) { 
    this.id = this.route.snapshot.params.communication_id ? this.route.snapshot.params.communication_id : 0;
  }

  ngOnInit() {
    this.sender_id = this.route.snapshot.paramMap.get('user_id');
    console.log(this.sender_id);
    this.load_type_of_communications();
    this.load_users();
    this.load_departments();
  }

  onChange(event){
    alert("Has seleccionado la id = " + event.target.value);
  }

  async load_type_of_communications(){
    let l = await this.loading.create();
    l.present();
    this.servicio.communications_type_list(this.text)
      .subscribe((data: any) => {
        this.communications_type = data.info.items;
        console.log(this.communications_type);
        l.dismiss();
      }, (error: any) => {
        l.dismiss();
    });
  }

  async load_users(){
    let l = await this.loading.create();
    l.present();
    this.servicio.users_list(this.text)
      .subscribe((data: any) => {
        this.communications_users = data.info.items;
        console.log(this.communications_users);
        l.dismiss();
      }, (error: any) => {
        l.dismiss();
    });
  }

  async load_departments(){
    let l = await this.loading.create();
    l.present();
    this.servicio.departments_list(this.text)
      .subscribe((data: any) => {
        this.communications_departments = data.info.items;
        console.log(this.communications_departments);
        l.dismiss();
      }, (error: any) => {
        l.dismiss();
    });
  }

  save_communication(){
    console.log(this.id);
    console.log(this.type_id);
    console.log(this.sender_id);
    console.log(this.recipient_id);
    console.log(this.department_id);
    console.log(this.anonymous);
    console.log(this.status);
    if(this.type_id == 0){
      this.servicio.message('Debe ingresar un tipo de communicación', 'warning');
    }else if(this.recipient_id == 0){
      this.servicio.message('Debe ingresar un empleado para dirigir su comunicación', 'warning');
    }else if(this.department_id == 0){
      this.servicio.message('Debe ingresar un departamento', 'warning');
    }else if(this.message == ""){
      this.servicio.message('Debe ingresar un mensaje', 'warning');
    }else{
      this.servicio.communication_save({
        communication_id: this.id,
        communication_type_id: this.type_id,
        communication_sender_id: this.sender_id,
        communication_recipient_id: this.recipient_id,
        communication_department_id: this.department_id,
        anonymous: this.anonymous ? '1' : '0',
        message: this.message,
        status: this.status ? '1' : '0'
      }).subscribe((data: any) => {
        //this.servicio.message('Comunicación enviada', 'success');
        if(data.info.id > 0) {
          this.servicio.goTo('/communications/' + this.sender_id);
        }
      }, _ => {
        this.servicio.message('No se pudo enviar la comunicación', 'danger');
      });
    }
  }

}
