import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ForksComponent } from './forks/forks.component'
import { ForksGroupComponent } from './forks-group/forks-group.component'

import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    ForksComponent,
    ForksGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
	MatExpansionModule,
 BrowserAnimationsModule // botao colapsavel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }