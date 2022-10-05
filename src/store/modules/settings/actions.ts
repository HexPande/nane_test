import {Actions as BaseActions} from 'vuex-smart-module'
import Getters from './getters'
import Mutations from './mutations'
import State from './state'
import {Settings} from './types'
import api from 'src/api'

export default class Actions extends BaseActions<State, Getters, Mutations, Actions> {
  async load(): Promise<void> {
    const settings = await api.getSettings() as Settings

    this.mutations.setSettings(settings)
    this.mutations.setIsLoaded(true)
  }
}
