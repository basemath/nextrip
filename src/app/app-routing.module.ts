import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NexTripPageComponent } from './nex-trip-page/nex-trip-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * This is admittedly **not** the way to set up routing in Angular,
 * using the same component for all these features. But it gets
 * it working tonight :) :) :)
 */
const routes: Routes = [
  { path: 'byRoute', component: NexTripPageComponent },
  { path: 'byRoute/:routeId', component: NexTripPageComponent },
  { path: 'byRoute/:routeId/:directionId', component: NexTripPageComponent },
  {
    path: 'byRoute/:routeId/:directionId/:placeCode',
    component: NexTripPageComponent,
  },
  {
    path: 'byStopNumber',
    component: NexTripPageComponent,
  },
  {
    path: 'byStopNumber/:stopId',
    component: NexTripPageComponent,
  },
  { path: '', redirectTo: '/byRoute', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
