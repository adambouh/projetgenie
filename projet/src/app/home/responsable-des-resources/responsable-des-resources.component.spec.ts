import { ComponentFixture, TestBed } from '@angular/core/testing';

import { responsabledesresources } from './responsable-des-resources.component';

describe('ChefDeResourcesComponent', () => {
  let component: responsabledesresources;
  let fixture: ComponentFixture<responsabledesresources>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [responsabledesresources]
    });
    fixture = TestBed.createComponent(responsabledesresources);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
