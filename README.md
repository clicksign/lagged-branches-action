<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# About this project

Action created by clicksign's devops team

# Create a JavaScript Action using TypeScript

Use this template to bootstrap the creation of a TypeScript action.:rocket:

This template includes compilation support, tests, a validation workflow, publishing, and versioning guidance.  

If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ yarn
```

Build the typescript and package it for distribution
```bash
$ yarn build && yarn package
```

## Change action.yml

The action.yml defines news inputs and output for action.

| Inputs                       |    required   |                     default                       |                  description                  |
|------------------------------|:-------------:|--------------------------------------------------:|:---------------------------------------------:|
| channel_id                   | true          | null                                              | add channel                                   |
| thread_ts                    | false         | null                                              | add thread id                                 |
| max_days                     | false         | 30                                                | add max days                                  |
| deny_branch_list             | false         | main,release,dependabot                           | Add list branch validate, separeted with ,    |



## Example

```javascript
jobs:
  slack:
    runs-on: ubuntu-latest
    outputs:
      thread_ts: ${{ steps.thread_id.outputs.thread_ts }}
    steps:
      - name: Checkout Github
        uses: actions/checkout@v3

      - name: Slack Send Message
        id: thread_id
        uses: clicksign/lagged-branches-action
        env:
          GITHUB_TOKEN: ${{ secrets.TOKEN }}
          SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}
        with:
          channel_id: ${{ secrets.CHANNEL_ID }}
          max_days: 1

  slack-thread:
    runs-on: ubuntu-latest
    needs: slack
    steps:
      - name: Checkout Github
        uses: actions/checkout@v3

      - name: Echo Thread ID
        run: echo ${{ needs.slack.outputs.thread_ts }}

      - name: Slack Send Message in Thread
        uses: clicksign/lagged-branches-action
        with:
          channel_id: ${{secrets.CHANNEL_ID}}
          thread_ts: ${{ needs.slack.outputs.thread_ts }}
          max_days: 1
          deny_branch_list: main,release,dependabot
        env:
          GITHUB_TOKEN: ${{ secrets.TOKEN }}
          SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}

```
