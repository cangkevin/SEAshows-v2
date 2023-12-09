import { type UserConfig } from '@commitlint/types'

const config: UserConfig = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-conventional'],
}

module.exports = config
