import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteSelectorComponent } from './route-selector/route-selector.component';
import { RouteViewerComponent } from './route-viewer/route-viewer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StopSelectorComponent } from './stop-selector/stop-selector.component';
import { ConfigService } from './config.service';

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
    HttpClientModule,
    MessageModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => {
        return configService.init();
      },
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
