import { Component,OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

interface Template{
  template_name: "";
  template_versions_aggregate: {
    aggregate: {
      count: number
    }
  }
}

interface Response{
  templates: Template[];
}

const noVersionTemplates = gql`
query MyQuery {
  templates {
    template_name
    template_versions_aggregate {
      aggregate {
        count(columns: version_number)
      }
    }
  }
}
`

@Component({
  selector: 'app-no-versions',
  templateUrl: './no-versions.component.html',
  styleUrls: ['./no-versions.component.css']
})
export class NoVersionsComponent {
  noVersionTemplates!: Observable<Template[]>;

  constructor(private apollo: Apollo) { }
  ngOnInit(): void {
    this.noVersionTemplates = this.apollo.watchQuery<Response>({
      query: noVersionTemplates
    }).valueChanges.pipe(map(result => (result.data.templates.filter((template) => template.template_versions_aggregate.aggregate.count==0 ))))
  }


}
