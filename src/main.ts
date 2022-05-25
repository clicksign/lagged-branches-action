import * as core from '@actions/core'
import {execute} from './date-branch'

async function run(): Promise<void> {
  try {
    core.debug(new Date().toTimeString())
    const channelID = core.getInput('channel_id')
    const threadTS = core.getInput('thread_ts')
    const maxDays = core.getInput('max_days')

    await execute({channelID, threadTS, maxDays})
    core.debug(new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
