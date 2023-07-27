import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { RequestService } from 'src/app/services/request.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit {
    constructor(private svc: RequestService, public router: Router, private formBuilder: FormBuilder) {}

    form: FormGroup;
    private formSumitAttempt: boolean;
    comboboxData: any;

    isFieldValid(field: string) {
        return (
          (!this.form.get(field).valid && this.form.get(field).touched) ||
          (this.form.get(field).untouched && this.formSumitAttempt)
        );
      }
      
      displayFieldCss(field: string) {
        return {
          'has-error': this.isFieldValid(field),
          'has-feedback': this.isFieldValid(field)
        };
      }
    
    get fieldOne() {
        return this.form.controls.fieldOne as FormControl   
    }

    get fieldSelect() {
        return this.form.controls.fieldSelect as FormControl   
    } 

    get fieldCheck() {
        return this.form.controls.fieldCheck as FormControl   
    } 
    
    ngOnInit(): void {
        this.svc.getComboxFields().subscribe(data => {
            this.comboboxData = data
        })

        this.form = this.formBuilder.group({
            fieldOne: [null, [Validators.required, myValidator]],
            fieldSelect: [null, [Validators.required]],
            fieldCheck: [null, [Validators.required]],
          });
    }

    handleSubmit() {
        this.formSumitAttempt = true;
        if(this.form.valid) {
            this.router.navigate(['/main']);
            console.log(this.form.value)
        }
    }

    reset() {
        this.form.reset();
        this.formSumitAttempt = false;
      }
}
 
// Функция валидации
function myValidator(formControl: FormControl) {

    if (formControl.value < 18 || formControl.value > 120) {
        return { myValidator: { message: 'Неправельный диапозон' } }
    }

    return null
}