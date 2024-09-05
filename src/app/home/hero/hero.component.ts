import { Component, inject } from '@angular/core';
import { JobService } from '../../job.service';
import { CommonModule } from '@angular/common';
import { JobItemComponent } from "../job-item/job-item.component";



@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  private jobService = inject(JobService);
  availableJobs : any[] = []
  filteredJobs : any[] = []
  uniqueLanguages: string[] = [];
  uniqueLevels : string[] = []
  uniqueRoles : string[] = []


  constructor(){
    this.jobService.getJobs().subscribe({
      next: (data) =>{
        console.log(data)
        this.availableJobs = data
        this.filteredJobs = this.availableJobs
        this.extractUniqueLanguages();
        this.extractUniqueLevels();
        this.extractUniqueRoles();
      }, 
      error: (errorMessage) =>{
        console.error(`Data was not fetched. This is the error message: ${errorMessage}`)
      }
    })
  }

  // Method to extract unique languages from all available jobs
  extractUniqueLanguages() {
    const allLanguages = this.availableJobs.flatMap(job => job.languages); // Get all languages
    this.uniqueLanguages = Array.from(new Set(allLanguages)); // Remove duplicates using Set
    console.log(this.uniqueLanguages); // Check the unique list in the console
  }

  extractUniqueLevels(){
    const allLevels = this.availableJobs.map(job => job.level);
    this.uniqueLevels = Array.from(new Set(allLevels))
    console.log(this.uniqueLevels)
  }

  extractUniqueRoles(){
    const allRoles = this.availableJobs.map(job => job.role);
    this.uniqueRoles = Array.from(new Set(allRoles))
    console.log(this.uniqueRoles)
  }

  getFilteredJobs(event : string | Event){
    console.log("You are trying to get the filtered jobs!")

    if (typeof event === 'string' && event === 'all'){
      console.log("ALL jobs: ")
      console.log(this.availableJobs)
      this.filteredJobs = this.availableJobs
    }

    else{
      const selectedElement = (event as Event).target as HTMLSelectElement
      const selectedValue = selectedElement.value;

      this.filteredJobs = this.availableJobs.filter(job => job.languages.some((language : string) => language.toLowerCase() === selectedValue.toLowerCase() )  || job.role.toLowerCase() === selectedValue.toLowerCase() || job.level.toLowerCase() === selectedValue.toLowerCase())

      console.log(this.filteredJobs)
    }
  }

  
  
  
}
