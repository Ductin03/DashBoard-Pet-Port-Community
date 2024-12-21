import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/src/services/doctor.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
  data: any[] = [];;
  total:any;  
  userId:string;

  private router=inject(Router)
  private route=inject(ActivatedRoute)

  private inforUserServices = inject(DoctorService)
  ngOnInit():void{

    this.userId=this.route.snapshot.paramMap.get("id");
    console.log(this.userId);
    this.getInforUser();
    
  }
  getInforUser(){
    this.inforUserServices.getDoctorById(this.userId).subscribe({
      next:(res)=>{
        this.data=res.user
        console.log(res.user);
      },
      error:(err)=>{
        console.log(err);       
      }
    })
  }
  

  
}
