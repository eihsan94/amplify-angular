/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateTweetInput = {
  id?: string | null,
  contents: string,
  userID?: string | null,
};

export type UpdateTweetInput = {
  id: string,
  contents?: string | null,
  userID?: string | null,
};

export type DeleteTweetInput = {
  id?: string | null,
};

export type ModelTweetFilterInput = {
  id?: ModelIDFilterInput | null,
  contents?: ModelStringFilterInput | null,
  userID?: ModelStringFilterInput | null,
  and?: Array< ModelTweetFilterInput | null > | null,
  or?: Array< ModelTweetFilterInput | null > | null,
  not?: ModelTweetFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreateTweetMutationVariables = {
  input: CreateTweetInput,
};

export type CreateTweetMutation = {
  createTweet:  {
    __typename: "Tweet",
    id: string,
    contents: string,
    userID: string | null,
  } | null,
};

export type UpdateTweetMutationVariables = {
  input: UpdateTweetInput,
};

export type UpdateTweetMutation = {
  updateTweet:  {
    __typename: "Tweet",
    id: string,
    contents: string,
    userID: string | null,
  } | null,
};

export type DeleteTweetMutationVariables = {
  input: DeleteTweetInput,
};

export type DeleteTweetMutation = {
  deleteTweet:  {
    __typename: "Tweet",
    id: string,
    contents: string,
    userID: string | null,
  } | null,
};

export type GetTweetQueryVariables = {
  id: string,
};

export type GetTweetQuery = {
  getTweet:  {
    __typename: "Tweet",
    id: string,
    contents: string,
    userID: string | null,
  } | null,
};

export type ListTweetsQueryVariables = {
  filter?: ModelTweetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTweetsQuery = {
  listTweets:  {
    __typename: "ModelTweetConnection",
    items:  Array< {
      __typename: "Tweet",
      id: string,
      contents: string,
      userID: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateTweetSubscription = {
  onCreateTweet:  {
    __typename: "Tweet",
    id: string,
    contents: string,
    userID: string | null,
  } | null,
};

export type OnUpdateTweetSubscription = {
  onUpdateTweet:  {
    __typename: "Tweet",
    id: string,
    contents: string,
    userID: string | null,
  } | null,
};

export type OnDeleteTweetSubscription = {
  onDeleteTweet:  {
    __typename: "Tweet",
    id: string,
    contents: string,
    userID: string | null,
  } | null,
};
