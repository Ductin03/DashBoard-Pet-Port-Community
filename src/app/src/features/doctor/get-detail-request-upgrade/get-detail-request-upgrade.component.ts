import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/src/services/doctor.service';

@Component({
  selector: 'app-get-detail-request-upgrade',
  standalone: true,
  imports: [],
  templateUrl: './get-detail-request-upgrade.component.html',
  styleUrl: './get-detail-request-upgrade.component.scss'
})
export class GetDetailRequestUpgradeComponent {
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
