import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/src/services/doctor.service';
import { UserService } from 'src/app/src/services/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, SharedModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  full_name: string = '';
  address: string = '';
  avatar_url: string = '';
  date_of_birth: string = '';
  email: string = '';
  gender: string = '';
  phone: string = '';
  username: string = '';
  userId:any;

  private editAdmin = inject(DoctorService);
  private edit = inject(UserService)
  private route = inject(ActivatedRoute)
  ngOnInit(){
    
    this.userId=this.route.snapshot.paramMap.get('id');
    this.getUserById();
  }
  getUserById(){
    this.editAdmin.getDoctorById(this.userId).subscribe({
      next: (res) => {
        console.log(res);
        this.full_name = res.user.full_name;
        this.address = res.user.address;
        this.avatar_url = res.user.avatar_url;
        this.date_of_birth = res.user.date_of_birth;
        this.email = res.user.email;
        this.gender = res.user.gender;
        this.phone = res.user.phone;
        this.username = res.user.username;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  onSubmit(){
    const body={
      full_name:this.full_name,
      address : this.address,
      date_of_birth : this.date_of_birth,
      email : this.email,
      gender : this.gender,
      phone : this.phone
    };
    
    console.log(body);
    this.edit.editAdmin(this.userId,body).subscribe({
      next:(res)=>{
        
        alert("Edit Success");
        this.getUserById();
      },
      error:(err)=>{
        console.log(err);      
      }
    })
  
  }
}
