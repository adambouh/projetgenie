import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationChefComponent } from './notification-chef.component';

describe('NotificationChefComponent', () => {
  let component: NotificationChefComponent;
  let fixture: ComponentFixture<NotificationChefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationChefComponent]
    });
    fixture = TestBed.createComponent(NotificationChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
