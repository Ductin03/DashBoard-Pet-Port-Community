import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { EditOutline } from '@ant-design/icons-angular/icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/src/services/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-get-petowner',
  standalone: true,
  imports: [NgxDatatableModule,SharedModule,FormsModule,RouterLink],
  templateUrl: './get-petowner.component.html',
  styleUrl: './get-petowner.component.scss'
})
export class GetPetownerComponent {
 data: any[] = [];
 
  total:any;  
  isSearching: boolean = false;
  filter = {
    limit: 1000000,
    page: 1
  }
  iconServices=inject(IconService);
  private router=inject(Router)
  private route=inject(ActivatedRoute)

  private getPetOwnerService=inject(UserService)
  ngOnInit():void{ this.iconServices.addIcon(...[
        EditOutline
      ])
    this.getAllProduct();
  }
  getAllProduct(){
    this.getPetOwnerService.getAllPetowner().subscribe({
      next:(res)=>{
        this.total=res.length
        this.data = res
        console.log(res);
      },
      error:(err)=>{
        console.log(err);       
      }
    })
  }
}
