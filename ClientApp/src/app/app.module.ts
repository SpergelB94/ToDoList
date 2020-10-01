import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material-module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './configmdialog/confirmdialog.component';
import { ToDoAddComponent } from './todoadd/todoadd.component';
import { IgenNemPipe } from './pipes';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ConfirmDialogComponent,
    ToDoAddComponent,
    IgenNemPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
     
    ]),
    BrowserAnimationsModule
  ],
  exports: [IgenNemPipe],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent, ToDoAddComponent]
})
export class AppModule { }
