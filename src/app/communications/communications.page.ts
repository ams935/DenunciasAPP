import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServicesService } from '../services/services.service';



@Component({
  selector: 'app-communications',
  templateUrl: './communications.page.html',
  styleUrls: ['./communications.page.scss'],
})
export class CommunicationsPage implements OnInit {

  public communications: any[] = [];
  public total: number = 0;
  public text: string = '';
  private anonymous: boolean = false;
 
  public user_id = null;

  constructor(
    public servicio: ServicesService,
    public loading: LoadingController,
    public route: ActivatedRoute
  ) { 

  }

  ngOnInit() {
    
  } 

  ionViewWillEnter(){
    this.user_id = this.route.snapshot.paramMap.get('user_id');
    this.load_communications();
  };

  async load_communications(){
    let l = await this.loading.create();

    l.present();
    //this.servicio.communications_list(this.text)
    this.servicio.communications_list_user(this.user_id, this.text)
      .subscribe((data: any) => {
        this.communications = data.info.items;
        console.log(this.user_id);
        console.log(this.text)
        /*
        this.storage.get('user_id').then((val) => {
          console.log(val);
        });
        */
        //console.log(this.communications);
        this.total = data.info.total;
        l.dismiss();
      }, (error: any) => {
        l.dismiss();
    });
  }

  buscar(event){
    console.log(event);
    this.text = event.detail.value;
  }
}
