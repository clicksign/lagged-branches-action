import * as core from '@actions/core'
import {getOctokit, context} from '@actions/github'
import {IDateBranch} from './interfaces'
import {slack} from './slack-send'
import {githubToken} from './libs/get-github-token'
import {getBranchesInfo} from './libs/get-branches-info'

export async function execute({
  channelID,
  threadTS,
  maxDays
}: IDateBranch): Promise<void> {
  const toolKit = getOctokit(githubToken())

  const {data: branchData} = await toolKit.rest.repos.listBranches({
    ...context.repo
  })

  const branchesInfo = await getBranchesInfo(
    branchData,
    toolKit,
    context,
    maxDays
  )

  core.debug(JSON.stringify(branchesInfo))

  if (branchesInfo.length === 0) {
    return
  }

  const slackToken = process.env.SLACK_TOKEN

  if (!slackToken) {
    return
  }

  await slack({
    channelID,
    branchesInfo,
    repoName: context.repo.repo,
    slackToken,
    threadTS
  })
}
