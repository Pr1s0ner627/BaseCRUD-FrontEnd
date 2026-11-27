import { OnInit, Component, computed, signal, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, TitleCasePipe, NgIf } from '@angular/common';

import { Employee } from '../../models/employee/employee-module';
import { EmployeeServices } from '../../services/employee';


@Component({
  imports: [FormsModule, CurrencyPipe, TitleCasePipe, NgIf],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})

export class Dashboard {

    searchText = signal('');
    employeeCount = computed(() => this.EmpList().length);
    private employeeServices = inject(EmployeeServices); //Which Object it creates?
    EmpList = this.employeeServices.employees;
    filteredEmployees = computed(() => this.EmpList().filter(emp => emp.name.toLowerCase().includes(this.searchText().toLowerCase())));
    editingEmployeeId: number | null = null;

    newEmployee: Employee = {
    "id": 0,
    "name": "",
    "email": "",
    "designation": "",
    "managerId": null,
    "salary": 0,
    "isActive": true,
    "departmentId": 1,
  };
  formMessage: string = '';

  ngOnInit(): void {
    this.employeeServices.getEmployees().subscribe({
      next: (employees) => {
        this.employeeServices.setEmployees(employees);
        console.log("Employees Loaded");
      },
      error: (error) => {
        console.error("Failed to load: ", error);
      }
    });
  }

  addEmployee(): void {
    if (!this.newEmployee.name.trim() || !this.newEmployee.designation.trim()) {
      this.formMessage = 'Please fill in all fields correctly.';
      return;
    }
    const added = this.employeeServices.addEmployee(this.newEmployee);
    if (!added) {
      this.formMessage = 'Employee Already Exists';
      return;
    }
    else {
      this.newEmployee = { id: 0, name: '', designation: '', salary: 0, isActive: true, email: '', managerId: 0, departmentId: 0 };
      this.formMessage = 'Employee added successfully.';
      return;
    }
  }

  removeEmployee(id: number): void {
    this.employeeServices.removeEmployee(id);
  }

  editEmployee(id: number): void {
    this.employeeServices.getEmployees().subscribe({
      next: employees => {
        const employee = employees.find(employee => employee.id === id);
        if (employee) {
          this.newEmployee = { ...employee };
          this.editingEmployeeId = id;
          console.log("Loaded employee: ", employee);
        } }, error: error => {
          console.error("Failed to load", error); }       
    });
  } 

  saveEmployee(): void {
    if(this.editingEmployeeId === null)
      return;

    const id = this.editingEmployeeId;
    this.employeeServices.updateEmployee(id, this.newEmployee).subscribe({
      next: () => {
        this.employeeServices.getEmployees().subscribe({
          next: employees => {
            this.employeeServices.setEmployees(employees);
            this.cancelEdit();
            console.log("Employee Updated");
          },
          error: error => console.error("Failed to update", error)
        });
      }
    })
  }

  cancelEdit(): void {
    this.editingEmployeeId = null;

    this.newEmployee = {
    "id": 0,
    "name": "",
    "email": "",
    "designation": "",
    "managerId": null,
    "salary": 0,
    "isActive": true,
    "departmentId": 1,
  };
  }
  constructor() {
    effect(() => { console.log('Total Employees:', this.employeeCount()); });
 }
}

//Delay, Rebounds, Retry with best practices

