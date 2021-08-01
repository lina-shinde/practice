import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponentComponent } from './employee-component/employee-component.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
const routes: Routes = [
  { path: '', redirectTo: 'employeesList', pathMatch: 'full' },
  { path: 'employeesList', component: EmployeeComponentComponent },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
