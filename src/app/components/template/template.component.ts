import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';


interface Template {
  template_name: "";
 }


interface Response {
  templates: [];
}


const getTemplates = gql`
query MyQuery {
  templates {
    template_name
  }
}
`
// const templateEdit=gql`

// `

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  templates!: Observable<Template[]>;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.templates = this.apollo.watchQuery<Response>({
      query: getTemplates
    }).valueChanges.pipe(map(result => (result.data.templates)))
  }
  // editTemplate(){
  //   this.apollo.mutate({
  //     mutation: templateEdit
  //   })
  // }

}
