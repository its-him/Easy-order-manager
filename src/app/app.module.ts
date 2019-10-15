import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


// Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NgxFileHelpersModule } from 'ngx-file-helpers';

// COMPONENTS
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CuisineComponent } from './cuisine/cuisine.component';
import { DishComponent } from './dish/dish.component';
import { CuisineAddComponent } from './cuisine-add/cuisine-add.component';
import { DishAddComponent } from './dish-add/dish-add.component';
import { CuisineBoxComponent } from './cuisine-box/cuisine-box.component';
import { DishBoxComponent } from './dish-box/dish-box.component';
import { OrderComponent } from './order/order.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    CuisineComponent,
    DishComponent,
    CuisineAddComponent,
    DishAddComponent,
    CuisineBoxComponent,
    DishBoxComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firsbaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileHelpersModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
