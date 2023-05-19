import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

interface Template {
  template_versions: Version[];
}

interface Version {
  version_description: string;
  version_number: string;
}

interface Response {
  templates: Template[];
}

const GET_VERSION = gql`
query MyQuery ($template_id:uuid) {
  templates(where: {template_id: {_eq: $template_id}}) {
    template_versions {
      version_description
      version_number
    }
  }
}
`
const ADD_VERSION =gql`
mutation MyMutation ($template_id:uuid, $version_description:String, $version_number: number ){
  insert_template_versions(objects: {template_id: $template_id, version_description: $version_description, version_number: 3}) {
    returning {
      version_description
    }
  }
}
`

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent {
  template_id !: String;
  displayVersion !: Observable<Version[]>;
  versionForm: boolean=false;

  constructor (private activeRoute: ActivatedRoute , private apollo: Apollo){

    this.activeRoute.params.subscribe( (result) => {
      this.template_id = result["template_id"]
    })
    this.displayVersion=this.apollo.watchQuery<Response>({
      query: GET_VERSION,
      variables: {template_id: this.template_id.trim()},
    })
    .valueChanges.pipe(map(data =>    
      data.data.templates[0]?.template_versions || []
    ) )
  }

  addVersion(){
    this.versionForm=!this.versionForm
    

  }

  saveVersion(){
    console.log(this.addForm.value.addVersionName);
    this.apollo.mutate({
      mutation: ADD_VERSION,
      variables:{template_id:this.template_id, version_description:this.addForm.value.addVersionName!}
    }).subscribe(({data}) => (console.log(data)))
  }

  addForm= new FormGroup({
    addVersionName: new FormControl("")
  })

}
