import ScooterTableItem from "./ScooterTableItem"

it('ScooterTableItem', () => {
    const component = shallow(<ScooterTableItem />)
    const wrapper = component.find('.scooter_cell_map')
    expect(wrapper.length).toBe(1)

})