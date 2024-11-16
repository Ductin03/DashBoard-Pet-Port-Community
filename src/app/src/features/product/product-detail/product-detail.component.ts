import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/src/services/product.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private productService=inject(ProductService)
  private route=inject(ActivatedRoute)
  productId:string='';
  record:any='';
  ngOnInit(){
    this.productId=this.route.snapshot.paramMap.get("id");
    console.log(this.productId);
    
    this.getProductById();
  }
  getProductById(){
    this.productService.getProductById(this.productId).subscribe({
      next:(res)=>{
        console.log(res);
        this.record=res?.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
