export type PaginationLink = {
  linkText: string
  url: string
}

export type ShowFeedItem = {
  id: number
  title: string
  url: string
  imageUrl: string
}

export type EpisodeFeedItem = {
  id: string | undefined
  title: string
  url: string
  alternateUrls?: EpisodeUrl[]
  videoSourceUrl?: string
}

export type EpisodeUrl = {
  language: string
  url: string
}
