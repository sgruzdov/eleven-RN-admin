import ScooterTableItem from './ScooterTableItem'

const scooter = {
    location: {
        latitude: 53.853253464874754,
        longitude: 27.601949922194905,
    },
    _id: '60f5b4bad21fa65a98c3f9f5',
    scooterId: 955227,
    charge: 62,
    active: true,
    userActive: true,
    breakdown: true,
    __v: 0,
}

describe('ScooterTableItem component', () => {
    let component

    beforeEach(() => {
        component = setUp(ScooterTableItem, { scooter })
    })

    it('should render ScooterTableItem component', () => {
        expect(component).toMatchSnapshot()
    })

    it('handle click collapse button', () => {
        const collapse = component.find('.collapse').prop('in')
        component.find('.button_collapse').simulate('click')
        expect(component.find('.collapse').prop('in')).toEqual(!collapse)
    })

    describe('correctly status scooter', () => {
        it('active', () => {
            scooter.active = false
            component = setUp(ScooterTableItem, { scooter })
            expect(toJson(component.find('.scooter_cell'))[3].children[0]).toEqual('Не активно')
        })

        it('userActive', () => {
            scooter.userActive = false
            component = setUp(ScooterTableItem, { scooter })
            expect(toJson(component.find('.scooter_cell'))[4].children[0]).toEqual('Не активно')
        })

        it('userActive', () => {
            scooter.breakdown = false
            component = setUp(ScooterTableItem, { scooter })
            expect(toJson(component.find('.scooter_cell'))[5].children[0]).toEqual('Не активно')
        })
    })
})
