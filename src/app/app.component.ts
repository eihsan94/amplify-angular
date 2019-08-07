import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AmplifyService } from 'aws-amplify-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  validSession = new BehaviorSubject<boolean>(null);
  constructor(
    private amplifyService: AmplifyService,
  ) {
    this.amplifyService.authStateChange$.subscribe(x => this.validSession.next(x.state === 'signedIn' ));
  }
}
