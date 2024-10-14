import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HurryUpSectionComponent } from './hurry-up-section.component';

describe('HurryUpSectionComponent', () => {
  let component: HurryUpSectionComponent;
  let fixture: ComponentFixture<HurryUpSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HurryUpSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HurryUpSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
