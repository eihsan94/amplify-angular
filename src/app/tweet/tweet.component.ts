import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tweet, CreateTweetSubscription, UpdateTweetSubscription, DeleteTweetSubscription } from './tweet.model';
import { TweetService } from './tweet.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateTweet, onUpdateTweet, onDeleteTweet } from 'src/graphql/subscriptions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createTweet } from 'src/graphql/mutations';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit, OnDestroy {
  tweets: Tweet[];
  subscription$ = new Subscription();
  tweetsSubj$ = new BehaviorSubject<Tweet[]>([]);
  tweetsObservable$: Observable<Tweet[]> = this.tweetsSubj$.asObservable();
  form: FormGroup;
  constructor(
    private tweetService: TweetService,
    private fb: FormBuilder,
  ) {
    this.subscription$.add(this.tweetsObservable$.subscribe(tweets => this.tweets = tweets));
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
    this.subscription$.add(createSubscription.subscribe(d => this.tweets = [d.value.data.onCreateTweet, ...this.tweets]));
    this.subscription$.add(updateSubscription.subscribe(d => this.tweets = this.tweets.map(t => t.id === d.value.data.onUpdateTweet.id ? d.value.data.onUpdateTweet : t)));
    this.subscription$.add(deleteSubscription.subscribe(d => this.tweets = this.tweets.filter(t => t.id !== d.value.data.onDeleteTweet.id )));
  }
   submit() {
     this.tweetService.postTweet(this.form.value);
     this.form.reset();
  }
  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
