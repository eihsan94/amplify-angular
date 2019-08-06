# User check
https://ap-northeast-1.console.aws.amazon.com/cognito/users/?region=ap-northeast-1#/pool/ap-northeast-1_l0fS4Hphf/details?_k=sm6q9i


# dynamo db
https://ap-northeast-1.console.aws.amazon.com/dynamodb/home?region=ap-northeast-1#tables:selected=Tweet-l6ltjupogbc45m5ohrcpl4hblm-dev;tab=items

# LoanApiDev check(graphql)
https://ap-northeast-1.console.aws.amazon.com/appsync/home?region=ap-northeast-1#/apis

```
# create new tweet
mutation createTweet {
  createTweet(input: {
    contents: "疲れた"
    userID: "1"
  }) {
    id userID contents
  }
}
# update
mutation updateTweet {
	updateTweet(input: {
    id: "9c8d34c3-3630-4564-bc31-4cd011b3c8ac"
    contents: "元気になった"
  }) {
      id
      contents
      }
}

# delete
mutation deleteTweet {
	deleteTweet(input: {
    id: "e8c5d585-a5ee-4fcd-8f79-544e1cd1acef"
  }) {
      id
      contents
      }
}

# get
query listTweets {
  listTweets {
    items {
      id
      contents
      userID
    }
  }
}
```
