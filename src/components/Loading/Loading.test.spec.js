import Loading from './Loading'

describe('Loading component', () => {
    let component

    beforeEach(() => {
        component = setUp(Loading)
    })

    it('should render Loading component', () => {
        expect(component).toMatchSnapshot()
    })
})
