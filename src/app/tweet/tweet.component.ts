import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tweet, CreateTweetSubscription, UpdateTweetSubscription, DeleteTweetSubscription } from './tweet.model';
import { TweetService } from './tweet.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateTweet, onUpdateTweet, onDeleteTweet } from 'src/graphql/subscriptions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bwFadeInOutAnimations } from '../animations/bw-fade-in-out.animations';



@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
  animations: bwFadeInOutAnimations,
})
export class TweetComponent implements OnInit, OnDestroy {
  tweets: Tweet[];
  subscription$ = new Subscription();
  tweetsSubj$ = new BehaviorSubject<Tweet[]>([]);
  tweetsObservable$: Observable<Tweet[]> = this.tweetsSubj$.asObservable();
  form: FormGroup;
  fadeInOut = 'inactive';
  onFirstLoad: boolean;
  currentTweet: Tweet;
  constructor(
    private tweetService: TweetService,
    private fb: FormBuilder,
  ) {
    this.subscription$.add(this.tweetsObservable$.subscribe(tweets => {
      this.tweets = tweets;
      this.onFirstLoad = true;
      setTimeout(() => {
        this.fadeInOut = 'active';
      }, 500);
    }));
    this.tweetChangeSubscription();
   }

  ngOnInit() {
    this.form = this.fb.group({
      contents: [''],
    });
    this.subscription$.add(this.tweetService.getTweets().subscribe(d => this.tweetsSubj$.next(d)));
  }

  tweetChangeSubscription() {
    const createSubscription: Observable<CreateTweetSubscription> = API.graphql(graphqlOperation(onCreateTweet)) as Observable<CreateTweetSubscription>;
    const updateSubscription: Observable<UpdateTweetSubscription> = API.graphql(graphqlOperation(onUpdateTweet)) as Observable<UpdateTweetSubscription>;
    const deleteSubscription: Observable<DeleteTweetSubscription> = API.graphql(graphqlOperation(onDeleteTweet)) as Observable<DeleteTweetSubscription>;
    this.subscription$.add(createSubscription.subscribe(d => {
      this.onFirstLoad = false;
      this.fadeInOut = 'inactive';
      this.currentTweet = d.value.data.onCreateTweet;
      this.tweets.unshift(this.currentTweet);
      setTimeout(() => {
        this.fadeInOut = 'active';
      }, 50);
    }));
    this.subscription$.add(updateSubscription.subscribe(d => this.tweets = this.tweets.map(t => t.id === d.value.data.onUpdateTweet.id ? d.value.data.onUpdateTweet : t)));
    this.subscription$.add(deleteSubscription.subscribe(d => {
      this.onFirstLoad = false;
      this.fadeInOut = 'active';
      this.currentTweet = d.value.data.onDeleteTweet;
      setTimeout(() => {
        this.tweets = this.tweets.filter(t => t.id !== this.currentTweet.id );
        this.fadeInOut = 'inactive';
      }, 50);
    }));
  }
   submit() {
     this.tweetService.postTweet(this.form.value);
     this.form.reset();
  }
   deleteContents(tweet: Tweet) {
     this.tweetService.deleteTweet(tweet);
  }
  trackElement(index: number, element: Tweet) {
    return element.contents;
  }
  ngOnDestroy() {
    this.fadeInOut = 'inactive';
    this.subscription$.unsubscribe();
  }
}
