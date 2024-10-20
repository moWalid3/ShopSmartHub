import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFinalPriceCardComponent } from './cart-final-price-card.component';

describe('CartFinalPriceCardComponent', () => {
  let component: CartFinalPriceCardComponent;
  let fixture: ComponentFixture<CartFinalPriceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartFinalPriceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartFinalPriceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
