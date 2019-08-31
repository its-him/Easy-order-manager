import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CuisineAddComponent } from './cuisine-add/cuisine-add.component';
import { DishAddComponent } from './dish-add/dish-add.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'cuisine/:id', component: CuisineAddComponent },
  { path: 'dish', component: DishAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
