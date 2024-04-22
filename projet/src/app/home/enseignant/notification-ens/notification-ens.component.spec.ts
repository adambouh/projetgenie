import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationEnsComponent } from './notification-ens.component';

describe('NotificationEnsComponent', () => {
  let component: NotificationEnsComponent;
  let fixture: ComponentFixture<NotificationEnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationEnsComponent]
    });
    fixture = TestBed.createComponent(NotificationEnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
