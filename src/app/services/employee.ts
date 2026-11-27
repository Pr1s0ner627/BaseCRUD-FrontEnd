
import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee/employee-module';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServices {

  private http = inject(HttpClient);
  private apiURL = `${environment.apiUrl}/Employee`;

  private employeeList = signal<Employee[]>([]);
  
  employees = this.employeeList.asReadonly();

  setEmployees(employees: Employee[]): void {
    this.employeeList.set(employees);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiURL}/GetAll`);
  }

  getEmployeeById(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiURL}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiURL}/${id}`, employee);
  }

  addEmployee(employee: Employee): boolean {
    if (this.employeeList().some(emp => emp.email === employee.email)) {
      return false;
    }
    this.employeeList.update(employees => [...employees, employee]);
    return true;
  }

  removeEmployee(id: number): void {
    this.employeeList.update(
      employees => employees.filter(emp => emp.id !== id)
    );
  }
}
