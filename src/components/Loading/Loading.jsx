import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

import * as styles from './Loading.module.scss'

const Loading = () => {
    return (
        <div className={styles.loading}>
            <LinearProgress />
        </div>
    )
}

export default Loading
