import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveComponent } from './responsive.component';

describe('F1800x1000Component', () => {
  let component: ResponsiveComponent;
  let fixture: ComponentFixture<ResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
