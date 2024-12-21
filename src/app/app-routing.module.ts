// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' // Đảm bảo chỉ redirect khi path rỗng chính xác
  },
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
        path: 'posts',
        loadComponent: () => import('../app/src/features/post/get-post/post.component').then((c)=>c.PostComponent)
      },
      {
        path: 'posts/detail/:id',
        loadComponent: () => import('../app/src/features/post/post-detail/post-detail.component').then((c)=>c.PostDetailComponent)
      },
      {
        path: 'doctors',
        loadComponent: () => import('../app/src/features/doctor/get-doctor/get-doctor.component').then((c) => c.GetDoctorComponent)
      },
      {
        path: 'doctors/detail/:id',
        loadComponent: () => import('../app/src/features/doctor/get-detail-doctor/get-detail-doctor.component').then((c) => c.GetDetailDoctorComponent)
      },
      {
        path: 'doctors/get-request',
        loadComponent: () => import('../app/src/features/doctor/get-request-upgrade-doctor/get-request-upgrade-doctor.component').then((c) => c.GetRequestUpgradeDoctorComponent)
      },
      {
        path: 'doctors/get-request/detail/:id',
        loadComponent: () => import('../app/src/features/doctor/get-detail-request-upgrade/get-detail-request-upgrade.component').then((c) => c.GetDetailRequestUpgradeComponent)
      },
      {
        path: 'sellers',
        loadComponent: () => import('../app/src/features/seller/get-seller/get-seller.component').then((c) => c.GetSellerComponent)
      },
      {
        path: 'sellers/detail/:id',
        loadComponent: () => import('../app/src/features/seller/get-detail-seller/get-detail-seller.component').then((c) => c.GetDetailSellerComponent)
      },
      {
        path: 'sellers/get-request',
        loadComponent: () => import('../app/src/features/seller/get-request-upgrade-seller/get-request-upgrade-seller.component').then((c) => c.GetRequestUpgradeSellerComponent)
      },
      {
        path: 'sellers/get-request/detail/:id',
        loadComponent: () => import('../app/src/features/seller/get-detail-request-upgrade/get-detail-request-upgrade.component').then((c) => c.GetDetailRequestUpgradeComponent)
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
