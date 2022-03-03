import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommunicationAddPage } from './communication-add.page';

describe('CommunicationAddPage', () => {
  let component: CommunicationAddPage;
  let fixture: ComponentFixture<CommunicationAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
