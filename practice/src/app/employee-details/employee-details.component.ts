import { Component, OnInit } from '@angular/core';
import { candidate_data } from '../_shared/candidates';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  candidates = candidate_data;
  candidateId: any;
  objectKeys = Object.keys;
  candidateDetails: {
    id: number;
    name: string;
    department: string;
    joining_date: string;
  }[];

  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.candidateId = param.id;
      if (this.candidateId) {
        this.candidateDetails = this.candidates.filter(
          (candidate) => candidate.id == this.candidateId
        );
        console.log('candidateDetails --->>', this.candidateDetails);
      }
    });
  }
}
