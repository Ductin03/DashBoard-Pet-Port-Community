import { Component, inject } from '@angular/core';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IconService } from '@ant-design/icons-angular';
import { EditOutline } from '@ant-design/icons-angular/icons';
import { PostService } from 'src/app/src/services/post.service';
import { title } from 'process';

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
  isSearching: boolean = false;
  private postService=inject(PostService)
  private iconServices=inject(IconService)
  private route=inject(Router)

  filter = {
    limit:5,
    page:1,
    title:''
  }
  ngOnInit():void{
    this.iconServices.addIcon(...[
      EditOutline
    ])
    this.fetchPostPanigations();
    this.getTotalPost()
    
  }
  getTotalPost(){
    if(this.isSearching){
      return;
    }
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
    if (this.isSearching) { return;  }
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
  searchPost() { 
    if (this.filter.title.trim() === '') { 
      // Reset tìm kiếm nếu `name` trống
      this.isSearching = false; 
      this.filter.page = 1; 
      this.filter.limit = 5; 
      this.fetchPostPanigations();
      this.getTotalPost();
      return;
    }
    this.isSearching = true; 
    this.postService.searchPost({ title: this.filter.title }).subscribe
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
  

}
