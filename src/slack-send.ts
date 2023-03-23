import * as core from '@actions/core'
import {WebClient} from '@slack/web-api'
import {ISlack, IBlocks} from './interfaces'
import {blockMessage, blockThread} from './libs/create-block-message-slack'

export async function slack({
  channelID,
  branchesInfo,
  repoName,
  slackToken,
  threadTS
}: ISlack): Promise<void> {
  core.debug(`Start slack message...`)
  core.debug(`Channel ID: ${channelID}`)
  core.debug(`Thread TS: ${threadTS}`)

  try {
    const webClient = new WebClient(slackToken)
    let blocks: IBlocks[] = []

    if (threadTS) {
      blocks = blockThread(branchesInfo)
    } else {
      blocks = blockMessage(repoName)
    }

    const {message} = await webClient.chat.postMessage({
      mrkdwn: true,
      blocks,
      channel: channelID,
      thread_ts: threadTS || undefined
    })

    const thread_ts = message?.ts
    if (thread_ts) {
      core.setOutput('thread_ts', thread_ts)
    }

    core.debug(`time: ${new Date().toTimeString()}`)
  } catch (e: any) {
    throw new Error(e)
  }
}
