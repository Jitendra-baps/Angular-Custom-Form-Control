import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'input-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomFormControlComponent),
    },
  ],
  // host: {
  //   '(input)': 'changed($event.target.value)',
  //   '(blur)': 'touched()',
  // },
  styleUrl: './custom-form-control.component.scss',
})
export class CustomFormControlComponent implements ControlValueAccessor {
  // constructor() {}
  value = signal<string>('');
  changed: (value: string) => void = () => {};
  touched: () => void = () => {};
  isDisabled = signal<boolean>(false);
  fieldName = input<string>('');
  fieldLabel = input<string>('');
  isRequired = input<boolean>(false);
  parentFormGroup = input<FormGroup>();
  // get formField(): FormControl {
  //   return this.parentFormGroup()?.get(this.fieldName()) as FormControl;
  // }

  onChange(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.changed(value);
  }

  writeValue(value: string): void {
    console.log(value);
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    console.log(fn);
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    console.log(fn);
    this.touched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log(isDisabled);
    this.isDisabled.set(isDisabled);
  }
}
