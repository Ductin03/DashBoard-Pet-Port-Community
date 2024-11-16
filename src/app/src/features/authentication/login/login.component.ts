// angular import
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { error } from 'console';
import { AuthService } from 'src/app/src/services/auth.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

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
          console.log("Login Success");
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    )
  }
}
