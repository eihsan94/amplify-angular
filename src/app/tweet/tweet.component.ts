import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tweet, CreateTweetSubscription, UpdateTweetSubscription, DeleteTweetSubscription } from './tweet.model';
import { TweetService } from './tweet.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateTweet, onUpdateTweet, onDeleteTweet } from 'src/graphql/subscriptions';
import { takeUntil, map } from 'rxjs/operators';

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
  constructor(
    private tweetService: TweetService,
  ) {
    this.subscription$.add(this.tweetsObservable$.subscribe(tweets => this.tweets = tweets));
    this.tweetChangeSubscription();
   }

  ngOnInit() {
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
  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
