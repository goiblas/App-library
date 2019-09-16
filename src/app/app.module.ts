import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { environment } from '../environments/environment';

// forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BooksService } from './services/books.service';

@ NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ListComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // forms
    ReactiveFormsModule,
    FormsModule,
    // material
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
