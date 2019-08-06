export class Tweet {
    id: string;
    contents: string;
    userID: string;
}
export class ListTweets {
    items: Tweet[];
}
export class TweetData {
    data: {
        listTweets: ListTweets
    };
}
export class CreateTweetSubscription {
    value: {
        data: {
            onCreateTweet: Tweet;
        };
    };
}
export class UpdateTweetSubscription {
    value: {
        data: {
            onUpdateTweet: Tweet;
        };
    };
}
export class DeleteTweetSubscription {
    value: {
        data: {
            onDeleteTweet: Tweet;
        };
    };
}
