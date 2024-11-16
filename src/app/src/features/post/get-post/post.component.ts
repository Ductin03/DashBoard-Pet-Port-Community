import { Component, inject } from '@angular/core';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IconService } from '@ant-design/icons-angular';
import { EditOutline } from '@ant-design/icons-angular/icons';
import { PostService } from 'src/app/src/services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [SharedModule,FormsModule,RouterLink,NgxDatatableModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  data:any[]=[];
  total:any;
  private postService=inject(PostService)
  private iconServices=inject(IconService)
  private route=inject(Router)

  filter = {
    limit:2,
    page:1
  }
  ngOnInit():void{
    this.iconServices.addIcon(...[
      EditOutline
    ])
    this.fetchPostPanigations();
    this.getTotalPost()
    
  }
  getTotalPost(){
    this.postService.totalPost().subscribe({
      next:(res)=>{
        this.total=res.data     
      },
      error:(err)=>{
        console.log(err);    
      }
    })
  }
 
  public handlePageChange($event:any){
    console.log($event.offset);
    this.filter.page = ($event.offset)+1;
    this.fetchPostPanigations();
  }
  private fetchPostPanigations(){
    this.postService.getPostsPanigations(this.filter).subscribe({
      next:(res)=>{
        this.data=res.data
      },
      error:(err)=>{
        if (err.status == 403) {
          alert('Session is expired. please Login again')
          this.route.navigateByUrl('/login')
        }
      }
    })
  }

}
