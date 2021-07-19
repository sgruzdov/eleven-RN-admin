import React from 'react'

import Content from './pages/Content'
import Nav from './components/Nav/Nav'

const App = () => {
    return (
        <div style={{display: 'flex'}}>
            <Nav />
            <Content /> 
        </div>
    )
}

export default App
