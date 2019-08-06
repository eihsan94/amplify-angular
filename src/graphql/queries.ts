// tslint:disable
// this is an auto generated file. This will be overwritten

export const getTweet = `query GetTweet($id: ID!) {
  getTweet(id: $id) {
    id
    contents
    userID
  }
}
`;
export const listTweets = `query ListTweets(
  $filter: ModelTweetFilterInput
  $limit: Int
  $nextToken: String
) {
  listTweets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      contents
      userID
    }
    nextToken
  }
}
`;
