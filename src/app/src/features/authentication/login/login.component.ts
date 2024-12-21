// angular import
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { error } from 'console';
import { AuthService } from 'src/app/src/services/auth.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  email:string='';
  password:string='';
  private route=inject(Router)
  constructor(private authService:AuthService){
    this.authService.state$.subscribe(state=>{
      if(state.isAuthenticated){
        this.route.navigateByUrl("admin/dashboard")
      }
    })
  }
  login(){
    this.authService.login(this.email,this.password).subscribe(
      {
        next:(res)=>{
          Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công',
            text: 'Chào mừng bạn trở lại!',
            showConfirmButton: true,
            confirmButtonText: 'OK',
          });
          this.route.navigateByUrl("admin/dashboard")
          console.log("Login Success");
          
        },
        error:(err)=>{
          if (err.status == 401) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi đăng nhập',
          text: 'Tài khoản hoặc mật khẩu không hợp lệ!',
          showConfirmButton: true,
          confirmButtonText: 'Thử lại',
        });
      }
      if (err.status == 400) {
        Swal.fire({
          icon: 'warning',
          title: 'Sai thông tin',
          text: 'Vui lòng nhập vào email.',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        });
      }
      if (err.status == 500) {
        Swal.fire({
          icon: 'warning',
          title: 'Sai thông tin',
          text: 'Tài khoản hoặc mật khẩu không hợp lệ',
          showConfirmButton: true,
          confirmButtonText: 'OK',
        });
      }
          console.log(err);
          
        }
      }
    )
  }
}
