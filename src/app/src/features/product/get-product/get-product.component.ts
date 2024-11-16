import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { EditOutline } from '@ant-design/icons-angular/icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { error, log } from 'console';
import { ProductService } from 'src/app/src/services/product.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-get-product',
  standalone: true,
  imports: [NgxDatatableModule,SharedModule,FormsModule,RouterLink],
  templateUrl: './get-product.component.html',
  styleUrl: './get-product.component.scss'
})
export class GetProductComponent {
  data: any[] = [];
  iconServices=inject(IconService);
  total:any;

  filter = {
    limit: 5,
    skip: 1
    
  }
  private router=inject(Router)
  private route=inject(ActivatedRoute)

  private getProductServices=inject(ProductService)
  ngOnInit():void{
    this.iconServices.addIcon(...[
      EditOutline
    ])
    this.fetchProductPaginations();
    this.getAllProduct();
  }
  getAllProduct(){
    this.getProductServices.getAllProduct().subscribe({
      next:(res)=>{
        this.total=res.data.length
        console.log(res.data);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  public handlePageChange($event: any) {
    console.log($event.offset);
    this.filter.skip = ($event.offset)+1;
    this.fetchProductPaginations();
  }

  private fetchProductPaginations() {
    this.getProductServices.getProduct(this.filter)
      .subscribe(res => {
        this.data = res.data;
      }, err => {
        if (err.status == 403) {
          alert('Session is expired. please Login again')
          this.router.navigateByUrl('/login')
        }
      })
  }

}
