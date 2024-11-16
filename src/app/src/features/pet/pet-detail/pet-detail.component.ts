import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from 'src/app/src/services/pet.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.scss'
})
export class PetDetailComponent {
  petId:string='';
  record:any;
  private GetPetByIdService=inject(PetService)
  private route=inject(ActivatedRoute)
  ngOnInit(){
    this.petId=this.route.snapshot.paramMap.get("id")
    this.getPetById();
  }
  getPetById(){
    this.GetPetByIdService.getPetById(this.petId).subscribe({
      next:(res)=>{
        this.record=res.data
        console.log(this.record);
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
 
}
