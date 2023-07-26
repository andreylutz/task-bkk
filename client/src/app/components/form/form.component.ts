import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { RequestService } from 'src/app/request.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit {
    constructor(private svc: RequestService) {}
    
    numberControl: FormControl;
    comboboxData: any;


    ngOnInit() {
         this.svc.getComboxFields().subscribe(data => {
            this.comboboxData = data
         })
         this.numberControl = new FormControl('18', [ Validators.required, myValidator ]);
         this.numberControl.valueChanges
         .pipe(
            debounceTime(1000)
         )
         .subscribe((value) => console.log(value))
         this.numberControl.statusChanges.subscribe((status) => {
            console.log(this.numberControl.errors);
            console.log(status);
         })
    }
}
 
// Функция валидации
function myValidator(formControl: FormControl) {

    if (formControl.value.length < 18 || formControl.value.length > 120) {
        return { myValidator: { message: 'Неправельный диапозон' } }
    }

    return null
}