import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicDetailsComponent } from './pic-details.component';

describe('PicDetailsComponent', () => {
  let component: PicDetailsComponent;
  let fixture: ComponentFixture<PicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
