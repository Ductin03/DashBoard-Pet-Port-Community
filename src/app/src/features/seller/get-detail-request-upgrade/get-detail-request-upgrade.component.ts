import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from 'src/app/src/services/seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-detail-request-upgrade',
  standalone: true,
  imports: [],
  templateUrl: './get-detail-request-upgrade.component.html',
  styleUrl: './get-detail-request-upgrade.component.scss'
})
export class GetDetailRequestUpgradeComponent {
sellerId:string='';
  record:any;
  private GetSellerByIdService=inject(SellerService)
  private route=inject(ActivatedRoute)
  ngOnInit(){
    this.sellerId=this.route.snapshot.paramMap.get("id")
    this.getSellerById();
  }
  getSellerById(){
    this.GetSellerByIdService.getSellerById(this.sellerId).subscribe({
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
      this.GetSellerByIdService.approveSeller(requestId).subscribe({
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
