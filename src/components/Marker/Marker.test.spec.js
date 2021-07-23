import * as redux from 'react-redux'

import { store } from '../../redux/store'
import Marker from './Marker'
import { SET_SELECTED_SCOOTER } from '../../redux/reducers/scootersReducer'

const scooter = {
    location: {
        latitude: 53.853253464874754,
        longitude: 27.601949922194905,
    },
    _id: '60f5b4bad21fa65a98c3f9f5',
    scooterId: 955227,
    charge: 60,
    active: true,
    userActive: true,
    breakdown: true,
    __v: 0,
}

const mountComponent = () =>
    mount(
        <redux.Provider store={store}>
            <Marker marker={scooter} />
        </redux.Provider>
    )

describe('Marker component', () => {
    let component

    beforeEach(() => {
        component = mountComponent({})
    })

    it('should render Marker component', () => {
        expect(component).toMatchSnapshot()
    })

    describe('marker charge', () => {
        it('red', () => {
            scooter.charge = 10
            component = mountComponent()
        })

        it('orange', () => {
            scooter.charge = 30
            component = mountComponent()
        })

        it('green', () => {
            scooter.charge = 60
            component = mountComponent()
        })
    })
})
