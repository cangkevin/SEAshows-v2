<!-- omit in toc -->
# SEAshows v2

![production workflow](https://github.com/cangkevin/seashows-v2/actions/workflows/production.yml/badge.svg?branch=main)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NextJS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

- [Local development](#local-development)
  - [Install Node](#install-node)
  - [Setup VSCode](#setup-vscode)
  - [Setting up environment](#setting-up-environment)
- [Misc TODOs](#misc-todos)

## Local development

### Install Node

It is recommended to install node via [nvm](https://github.com/nvm-sh/nvm).

### Setup VSCode

It is recommended to use VSCode as the preferred editor for this project as there are a number of recommended extensions configured for this project to enhance the developer experience.

### Setting up environment

Create an `.env` file that contains values for the appropriate environment variables. Reference the `.env.example` for the values required.

Then run the `npm run dev` command.

## Misc TODOs

- Explore [Playwright](https://playwright.dev/) for e2e testing
- Explore [Artillery integration with Playwright](https://www.artillery.io/docs/reference/engines/playwright) for performance testing
- Explore [Storybook](https://storybook.js.org/)
 for UI component development
- Explore GitHub actions
 for implementing CI/CD
- Modify tailwind classes to target mobile first and then override at larger breaks
  - <https://tailwindcss.com/docs/responsive-design>
