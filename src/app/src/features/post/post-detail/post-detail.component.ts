import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/src/services/post.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {
  private postService=inject(PostService)
  private route=inject(ActivatedRoute)
  productId:string='';
  record:any;
  ngOnInit(){
    this.productId=this.route.snapshot.paramMap.get("id");
    this.getPostById();
  }
  getPostById(){
    this.postService.getPostById(this.productId).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.record=res.data;        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
