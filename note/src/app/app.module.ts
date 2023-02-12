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
    BrowserModule  
  ],
  providers: [], //services
  bootstrap: [AppComponent]//boot component
})
export class AppModule { }
