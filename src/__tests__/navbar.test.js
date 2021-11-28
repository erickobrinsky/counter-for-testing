import React from 'react'
import reactDOM from 'react-dom';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Navbar from '../components/navbar'


describe('Check componenet is Mounting and Unmounting', () => {

    const mockProps = {
        totalCounters: 2
    }

    test('Test the componenet is mounting and unmounting', () => {
        const container = document.createElement('div')
        reactDOM.render(<Navbar {...mockProps} />, container)
        const unmounting = reactDOM.unmountComponentAtNode(container)
        expect(unmounting).toEqual(true)
    })

})


describe('Basic Funtionalities ', () => {

    const mockProps = {
        totalCounters: 2
    }

    test('see amount of elements', () => {
        const { getByRole } = render(<Navbar {...mockProps} />)
        const counter = getByRole('counterGeneral')
        expect(counter).toHaveTextContent('2')
    })
})