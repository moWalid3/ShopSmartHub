import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductsTableComponent } from './cart-products-table.component';

describe('CartProductsTableComponent', () => {
  let component: CartProductsTableComponent;
  let fixture: ComponentFixture<CartProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartProductsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
