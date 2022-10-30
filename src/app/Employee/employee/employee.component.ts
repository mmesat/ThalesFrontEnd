import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import Swal from 'sweetalert2';
import {EmployeeService} from '../employee.service'
import { employeesDTO } from './employees';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  constructor(private service: EmployeeService, private formbuilder: FormBuilder) { }
  form: FormGroup;
  @ViewChild('table')
  table: MatTable<any>
  employees: employeesDTO[];
  displayedColumns = ['Name','Salary','Age'];
  
  @Output()
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      Id: [
        '1'
      ]

    })
    this.getall();
  }

  getall(){
    this.service.getAll().subscribe((responses: HttpResponse<employeesDTO[]>) => {
      this.employees = responses.body;
      if (this.employees == null){
        Swal.fire(
          'An error has ocurred',
          'report to an admin',
          'error'
        )
      }
      console.log(this.employees)
  },error=> console.error(error));
  }

  OnSubmit(){
    if (this.form.value.Id != ""){
      this.getId(this.form.value.Id);
    }
    else{
      this.getall();
    }
    
  }

  getId(Id: number){
    this.service.getId(Id).subscribe((responses: HttpResponse<employeesDTO[]>) => {
      
      this.employees = responses.body;
      if (this.employees == null){
        Swal.fire(
          'An error has ocurred',
          'Not found',
          'warning'
        )
      }
      
  },error=> console.error(error));
  }
}
