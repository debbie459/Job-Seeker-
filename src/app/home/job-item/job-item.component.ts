import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [],
  templateUrl: './job-item.component.html',
  styleUrl: './job-item.component.css'
})
export class JobItemComponent{

  @Input() job : any //event(job) gets emitted from heor component template. 
  
  
}
