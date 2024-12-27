import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/src/services/doctor.service';
import Swal from 'sweetalert2';

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
  Approved(requestId:string){
        this.GetDocterByIdService.approveDoctor(requestId).subscribe({
          next:(res)=>{
            if(res){
             Swal.fire({
                                     icon: 'success',
                                     title: 'Duyệt thành công',
                                     showConfirmButton: true,
                                     confirmButtonText: 'OK',
                                   });
            }
          },
          error:(err)=>{
            if(err.status==500){
              alert("Quyền đã được duyệt hoặc yêu cầu không hợp lệ")
            }
            
          }
        })
      }
}
