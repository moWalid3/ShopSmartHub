import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMonthSectionComponent } from './sales-month-section.component';

describe('SalesMonthSectionComponent', () => {
  let component: SalesMonthSectionComponent;
  let fixture: ComponentFixture<SalesMonthSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesMonthSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesMonthSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
