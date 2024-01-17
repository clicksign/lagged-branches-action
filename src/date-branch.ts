import * as core from '@actions/core'
import {getOctokit, context} from '@actions/github'
import {IDateBranch} from './interfaces'
import {slack} from './slack-send'
import {githubToken} from './libs/get-github-token'
import {getBranchesInfo} from './libs/get-branches-info'
import {validateBranch} from './libs/get-allowed-branches'

export async function execute({
  channelID,
  threadTS,
  maxDays,
  denyBranchList,
  deleteBranchList
}: IDateBranch): Promise<void> {
  const toolKit = getOctokit(githubToken())

  const {data: branchData} = await toolKit.rest.repos.listBranches({
    ...context.repo
  })

  const allowedBranches = validateBranch({
    branchData,
    denyBranchList
  })

  const branchesInfo = await getBranchesInfo({
    branchData: allowedBranches,
    toolKit,
    context,
    maxDays
  })

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

  if (deleteBranchList === 'true') {
    for (const branchInfo of branchesInfo) {
      await toolKit.rest.git.deleteRef({
        ...context.repo,
        ref: `heads/${branchInfo.branchName}`
      })
    }
  }
}
