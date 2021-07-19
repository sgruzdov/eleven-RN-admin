import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'

import { GOOGLE_API_KEY } from '../../assets/constants'
import * as styles from './Home.module.scss'
import { getScootersThunk, REMOVE_SCOOTERS, SET_SELECTED_SCOOTER } from '../../redux/reducers/scootersReducer'
import Loading from '../../components/Loading/Loading'

import markerGreen from '../../assets/icons/marker-green.png'
import markerOrange from '../../assets/icons/marker-orange.png'
import markerRed from '../../assets/icons/marker-red.png'



const Home = () => {
    const [typeShows, setTypeShows] = useState({
        all: true,
        active: false,
        userActive: false,
        breakdown: false
    })

    const Marker = ({ marker }) => {
        const charge = () => {
            let charge = null
    
            if(marker.charge >= 50) {
                charge = markerGreen
            } else if(marker.charge > 29 && marker.charge < 49 ) {
                charge = markerOrange
            } else {
                charge = markerRed
            }
            return charge
        }
    
        return(
            <div style={{cursor: 'pointer'}} onClick={() => dispatch({ type: SET_SELECTED_SCOOTER, payload: marker })}>
                <img style={{width: '30px'}} src={charge()} alt="marker" />
            </div>
        )
    }

    const dispatch = useDispatch()
    const scooters = useSelector(state => state.scooters)


    const changeType = type => {
        setTypeShows(Object.fromEntries(Object.entries(typeShows).map(item => {
            if(item[0] === type) {
                type === 'all' ? dispatch(getScootersThunk()) : dispatch(getScootersThunk({[item[0]]: true}))
                return [item[0], true]
            } else { 
                return [item[0], false]
            }
        })))
    }

    useEffect(() => {
        dispatch(getScootersThunk())
        return () => dispatch({ type: REMOVE_SCOOTERS })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.map}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                defaultCenter={[53.90308754854675, 27.54958379945919]}
                defaultZoom={12}
                // onClick={console.log('map')}
            >
                {scooters.data.map(marker => {
                    return (
                        <Marker
                            key={marker.scooterId.toString()}
                            lat={marker.location.latitude}
                            lng={marker.location.longitude}
                            marker={marker}
                        />
                    )
                })}
            </GoogleMapReact>
            <div className={styles.map_radio_wrap}>
                <FormControlLabel
                    className={styles.map_radio_button}
                    style={{color: '#2d3436' }}
                    control={<Checkbox checked={typeShows.all} onChange={() => changeType('all')} style={{color: '#2d3436' }}/>}
                    label="все самокаты"
                />
                <FormControlLabel
                    className={styles.map_radio_button}
                    style={{color: '#ffd700' }}
                    control={<Checkbox checked={typeShows.active} onChange={() => changeType('active')} style={{color: '#ffd700' }}/>}
                    label="в работе"
                />
                <FormControlLabel
                    className={styles.map_radio_button}
                    style={{color: '#2ECC71' }}
                    control={<Checkbox checked={typeShows.userActive} onChange={() => changeType('userActive')} style={{color: '#2ECC71' }}/>}
                    label="активные"
                />
                <FormControlLabel
                    className={styles.map_radio_button}
                    style={{color: '#E74C3C' }}
                    control={<Checkbox checked={typeShows.breakdown} onChange={() => changeType('breakdown')} style={{color: '#E74C3C' }}/>}
                    label="сломанные"
                />
            </div>
            {scooters.selectedScooter && <div className={styles.map_selected}>
                <div className={styles.map_selected_title}>Самокат {scooters.selectedScooter.scooterId}</div>
                <div className={styles.map_selected_charge}>Зарядка {scooters.selectedScooter.charge}%</div>
                <Button variant="outlined" color="primary">Подробнее</Button>
            </div>}
            {scooters.loading && <Loading />}
        </div>
    )
}

export default Home
