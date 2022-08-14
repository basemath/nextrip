import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteSelectorComponent } from './route-selector/route-selector.component';
import { RouteViewerComponent } from './route-viewer/route-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteSelectorComponent,
    RouteViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
