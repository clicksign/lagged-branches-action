import {IValidateBranch} from '../interfaces'

export function validateBranch({
  branchData,
  denyBranchList
}: IValidateBranch): any {
  const denyList = denyBranchList.split(',')
  const allowedBranches = branchData.filter((branch: any) => {
    let existed = false

    for (const deny of denyList) {
      if (branch.name.startsWith(deny)) {
        existed = true
        break
      }
    }

    if (!existed) {
      return branch
    }
  })

  return allowedBranches
}
