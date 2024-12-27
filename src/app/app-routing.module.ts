// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { AuthGuard } from './src/features/guard/guards/auth.guard';

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
        loadComponent: () => import('../app/src/features/default/dashboard/dashboard.component').then((c) => c.DefaultComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },
      {
        path: 'posts',
        loadComponent: () => import('../app/src/features/post/get-post/post.component').then((c)=>c.PostComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },
      {
        path: 'posts/detail/:id',
        loadComponent: () => import('../app/src/features/post/post-detail/post-detail.component').then((c)=>c.PostDetailComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },
      {
        path: 'doctors',
        loadComponent: () => import('../app/src/features/doctor/get-doctor/get-doctor.component').then((c) => c.GetDoctorComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },
      {
        path: 'doctors/detail/:id',
        loadComponent: () => import('../app/src/features/doctor/get-detail-doctor/get-detail-doctor.component').then((c) => c.GetDetailDoctorComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },
      {
        path: 'doctors/get-request',
        loadComponent: () => import('../app/src/features/doctor/get-request-upgrade-doctor/get-request-upgrade-doctor.component').then((c) => c.GetRequestUpgradeDoctorComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },
      {
        path: 'doctors/get-request/detail/:id',
        loadComponent: () => import('../app/src/features/doctor/get-detail-request-upgrade/get-detail-request-upgrade.component').then((c) => c.GetDetailRequestUpgradeComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },
      {
        path: 'sellers',
        loadComponent: () => import('../app/src/features/seller/get-seller/get-seller.component').then((c) => c.GetSellerComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },
      {
        path: 'sellers/detail/:id',
        loadComponent: () => import('../app/src/features/seller/get-detail-seller/get-detail-seller.component').then((c) => c.GetDetailSellerComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },
      {
        path: 'sellers/get-request',
        loadComponent: () => import('../app/src/features/seller/get-request-upgrade-seller/get-request-upgrade-seller.component').then((c) => c.GetRequestUpgradeSellerComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },
      {
        path: 'sellers/get-request/detail/:id',
        loadComponent: () => import('../app/src/features/seller/get-detail-request-upgrade/get-detail-request-upgrade.component').then((c) => c.GetDetailRequestUpgradeComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },  
      {
        path: 'user/view/:id',
        loadComponent: () => import('../app/src/features/user/view-user/view-user.component').then((c) => c.ViewUserComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },  
      {
        path: 'user/edit/:id',
        loadComponent: () => import('../app/src/features/user/edit-user/edit-user.component').then((c) => c.EditUserComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },  
      {
        path: 'pet-owner',
        loadComponent: () => import('../app/src/features/user/get-petowner/get-petowner.component').then((c) => c.GetPetownerComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
      },  
      {
        path: 'pet-owner/detail/:id',
        loadComponent: () => import('../app/src/features/user/detail-pet-owner/detail-pet-owner.component').then((c) => c.DetailPetOwnerComponent),
        canActivate: [AuthGuard], 
        data: { role: 'Admin' } // Chỉ cho phép admin truy cập
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
