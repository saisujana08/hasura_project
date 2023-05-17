import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import {Apollo,gql} from 'apollo-angular'


const ADD_TEMPLATE = gql`
mutation AddTemplate($template_name:String,$organization_id:uuid,$template_objective:String,$template_description:String,$template_domain_id:uuid,$template_subdomain_id:uuid,$years_of_experience:String,$instructions_file_name:String,$instructions_file_key:String){
  insert_templates(objects: {template_name:$template_name , organization_id: "5de622d6-710b-4243-a53f-940b0af87b51", template_objective: "Mock_Interview", template_description: "Testing", template_domain_id: "5f892dc4-b9ab-4496-8af3-5df9dcf20d58", template_subdomain_id: "5e94ea83-876e-4a3e-861c-be919df3197e", years_of_experience: "0-2", instructions_file_name: "TESTING (1).pdf", instructions_file_key: "6676098f-ac4b-433a-8c61-ec020b3b408b"}) {
    returning {
      template_name
    }
  }
}
`

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private apollo: Apollo){}

  templateForm = new FormGroup({
    template_Name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]*')])
  })

  handleBtn(){
    this.apollo.mutate({
      mutation: ADD_TEMPLATE,
      variables:{template_name :this.templateForm.value.template_Name!}
    }
    ).subscribe(({data}) => (console.log(data)))
  }
}
