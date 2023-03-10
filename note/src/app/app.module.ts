import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditAreaComponent } from './editarea/editarea.component';

@NgModule({
  declarations: [
    AppComponent,
    EditAreaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule  
  ],
  providers: [], //services
  bootstrap: [AppComponent]//boot component
})
export class AppModule { }
