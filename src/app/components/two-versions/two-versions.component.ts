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

const twoVersionTemplates = gql`
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
  selector: 'app-two-versions',
  templateUrl: './two-versions.component.html',
  styleUrls: ['./two-versions.component.css']
})


export class TwoVersionsComponent implements OnInit{
  twoVersionTemplates!: Observable<Template[]>;

  constructor(private apollo: Apollo) { }
  ngOnInit(): void {
    this.twoVersionTemplates = this.apollo.watchQuery<Response>({
      query: twoVersionTemplates
    }).valueChanges.pipe(map(result => (result.data.templates.filter((template) => template.template_versions_aggregate.aggregate.count>=2 ))))
  }


}
