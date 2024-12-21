import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { EditOutline } from '@ant-design/icons-angular/icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DoctorService } from 'src/app/src/services/doctor.service';
import { SellerService } from 'src/app/src/services/seller.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-get-request-upgrade-seller',
  standalone: true,
  imports: [SharedModule, FormsModule, NgxDatatableModule, RouterLink],
  templateUrl: './get-request-upgrade-seller.component.html',
  styleUrl: './get-request-upgrade-seller.component.scss'
})
export class GetRequestUpgradeSellerComponent {
 data: any[] = [];
    iconServices=inject(IconService);
    // total:any;
    totalSeller:any;
  
    filter = {
      page: 1,
      limit: 100
      
    }
    private router=inject(Router)
    private route=inject(ActivatedRoute)
  
    private sellerServices=inject(SellerService)
    ngOnInit():void{
      this.iconServices.addIcon(...[
        EditOutline
      ])
      this.fetchPetPaginations();
      // this.getRequestDoctor();
    }
    // getRequestDoctor(){
    //   this.doctorServices.getAllRequestDoctor().subscribe({
    //     next:(res)=>{
    //       this.data=res.data;
    //       console.log(this.data);
          
    //     },
    //     error:(err)=>{
    //       console.log(err);
          
    //     }
    //   })
    // }
  
    public handlePageChange($event: any) {
      console.log($event.offset);
      this.filter.page = ($event.offset)+1;
      this.fetchPetPaginations();
    }
  
    private fetchPetPaginations() {
      this.sellerServices.getAllRequestSeller(this.filter)
        .subscribe(res => {
          this.data = res.data;
          this.totalSeller = res.data.length;
          console.log(res);
          
        }, err => {
          if (err.status == 403) {
            alert('Session is expired. please Login again')
            this.router.navigateByUrl('/login')
          }
        })
    }
    Approved(requestId:string){
      this.sellerServices.approveSeller(requestId).subscribe({
        next:(res)=>{
          if(res){
            alert("Duyệt quyền thành công")
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
