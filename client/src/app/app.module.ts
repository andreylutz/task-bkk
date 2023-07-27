import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { RequestService } from './services/request.service';
import { ErrorService } from './services/error.service';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { MainComponent } from './components/main/main.component';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';

const appRoutes: Routes = [
  { path: '', component: FormComponent },
  { path: 'main', component: MainComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    GlobalErrorComponent,
    MainComponent,
    FieldErrorDisplayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RequestService, 
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
