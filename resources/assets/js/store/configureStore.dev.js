import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
//import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './../reducers'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent

const router = routerMiddleware(browserHistory)

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
})

export default function configureStore(onComplete) {
  const store = createStore(
    rootReducer,
    undefined, // no need for initialState
    compose(
      //autoRehydrate({whitelist:['form']}),
      applyMiddleware(thunk, logger, router)
    )
  )

  // persistStore(store, {
  //   storage: AsyncStorage,
  //   //blacklist: ['form']
  // })//.purgeAll()

  if (isDebuggingInChrome) {
    window.store = store
  }

  return store
}
