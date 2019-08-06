import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public amplify: AmplifyService
  ) {
    const auth = from(amplify.auth().currentAuthenticatedUser());
    // auth.subscribe(x => console.log(x));
  }

  ngOnInit() {
  }

}
