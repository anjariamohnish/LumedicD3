import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BarComponent } from './Components/bar/bar.component';
import { DonutComponent } from './Components/donut/donut.component';
import { Donut2Component } from './Components/donut2/donut2.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    DonutComponent,
    Donut2Component
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
