import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannesTechComponent } from './pannes-tech.component';

describe('PannesTechComponent', () => {
  let component: PannesTechComponent;
  let fixture: ComponentFixture<PannesTechComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PannesTechComponent]
    });
    fixture = TestBed.createComponent(PannesTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
