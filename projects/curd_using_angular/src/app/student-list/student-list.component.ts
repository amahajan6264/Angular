import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Student } from '../student';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  message: String = ``;
  dtTrigger: Subject<any> = new Subject();
  public students: any[] = [];
  deleteFlag: boolean = false;
  constructor(private studentservice: StudentService) { }
  isupdated: boolean = false;
  student: Student = new Student();

  ngOnInit(): void {
    this.studentservice.getStudentList().subscribe(data => {
      this.students = data;
      //this.dtTrigger.next(this.students);
    });

  }

  trackById(index: number, students: any): any {
    return students.id;
  }

  updateStudent(id: number) {
    this.studentservice.getStudent(id)
      .subscribe(
        data => {
          this.student = data
          alert(JSON.stringify(this.student.studentAddress));
          
        });

  }

  updateStu(updstu: any) {

  }
  studentupdateform = new FormGroup({
    student_id: new FormControl(),
    student_name: new FormControl(),
    student_email: new FormControl(),
    student_branch: new FormControl()
  });

  deleteStudent(delstu: number) {
    if (confirm("You want to delete the student")) {
      this.message = delstu + " : Student is deleted successfully";
      this.studentservice.deleteStudent(delstu)
        .subscribe(
          data => {
            this.deleteFlag = true;
            this.studentservice.getStudentList().subscribe(data => {
              this.students = data
            })
          });

    } else {
      this.deleteFlag = true;
      this.message = delstu + " : Student is deletion is canceled";
    }
    setTimeout(() => {
      this.deleteFlag = false;
    }, 3000);
  }



}
