import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule,Routes} from '@angular/router';
import {ReactiveFormsModule}  from '@angular/forms'

import { AppComponent } from './app.component';
import { TemplateComponent } from './components/template/template.component';
import { ThreeComponent } from './components/three/three.component';
import { TwoVersionsComponent } from './components/two-versions/two-versions.component';
import { AddComponent } from './components/add/add.component';
import { NoVersionsComponent } from './components/no-versions/no-versions.component';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes =[
  {path: 'templates', component:TemplateComponent},
  {path: 'templates/three', component:ThreeComponent},
  {path: 'templates/two-versions', component:TwoVersionsComponent},
  {path: 'templates/add', component:AddComponent},
  {path: 'templates/no-versions', component:NoVersionsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ThreeComponent,
    TwoVersionsComponent,
    AddComponent, 
    NoVersionsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
