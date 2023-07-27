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
    formSumitAttempt: boolean;
    comboboxData: any;

    isFieldValid(field: string) {
        return (
          (!this.form.get(field).valid && this.form.get(field).touched) ||
          (this.form.get(field).untouched && this.formSumitAttempt)
        );
      }
      
    ngOnInit(): void {
        this.svc.getComboxFields().subscribe(data => {
            this.comboboxData = data
        })

        this.form = this.formBuilder.group({
            fieldOne: [null, [Validators.required, myValidatorField]],
            fieldSelect: [null, Validators.required],
            fieldCheck: [null, [Validators.required, myValidatorCheckbox]],
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
 
// Функция валидации поля
function myValidatorField(formControl: FormControl) {

    if (formControl.value < 18 || formControl.value > 120) {
        return { myValidator: { message:'Необходимо число от 18 до 120' } }
    }

    return null
}

// Функция валидации checkbox
function myValidatorCheckbox(formControl: FormControl) {

    if (formControl.value === false) {
        return { myValidatorCheckbox: { message: 'Необходимо дать согласие на обработку данных' } }
    }

    return null
}