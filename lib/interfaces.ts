export interface ResponseData {
  code: number
  statusText: string
  token?: string
}

export interface CommentFormatted {
  postId: string
  avatarUrl: string
  username: string
  createdAt: Date
  content: string
  mediaUrl: string[]
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
  mediaUrl: string[]
  liked: boolean
  reposted: boolean
  likeCount: number
  repostCount: number
}

export interface PostResponse {
  id: string
  userId: string
  avatarUrl: string
  username: string
  createdAt: Date
  content: string
  mediaUrl: string[]
  liked: boolean
  reposted: boolean
  likeCount: number
  repostCount: number
  comments?: CommentFormatted[]
  commentCount: number
}
