import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { CardComponent } from './card/card.component';
import { AppComponent } from './app.component';
import { CompareComponent } from './compare/compare.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'card', component:CardComponent},
  {path:'chart', component:BarChartComponent},
  {path:'compare', component:CompareComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'**', component:RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
