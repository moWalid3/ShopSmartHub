import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/layout.routes').then(m => m.layoutRoutes)
  },

];
