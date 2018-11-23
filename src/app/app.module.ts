import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { APP_ROUTING } from "./app.routes";

import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GalleryComponent } from './components/home/gallery.component';
import { NoImagePipe } from './pipes/no-image.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { SecureDomPipe } from './pipes/secure-dom.pipe';
import { ErrorsComponent } from './components/errors/errors.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    DetailsComponent,
    NavbarComponent,
    GalleryComponent,
    NoImagePipe,
    LoadingComponent,
    SecureDomPipe,
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
