import { $Enums } from '@prisma/client'

export interface ResponseData {
  code: number
  statusText: string
  token?: string
}

export interface CommentFormatted {
  commentId: string
  tweetId: string
  avatarUrl: string
  username: string
  createdAt: string
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

export interface UnfollowedUsersResponse {
  id: string
  username: string
  fullname: string
  avatarUrl: string
  email: string
  role: $Enums.Role
  followed: boolean
  followersCount: number
}

export interface FollowResponse {
  createdAt: Date
  followerId: string
  followingId: string
}
