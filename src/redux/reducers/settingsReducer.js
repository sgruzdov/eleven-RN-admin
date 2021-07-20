import produce from 'immer'
// import * as axios from 'axios'

export const IS_MENU = 'IS_MENU'


const initialState = {
    loading: false,
    isMenu: false,
}


export const settingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case IS_MENU:
            return produce(state, draft => {
                draft.isMenu = !state.isMenu
            })
        default:
            return state
    }
}