import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

const Home = React.lazy(() => import('./Home/Home'))
const Scooters = React.lazy(() => import('./Scooters/Scooters'))


const Content = React.memo(() => {
    return (
        <div style={{width: '100%', minHeight: '100vh'}}>
            <Switch>
                <Route exact path="/" component={() => <Suspense fallback={null}><Home/></Suspense>} />
                <Route path="/scooters" component={() => <Suspense fallback={null}><Scooters/></Suspense>} />
            </Switch>
        </div>
    )
})

export default Content