import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShoppingService } from './services/shopping.service';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PublicRecipesService} from './services/public-recipes.service';
import {HttpClientModule} from '@angular/common/http';
import {DashboardModule} from './dashboard/dashboard.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule,
    AuthModule,
    SharedModule
  ],
  providers: [ShoppingService, PublicRecipesService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
