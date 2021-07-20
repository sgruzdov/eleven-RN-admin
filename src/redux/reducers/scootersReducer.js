import produce from 'immer'
import * as axios from 'axios'

import { URL } from '../../server/config'

export const IS_LOAD_SCOOTERS = 'IS_LOAD_SCOOTERS'
export const SET_SCOOTERS = 'SET_SCOOTERS'
export const REMOVE_SCOOTERS = 'REMOVE_SCOOTERS'
export const SET_SELECTED_SCOOTER = 'SET_SELECTED_SCOOTER'
export const CHANGE_STATUS_ACTIVE = 'CHANGE_STATUS_ACTIVE'

const initialState = {
    data: [],
    selectedScooter: null,
    loading: false
}


export const scootersReducer = (state = initialState, action) => {
    switch(action.type) {
        case IS_LOAD_SCOOTERS:
            return produce(state, draft => {
                draft.loading = action.payload
            })
        case SET_SCOOTERS:
            return produce(state, draft => {
                draft.data = action.payload
            })
        case REMOVE_SCOOTERS:
            return produce(state, draft => {
                draft.data = []
                draft.selectedScooter = null
            })
        case SET_SELECTED_SCOOTER:
            return produce(state, draft => {
                draft.selectedScooter = action.payload
            })
        case CHANGE_STATUS_ACTIVE:
            return produce(state, draft => {
                // draft.selectedScooter.
            })
        default:
            return state
    }
}

export const getScootersThunk = (data = {}) => async dispatch => {
    dispatch({ type: IS_LOAD_SCOOTERS, payload: true })

    try {
        const res = await axios.get(`${URL}/scooters/getScooters`, {params: JSON.stringify(data)})
        dispatch({ type: SET_SCOOTERS, payload: res.data })
    } catch (e) {
        console.log('getScootersThunk', e)
    }

    dispatch({ type: IS_LOAD_SCOOTERS, payload: false })
}

export const changeStatusActiveThunk = (id, status, typeActive) => async dispatch => {
    dispatch({ type: IS_LOAD_SCOOTERS, payload: true })
    try {
        const res = await axios.post(`${URL}/scooters/changeStatusActive`, {id, status})
        
        await dispatch(getScootersThunk(typeActive))

        dispatch({ type: SET_SELECTED_SCOOTER, payload: res.data})

    } catch (e) {
        console.log('changeStatusActiveThunk', e)
    }
    dispatch({ type: IS_LOAD_SCOOTERS, payload: false })
}