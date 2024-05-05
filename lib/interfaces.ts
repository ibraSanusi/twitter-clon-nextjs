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

export interface TweetResponse {
  id: string
  author: string
  avatarUrl: string
  username: string
  createdAt: string
  content: string
  mediaUrl: string[]
  liked: boolean
  reposted: boolean
  likeCount: number
  repostCount: number
  comments?: CommentFormatted[]
  commentCount: number
}
