import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Tweet, TweetData } from './tweet.model';
import { API, graphqlOperation } from 'aws-amplify';
import { listTweets } from '../../graphql/queries';
import { map } from 'rxjs/operators';
import { createTweet } from 'src/graphql/mutations';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor() { }
  getTweets(): Observable<Tweet[]> {
    const res: Observable<TweetData> = from(API.graphql(graphqlOperation(listTweets)))as Observable<TweetData>;
    return  res.pipe(map(d => d.data.listTweets.items));
  }
  postTweet(tweet: Tweet): Observable<any> {
  // postTweet(tweet: Tweet): Observable<Tweet[]> {
    const res: Observable<TweetData> = from(API.graphql(graphqlOperation(createTweet, {
      input: tweet
    })))as Observable<TweetData>;
    // return  res.pipe(map(d => d.data.listTweets.items));
    return  res;
  }
}
