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
  isSearching: boolean = false;
  filter = {
    limit: 5,
    page: 1,
    name: ''
    
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
    if(this.isSearching){
      return;
    }
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


  searchProduct() { 
    if (this.filter.name.trim() === '') { 
      // Reset tìm kiếm nếu `name` trống
      this.isSearching = false; 
      this.filter.page = 1; 
      this.filter.limit = 5; 
      this.fetchProductPaginations();
      this.getAllProduct();
      return;
    }
    this.isSearching = true; 
    this.getProductServices.searchProduct({ name: this.filter.name }).subscribe
    ({ 
      next: (res) => { 
        this.data = res.data; 
        this.total = res.data.length
        this.filter.limit=10000000
        console.log(this.data); 
      }, 
      error: (err) => {
         console.log(err); 
        },
     complete: () => {
       this.isSearching = false;
       } }); 
    
      }
  
  public handlePageChange($event: any) {
    console.log($event.offset);
    this.filter.page = ($event.offset)+1;
    this.fetchProductPaginations();
  }

  private fetchProductPaginations() {
    if (this.isSearching) { return;  }
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
