import React from 'react'
import { useDispatch } from 'react-redux'

import markerGreen from '../../assets/icons/marker-green.png'
import markerOrange from '../../assets/icons/marker-orange.png'
import markerRed from '../../assets/icons/marker-red.png'
import { SET_SELECTED_SCOOTER } from '../../redux/reducers/scootersReducer'
import PropTypes from 'prop-types'

const Marker = ({ marker }) => {
    const dispatch = useDispatch()

    const charge = () => {
        if (marker.charge >= 50) {
            return markerGreen
        } else if (marker.charge > 29 && marker.charge < 49) {
            return markerOrange
        } else {
            return markerRed
        }
    }

    return (
        <div
            className="marker"
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch({ type: SET_SELECTED_SCOOTER, payload: marker })}
        >
            <img style={{ width: '30px' }} src={charge()} alt="marker" />
        </div>
    )
}

Marker.propTypes = {
    scooter: PropTypes.shape({
        location: PropTypes.objectOf(PropTypes.number),
        _id: PropTypes.string,
        scooterId: PropTypes.number,
        charge: PropTypes.number,
        active: PropTypes.bool,
        userActive: PropTypes.bool,
        breakdown: PropTypes.bool,
        __v: PropTypes.number,
    }),
}

export default Marker
