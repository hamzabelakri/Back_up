import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import root_Reducer from './root_Reducer'

function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state)
    localStorage.setItem('state', serialisedState)
  } catch (e) {
    console.warn(e)
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem('state')
    if (serialisedState === null) return undefined
    return JSON.parse(serialisedState)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

const persistedState = loadFromLocalStorage()

const store = createStore(
  root_Reducer,
  // persistedState,
  compose(
    applyMiddleware(thunk),
    (window &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
)
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
