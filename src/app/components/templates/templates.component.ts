import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';


interface Template {
  template_name: String;
  template_id: String;
 }


interface Response {
  templates: Template[];
}


const getTemplates = gql`
query MyQuery {
  templates {
    template_name
    template_id
  }
}
`
// const templateEdit=gql`

// `

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
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
