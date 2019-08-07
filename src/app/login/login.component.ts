import { Component, OnInit, OnDestroy } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  constructor(
    public amplify: AmplifyService
  ) {
    const auth = from(amplify.auth().currentAuthenticatedUser());
    this.subscription.add(auth.subscribe(x => console.log(x)));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
