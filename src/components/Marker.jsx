import React from 'react'
import { useDispatch } from 'react-redux'

import markerGreen from '../assets/icons/marker-green.png'
import markerOrange from '../assets/icons/marker-orange.png'
import markerRed from '../assets/icons/marker-red.png'
import { SET_SELECTED_SCOOTER } from '../redux/reducers/scootersReducer'


const Marker = ({ marker }) => {
    const dispatch = useDispatch()

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

export default Marker
