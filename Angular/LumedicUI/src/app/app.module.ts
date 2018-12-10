import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BarComponent } from './Components/bar/bar.component';
import { DonutComponent } from './Components/donut/donut.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    DonutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
