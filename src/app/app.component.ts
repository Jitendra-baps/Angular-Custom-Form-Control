import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomFormControlComponent } from './components/custom-form-control/custom-form-control.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CustomFormControlComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
[x: string]: any;
  title = 'customFormControl';
  constructor(private fb: FormBuilder) { }
  testForm: FormGroup = this.fb.group({
    firstName: ['test', Validators.required],
    lastName: ['test', Validators.required],
    email: ['test@gmail.com', Validators.required],
    password: ['test', Validators.required],
    hobby: ['test'],
  });
  formArray = signal([
    { fieldLabel: 'First Name', fieldName: 'firstName', isRequired: true },
    { fieldLabel: 'Last Name', fieldName: 'lastName', isRequired: true },
    { fieldLabel: 'Email', fieldName: 'email', isRequired: true },
    { fieldLabel: 'Password', fieldName: 'password', isRequired: true },
    { fieldLabel: 'Hobby', fieldName: 'hobby', isRequired: false },
  ]);

  ngOnInit() {
    console.log(this.testForm);
  }

  onSubmit(): void {
    if (this.testForm.valid) {
      console.log('Form Submitted', this.testForm.value);
    } else {
      this.testForm.markAllAsTouched(); // Show validation messages
    }
  }
}
