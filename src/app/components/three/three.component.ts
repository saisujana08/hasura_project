import { Component,OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

interface Template {
  template_name: "";
 }


interface Response {
  templates: [];
}

const getThreeCharTemp = gql`
query MyQuery {
  templates(where: {template_name: {_ilike: "___%"}}) {
    template_name
  }
}
`

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})


export class ThreeComponent implements OnInit{
  threeCharTemplate!: Observable<Template[]>;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.threeCharTemplate = this.apollo.watchQuery<Response>({
      query: getThreeCharTemp
    }).valueChanges.pipe(map(result => (result.data.templates)))
  }

}
