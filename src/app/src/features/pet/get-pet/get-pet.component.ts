import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { EditOutline } from '@ant-design/icons-angular/icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PetService } from 'src/app/src/services/pet.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-get-pet',
  standalone: true,
  imports: [NgxDatatableModule,SharedModule,FormsModule,RouterLink],
  templateUrl: './get-pet.component.html',
  styleUrl: './get-pet.component.scss'
})
export class GetPetComponent {
  data: any[] = [];
  iconServices=inject(IconService);
  total:any;

  filter = {
    page: 1,
    limit: 5
    
  }
  private router=inject(Router)
  private route=inject(ActivatedRoute)

  private getPetServices=inject(PetService)
  ngOnInit():void{
    this.iconServices.addIcon(...[
      EditOutline
    ])
    this.fetchPetPaginations();
    this.getAllPet();
  }
  getAllPet(){
    this.getPetServices.getAllPets().subscribe({
      next:(res)=>{
        console.log(res);
        this.total=res.data.length
        console.log(this.total);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  public handleSearch() {
    this.filter.page = 0
    console.log("aa");
    
  }

  public handlePageChange($event: any) {
    console.log($event.offset);
    this.filter.page = ($event.offset)+1;
    this.fetchPetPaginations();
  }

  private fetchPetPaginations() {
    this.getPetServices.getPets(this.filter)
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

