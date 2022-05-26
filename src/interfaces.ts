import {Context} from '@actions/github/lib/context'

export interface IDateBranch {
  channelID: string
  threadTS: string
  maxDays: string
  denyBranchList: string
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

export interface IValidateBranch {
  branchData: any
  denyBranchList: string
}

export interface IGetBranchesInfo {
  branchData: any
  toolKit: any
  context: Context
  maxDays: string
}
