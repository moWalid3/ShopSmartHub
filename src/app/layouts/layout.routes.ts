import { Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { HomeComponent } from '../pages/home/home.component';
import { TestmeComponent } from '../pages/testme/testme.component';

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
      }
    ]
  }
]