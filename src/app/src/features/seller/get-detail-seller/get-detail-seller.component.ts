import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from 'src/app/src/services/seller.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-get-detail-seller',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './get-detail-seller.component.html',
  styleUrl: './get-detail-seller.component.scss'
})
export class GetDetailSellerComponent {
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
}
