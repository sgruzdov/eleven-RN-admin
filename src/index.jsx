import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'

import { store } from './redux/store'
import './index.scss'
import App from './App'


const Context = createContext()

const context = {}


ReactDOM.render(
    <React.StrictMode>
        <Router bacename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <Context.Provider value={{...context}}>
                    <App />
                </Context.Provider>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)