import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';


const UPDATE_TEMPLATE=gql`
mutation MyMutation ($template_name: String!, $new_t_name: String!) {
  update_templates(where: {template_name: {_eq: $template_name}}, _set: {template_name: $new_t_name }) {
    returning {
      template_name
    }
  }
}
`
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
const EDIT_VERSION = gql`
mutation MyMutation ($template_id:uuid!,$version_description:String,$new_version_description:String){
  update_template_versions(
    where: {
      template_id: {_eq: $template_id},
      version_description: {_eq: $version_description}
    },
    _set: {version_description: $new_version_description}) {
    returning {
      version_description
    }
  }
}
`

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

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent {
  @Input() name!: String;
  @Input() id!: String;
  form : boolean=false;
  templates!: Observable<Version[]>;
  showVersions: boolean=false;
  editVersionForm:boolean=false;

  constructor(private apollo: Apollo , private route: Router ){}

  OnClick(){
    this.form=!this.form
  }

  Save(){
    this.apollo.mutate({
      mutation: UPDATE_TEMPLATE,
      variables:{
        template_name: this.name.trim(),
        new_t_name: this.editForm.value.template_name!
      }
    }).subscribe(({data}) => {
      console.log(data);
      
      this.form=false;
    })

    
    this.editForm.reset() // to clear form values.
    window.location.reload()
  }

  toogle(){
    this.showVersions=!this.showVersions;
    this.templates=this.apollo.watchQuery<Response>({
      query: GET_VERSION,
      variables: {template_id: this.id.trim()},
    })
    .valueChanges.pipe(map(data =>    
      data.data.templates[0]?.template_versions || []
    ) )

  }

  AddVersion(){
    this.route.navigate([`templates/${this.id}/versions`])
  }

  editForm = new FormGroup({
    template_name : new FormControl("")
  })

  editVersion = new FormGroup({
    version_name : new FormControl("")
  })


  updateVersion(old_version: String) {
    this.apollo.mutate({
      mutation:EDIT_VERSION,
      variables:{template_id:this.id,version_description:old_version,new_version_description:this.editVersion.value.version_name}
    }).subscribe(({data}) => console.log(data)
    )
  }
  
  EditVersion(){
    this.editVersionForm=!this.editVersionForm

  }  
  
  

}
