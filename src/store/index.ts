import {createStore, Module} from 'vuex-smart-module'
import settings from './modules/settings'
import chats from './modules/chats'
import user from './modules/user'

// This is the config of the root module
// You can define a root state/getters/mutations/actions here
// Or do everything in separate modules
const rootConfig = {
  modules: {
    user,
    chats,
    settings
  },
};

export const root = new Module(rootConfig);

const vuexInstance = createStore(
  root,

  // Vuex store options
  {
    strict: process.env.NODE_ENV !== 'production'
  }
)

export default vuexInstance

export const store = root.context(vuexInstance)
export const chatStore = chats.context(vuexInstance)
export const userStore = user.context(vuexInstance)
export const settingsStore = settings.context(vuexInstance)
