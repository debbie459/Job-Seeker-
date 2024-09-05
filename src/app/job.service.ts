import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor() { }

  private jobUrl = 'assets/data.json';

  

  private http = inject(HttpClient);

  //to get the job values

  getJobs(): Observable<any[]>{
    return this.http.get<any[]>(this.jobUrl)
  }

  getJobByFilter(filter:string) : Observable<any[]>{
    return this.http.get<any[]>(this.jobUrl).pipe(
      map((filteredJobs)=> {
        return filteredJobs.filter(job =>{
          job.level.toLowercase() === filter.toLowerCase()
        })
      })
    )
  }






}
