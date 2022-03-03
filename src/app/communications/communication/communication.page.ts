import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.page.html',
  styleUrls: ['./communication.page.scss'],
})

export class CommunicationPage implements OnInit {

  public communication: any;

  public communication_id: number = 0;
  public type_id: number = 0;
  public recipient_id: number = 0;
  public department_id: number = 0;
  public anonymous: boolean = false;
  public message: string = '';
  public type_communication: string = "";
  public recipient_name: string = "";
  public department: string = "";
  public anonymous_name: string = ""

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public servicio: ServicesService,
    private loading: LoadingController
  ) { 
    this.communication_id = this.route.snapshot.params.communication_id ? this.route.snapshot.params.communication_id : 0;
  }

  ngOnInit() {
    //this.loadCommunication();
  }

  ionViewWillEnter(){
    this.load_communication();
  };

  async load_communication(){
    let l = await this.loading.create();
    l.present();
    this.servicio.communication_list(this.communication_id)
      .subscribe((data: any) => {
        l.dismiss();
        console.log(data.info.item.communication_id);
        if(data.info.item.communication_id > 0){
          this.type_id = data.info.item.communication_type_id;
          this.recipient_id = data.info.item.communication_recipient_id;
          this.department_id = data.info.item.communication_department_id;
          this.anonymous = data.info.item.anonymous;
          this.message = data.info.item.message;
          this.type_communication = data.info.item.type_communication;
          this.recipient_name = data.info.item.recipient_first_name + " " +  data.info.item.recipient_last_name;
          this.department = data.info.item.department;
          console.log(this.type_communication);
          if(this.anonymous == true){
            this.anonymous_name = 'Sí';
          }else{
            this.anonymous_name = 'No';
          }
        }else{
          this.servicio.message('La comunicación que intenta consultar no existe', 'danger');
          this.servicio.goTo('/communications');
        }
        console.log(this.type_id);
        console.log(this.recipient_id);
        console.log(this.communication_id);
      }, (error: any) => {
        l.dismiss();
        this.servicio.message('No se pudo realizar la petición', 'danger');
        this.servicio.goTo('/communications');
    });
  } 
}
