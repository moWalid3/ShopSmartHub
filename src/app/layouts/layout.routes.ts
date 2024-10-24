import { Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { HomeComponent } from '../pages/home/home.component';
import { TestmeComponent } from '../pages/testme/testme.component';
import { accessControlGuard } from '../core/guards/access-control.guard';
import { checkoutGuard } from '../core/guards/checkout.guard';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'test', component: TestmeComponent
      },
      {
        path: 'products',
        loadComponent: () => import('../pages/all-products/all-products.component').then(m => m.AllProductsComponent)
      },
      {
        path: 'products/category/:category',
        loadComponent: () => import('../pages/all-products/all-products.component').then(m => m.AllProductsComponent)
      },
      {
        path: 'products/brand/:brand',
        loadComponent: () => import('../pages/all-products/all-products.component').then(m => m.AllProductsComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('../pages/all-categories/all-categories.component').then(m => m.AllCategoriesComponent)
      },
      {
        path: 'brands',
        loadComponent: () => import('../pages/all-brands/all-brands.component').then(m => m.AllBrandsComponent)
      },
      {
        path: 'product-details/:id',
        loadComponent: () => import('../pages/product-details/product-details.component').then(m => m.ProductDetailsComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('../pages/cart/cart.component').then(m => m.CartComponent),
        canActivate: [accessControlGuard]
      },
      {
        path: 'checkout',
        loadComponent: () => import('../pages/checkout/checkout.component').then(m => m.CheckoutComponent),
        canActivate: [checkoutGuard]
      },
      {
        path: 'wishlist',
        loadComponent: () => import('../pages/wishlist/wishlist.component').then(m => m.WishlistComponent),
        canActivate: [accessControlGuard]
      },
      {
        path: 'allorders',
        loadComponent: () => import('../pages/orders/orders.component').then(m => m.OrdersComponent),
        canActivate: [accessControlGuard]
      },
      {
        path: 'faq',
        loadComponent: () => import('../pages/faq/faq.component').then(m => m.FaqComponent),
      },
      {
        path: 'contact',
        loadComponent: () => import('../pages/contact/contact.component').then(m => m.ContactComponent),
      },
    ]
  }
]