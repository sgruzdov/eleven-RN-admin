import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from 'redux-thunk'

import { settingsReducer } from './reducers/settingsReducer'
import { scootersReducer } from './reducers/scootersReducer'

const reducer = combineReducers({
    settings: settingsReducer,
    scooters: scootersReducer,
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))