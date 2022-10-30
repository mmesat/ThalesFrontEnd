import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { employeesDTO } from './employee/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  private apiURL = environment.apiURL;
  public getAll(): Observable<any>{
    return this.http.get<employeesDTO[]>(environment.apiURL+"/employee",{observe: 'response'})
  }

  
  public getId(id: number){
    return this.http.get<employeesDTO[]>(`${this.apiURL}/${id}`,{observe: 'response'})
  }
}
