import { Component } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username: string;
  validSession = new BehaviorSubject<boolean>(null);
  constructor(
    private amplifyService: AmplifyService,
  ) {
    this.amplifyService.authStateChange$.subscribe(x => {
      this.validSession.next(x.state === 'signedIn' );
      from(Auth.currentAuthenticatedUser()).subscribe(s => this.username = s.username);
    });
  }
}
