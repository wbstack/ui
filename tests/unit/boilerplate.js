// Necessary boilerplate to prevent errors and warnings with newer versions of jest

// See: https://stackoverflow.com/a/60731669
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

// See: https://stackoverflow.com/a/59904516

// jest and afterEach defined as globals to keep eslint happy
/* global jest, afterEach */
const assignMock = jest.fn()
delete window.location
window.location = { assign: assignMock }

afterEach(() => {
  assignMock.mockClear()
})

// throw on any console errors
global.console.error = (message) => {
  throw message
}
