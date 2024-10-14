import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInSectionComponent } from './new-in-section.component';

describe('NewInSectionComponent', () => {
  let component: NewInSectionComponent;
  let fixture: ComponentFixture<NewInSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
