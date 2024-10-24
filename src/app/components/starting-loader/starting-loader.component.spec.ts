import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingLoaderComponent } from './starting-loader.component';

describe('StartingLoaderComponent', () => {
  let component: StartingLoaderComponent;
  let fixture: ComponentFixture<StartingLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartingLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartingLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
