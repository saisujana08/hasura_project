import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule,Routes} from '@angular/router';
import {ReactiveFormsModule}  from '@angular/forms'

import { AppComponent } from './app.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { ThreeComponent } from './components/three/three.component';
import { TwoVersionsComponent } from './components/two-versions/two-versions.component';
import { AddComponent } from './components/add/add.component';
import { NoVersionsComponent } from './components/no-versions/no-versions.component';
import { TemplateComponent } from './components/template/template.component';
import { VersionComponent } from './components/version/version.component';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes =[
  {path: 'templates', component:TemplatesComponent},
  {path: 'templates/three', component:ThreeComponent},
  {path: 'templates/two-versions', component:TwoVersionsComponent},
  {path: 'templates/add', component:AddComponent},
  {path: 'templates/no-versions', component:NoVersionsComponent},
  {path: 'templates/:template_id/versions', component:VersionComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    TemplatesComponent,
    ThreeComponent,
    TwoVersionsComponent,
    AddComponent, 
    NoVersionsComponent,
    TemplateComponent,
    VersionComponent
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
