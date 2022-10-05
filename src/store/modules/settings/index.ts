import Actions from './actions'
import Getters from './getters';
import Mutations from './mutations'
import State from './state'
import {Module} from 'vuex-smart-module'

const module = new Module({
  state: State,
  getters: Getters,
  mutations: Mutations,
  actions: Actions
})

export default module
