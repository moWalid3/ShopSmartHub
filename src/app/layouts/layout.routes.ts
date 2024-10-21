import { Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { HomeComponent } from '../pages/home/home.component';
import { TestmeComponent } from '../pages/testme/testme.component';
import { accessControlGuard } from '../core/guards/access-control.guard';

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
        path: 'wishlist',
        loadComponent: () => import('../pages/wishlist/wishlist.component').then(m => m.WishlistComponent),
        canActivate: [accessControlGuard]
      },
    ]
  }
]