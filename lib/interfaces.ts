export interface ResponseData {
  code: number
  statusText: string
  token?: string
}

export interface CommentFormatted {
  tweetId: string
  avatarUrl: string
  username: string
  createdAt: Date
  content: string
  mediaUrls: string[]
  liked: boolean
  reposted: boolean
  likeCount: number
  repostCount: number
}

export interface RetweetsFormatted {
  createdAt: Date
  userId: string
  tweetId: string
}

export interface TweetResponse {
  tweetId: string
  userId: string
  fullname: string
  avatarUrl: string
  username: string
  createdAt: string
  content: string
  mediaUrls: any[]
  liked: boolean
  reposted: boolean
  likeCount: number
  repostCount: number
  comments?: CommentFormatted[]
  commentCount: number
}

export interface User {
  id: string
  fullname: string
  email: string
  username: string
  avatarUrl: string
  role: string
  followers: Follower[]
}

export interface Follower {
  id: string
  fullname: string
  email: string
  username: string
  avatarUrl: string
  role: string
}
