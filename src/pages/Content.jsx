import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home/Home'

const Content = React.memo(() => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={() => <Home/>} />
            </Switch>
        </>
    )
})

export default Content