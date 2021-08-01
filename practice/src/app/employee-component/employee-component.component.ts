import { Component, OnInit } from '@angular/core';
import { candidate_data } from '../_shared/candidates';
@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.css'],
})
export class EmployeeComponentComponent implements OnInit {
  candidates = candidate_data;
  filterValue: Array<any> = [];
  order: boolean = false;
  order1: boolean = false;
  field: string = null;
  distictValues: {};
  objectKeys = Object.keys;
  todayString: string = new Date().toDateString();
  formatDate: string;
  constructor() {
    this.filterValue = this.candidates;
  }

  ngOnInit(): void {}

  filterByText(initial: string) {
    this.candidates = this.filterValue;
    this.candidates = this.candidates.filter(
      (i) => i.name.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1
      //||
      // i.department.toLowerCase().indexOf(initial.toLocaleLowerCase()) !==
      //   -1 ||
      // i.joining_date.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1
    );
    console.log(this.candidates);
  }

  sortData(field) {
    if (field != null) {
      if (this.order) {
        this.candidates = this.candidates.sort((i, j) =>
          j[field] > i[field] ? -1 : 1
        );
      } else {
        this.candidates = this.candidates.sort((i, j) =>
          j[field] > i[field] ? 1 : -1
        );
      }

      this.order = !this.order;
    }
  }

  sortJoingDate() {
    if (this.order1) {
      var resultArray = [];
      this.candidates.map((candidate) => {
        var arr1 = candidate.joining_date.split('/');
        var splitDate = arr1[1] + '/' + arr1[0] + '/' + arr1[2];
        candidate.joining_date = splitDate;
        resultArray.push(candidate);
      });

      this.candidates = resultArray;

      this.candidates = this.candidates.sort((i, j) => {
        const aDate = new Date(i.joining_date);
        const bDate = new Date(j.joining_date);

        return bDate.getTime() < aDate.getTime() ? -1 : 1;
      });
    } else {
      this.candidates = this.candidates.sort((i, j) => {
        const aDate = new Date(i.joining_date);
        const bDate = new Date(j.joining_date);

        return bDate.getTime() < aDate.getTime() ? 1 : -1;
      });
    }

    this.order = !this.order;
  }

  removeCandidateFromDevelopment() {
    const filteredarray = this.candidates.filter(
      (candidate) => candidate.department !== 'Development'
    );
    this.candidates = filteredarray;
  }

  getDistinctValues() {
    var result = this.candidates.reduce(
      (accumulator, value) => (
        (accumulator[value.department] =
          (accumulator[value.department] || 0) + 1),
        accumulator
      ),
      {}
    );
    this.distictValues = result;
  }

  getTwoYearExperienceCandidate() {
    var resultArray = [];
    this.candidates.map((candidate) => {
      var arr1 = candidate.joining_date.split('/');
      var splitDate = arr1[1] + '/' + arr1[0] + '/' + arr1[2];
      var date1 = new Date(splitDate);
      var date2 = new Date();

      // To calculate the time difference of two dates
      var Difference_In_Time = date2.getTime() - date1.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      var Years = Math.floor(Difference_In_Days / 365.25);
      if (Years > 2) {
        resultArray.push(candidate);
      }
    });
    this.candidates = resultArray;
  }
}
