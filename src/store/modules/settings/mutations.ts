import State from './state'
import {Mutations as BaseMutations} from 'vuex-smart-module'
import {Settings} from './types';

export default class Mutations extends BaseMutations<State> {
  setSettings(settings: Settings): void {
    this.state.settings = settings
  }

  setIsLoaded(status: boolean): void {
    this.state.isLoaded = status
  }
}
