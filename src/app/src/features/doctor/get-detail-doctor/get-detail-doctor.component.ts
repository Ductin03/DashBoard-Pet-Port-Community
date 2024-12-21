import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/src/services/doctor.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-get-detail-doctor',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './get-detail-doctor.component.html',
  styleUrl: './get-detail-doctor.component.scss'
})
export class GetDetailDoctorComponent {
  doctorId:string='';
  record:any;
  private GetDocterByIdService=inject(DoctorService)
  private route=inject(ActivatedRoute)
  ngOnInit(){
    this.doctorId=this.route.snapshot.paramMap.get("id")
    this.getDoctorById();
  }
  getDoctorById(){
    this.GetDocterByIdService.getDoctorById(this.doctorId).subscribe({
      next:(res)=>{
        this.record=res.user
        console.log(this.record);
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
