import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilchefComponent } from './acceuilchef.component';

describe('AcceuilchefComponent', () => {
  let component: AcceuilchefComponent;
  let fixture: ComponentFixture<AcceuilchefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceuilchefComponent]
    });
    fixture = TestBed.createComponent(AcceuilchefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
