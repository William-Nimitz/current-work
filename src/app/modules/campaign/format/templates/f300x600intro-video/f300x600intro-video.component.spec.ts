import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F300x600introVideoComponent } from './f300x600intro-video.component';

describe('F300x600introImageComponent', () => {
  let component: F300x600introVideoComponent;
  let fixture: ComponentFixture<F300x600introVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F300x600introVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F300x600introVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
