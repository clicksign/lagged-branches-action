import * as core from '@actions/core'
import {Context} from '@actions/github/lib/context'
import {IBranchesInfo, IDiffDate} from '../interfaces'

function diffDate({branchCommitterLastUpdate}: IDiffDate): number {
  const lastDateCommit = new Date(branchCommitterLastUpdate)
  const currentDate = new Date()
  const diff = Math.abs(currentDate.getTime() - lastDateCommit.getTime())
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days
}

export async function getBranchesInfo(
  branchData: any,
  toolKit: any,
  context: Context,
  maxDays: string
): Promise<IBranchesInfo[]> {
  const branchesInfo = await Promise.all(
    branchData.map(async (branch: any) => {
      // criar lista de branch que nao vai ser preciso ser avaliada
      if (branch.name.startsWith('dependabot')) {
        return null
      }

      const {data} = await toolKit.rest.git.getCommit({
        ...context.repo,
        commit_sha: branch.commit.sha
      })

      const days = diffDate({
        branchCommitterLastUpdate: data.committer.date
      })

      if (days < parseInt(maxDays)) {
        return null
      }

      return {
        branchName: branch.name,
        branchCommitSha: branch.commit.sha,
        branchCommitUrl: branch.commit.url,
        branchCommitAuthor: data.author.name,
        branchCommitAuthorDate: data.author.date,
        branchCommitterName: data.committer.name,
        branchCommitterLastUpdate: diffDate({
          branchCommitterLastUpdate: data.committer.date
        }),
        branchCommitterMessage: data.message
      }
    })
  )

  const branchesInfoFilter = branchesInfo.filter(b => b !== null)
  core.debug(JSON.stringify(branchesInfoFilter))
  return branchesInfoFilter
}
