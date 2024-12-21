import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IconService } from '@ant-design/icons-angular';
import { EditOutline } from '@ant-design/icons-angular/icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DoctorService } from 'src/app/src/services/doctor.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-get-doctor',
  standalone: true,
  imports: [SharedModule, NgxDatatableModule, RouterLink],
  templateUrl: './get-doctor.component.html',
  styleUrl: './get-doctor.component.scss'
})
export class GetDoctorComponent {
  data: any[] = [];
    iconServices=inject(IconService);
    total:any;
    totalDoctor:any;
  
    filter = {
      page: 1,
      limit: 100
      
    }
    private router=inject(Router)
    private route=inject(ActivatedRoute)
  
    private doctorServices=inject(DoctorService)
    ngOnInit():void{
      this.iconServices.addIcon(...[
        EditOutline
      ])
      this.fetchPetPaginations();
      this.getToltalRequest();
      this.getTotalDoctor();
    }
    getToltalRequest(){
      this.doctorServices.getTotalRequestDoctor().subscribe({
        next:(res)=>{
          this.total=res.data.length
          console.log(this.total);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
    getTotalDoctor(){
      this.doctorServices.getTotalDoctor().subscribe({
        next:(res)=>{
          this.totalDoctor=res.data.length
          console.log(this.totalDoctor);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }
  
    public handlePageChange($event: any) {
      console.log($event.offset);
      this.filter.page = ($event.offset)+1;
      this.fetchPetPaginations();
    }
  
    private fetchPetPaginations() {
      this.doctorServices.getAllDoctor(this.filter)
        .subscribe(res => {
          this.data = res.data;
          console.log(res);
          
        }, err => {
          if (err.status == 403) {
            alert('Session is expired. please Login again')
            this.router.navigateByUrl('/login')
          }
        })
    }
  
}
