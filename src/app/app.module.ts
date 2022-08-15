import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteSelectorComponent } from './route-selector/route-selector.component';
import { RouteViewerComponent } from './route-viewer/route-viewer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StopSelectorComponent } from './stop-selector/stop-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteSelectorComponent,
    RouteViewerComponent,
    PageNotFoundComponent,
    StopSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
