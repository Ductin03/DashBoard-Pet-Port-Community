// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../app/src/features/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'pet',
        loadComponent: () => import('../app/src/features/pet/get-pet/get-pet.component').then((c) => c.GetPetComponent)
      },
      {
        path: 'pet/detail/:id',
        loadComponent: () => import('../app/src/features/pet/pet-detail/pet-detail.component').then((c) => c.PetDetailComponent)
      },
      {
        path: 'product',
        loadComponent: () => import('../app/src/features/product/get-product/get-product.component').then((c) => c.GetProductComponent)
      },
      {
        path: 'product/detail/:id',
        loadComponent: () => import('../app/src/features/product/product-detail/product-detail.component').then((c) => c.ProductDetailComponent)
      },
      {
        path: 'posts',
        loadComponent: () => import('../app/src/features/post/get-post/post.component').then((c)=>c.PostComponent)
      },
      {
        path: 'posts/detail/:id',
        loadComponent: () => import('../app/src/features/post/post-detail/post-detail.component').then((c)=>c.PostDetailComponent)
      }

    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('../app/src/features/authentication/login/login.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
