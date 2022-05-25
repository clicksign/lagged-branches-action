import {IBlocks, IBranchesInfo} from '../interfaces'

export function blockMessage(repoName: string): IBlocks[] {
  const blocks: IBlocks[] = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `@channel :patying_face::patying_face::patying_face: *Braches aniversariantes da semana do repositorio \`${repoName}\`* :sweat::sweat::sweat:`
      }
    }
  ]

  return blocks
}

function createBlock(branchesInfo: IBranchesInfo): IBlocks {
  const {
    branchCommitAuthor, // Criado da branch
    branchCommitterLastUpdate, // Colocar logica de data
    branchName
  } = branchesInfo

  const block: IBlocks = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `> \`${branchCommitAuthor}\`, sua branch \`${branchName}\` está a \`${branchCommitterLastUpdate.toString()}\` dia/s sem receber atualizações`
    }
  }

  return block
}

export function blockThread(branchesInfo: IBranchesInfo[]): IBlocks[] {
  const blocks: IBlocks[] = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:warning::construction::put_litter_in_its_place: \`Fiquem atentos, em breve bracnhes com mais de 30 dias sem atualização serão removidas automaticamente\``
      }
    }
  ]

  for (const branchInfo of branchesInfo) {
    blocks.push(createBlock(branchInfo))
  }

  return blocks
}
