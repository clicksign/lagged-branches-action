export interface IDateBranch {
  channelID: string
  threadTS: string
  maxDays: string
}

export interface IBranchesInfo {
  branchName: string
  branchCommitSha: string
  branchCommitUrl: string
  branchCommitAuthor: string
  branchCommitAuthorDate: string
  branchCommitterName: string
  branchCommitterLastUpdate: string
  branchCommitterMessage: string
}

export interface ISlack {
  channelID: string
  branchesInfo: IBranchesInfo[]
  repoName: string
  slackToken: string
  threadTS: string
}

export interface IBlocks {
  type: string
  text: any
  accessory?: any
}

export interface IDiffDate {
  branchCommitterLastUpdate: string
}
