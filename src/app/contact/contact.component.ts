import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  datas: any = [];
  isTable: number = 0;
  empForm = this.formBuilder.group({
    first_name: '',
    last_name: '',
    emailId: '',
    age: '',
    gender: '',
    mobile: '',
    pan_no: '',
    adhaar_no: ''
  });
  currentId: number | null = null; // To store the current record ID

  private URL = `https://65c0cfa6dc74300bce8cc64d.mockapi.io/Contact/profile`

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getdata()
  }

  getdata() {
    this.http.get(`${this.URL}`).subscribe(res => {
      console.log(res, 'res');
      this.datas = res;
    })
  }

  onSubmit() {
    this.http.post(`${this.URL}`, this.empForm.value).subscribe(res => {
      this.isTable = 0;
      this.getdata()
    })
  }

  editEmp(id: number) {
    this.isTable = 2;
    this.currentId = id;
    this.http.get(`${this.URL}/${id}`).subscribe(res => {
      this.empForm.patchValue(res)
    });
  }

  onUpdate() {
    if (this.currentId) {
      this.http.put(`${this.URL}/${this.currentId}`, this.empForm.value).subscribe(res => {
        console.log('Update successful', res);
        this.isTable = 0;
        this.getdata()
      });
    }
  }

  deleteEmp(id: number) {
    this.http.delete(`${this.URL}/${id}`).subscribe(res => {
      this.getdata();
    })
  }
}
