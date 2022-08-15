import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouteSelectorComponent } from './route-selector/route-selector.component';
import { StopSelectorComponent } from './stop-selector/stop-selector.component';

const routes: Routes = [
  { path: 'byRoute', component: RouteSelectorComponent },
  {
    path: 'byRoute/:routeId/:directionId/:placeCode',
    component: RouteSelectorComponent,
  },
  {
    path: 'byStopNumber',
    component: StopSelectorComponent,
  },
  {
    path: 'byStopNumber/:stopId',
    component: StopSelectorComponent,
  },
  { path: '', redirectTo: '/byRoute', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
