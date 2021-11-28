import React from 'react'
import reactDOM from 'react-dom';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counters from '../components/counters'

jest.mock('../components/counter', () => () => <div>Mocked Component</div>)


describe('Check componenet is Mounting and Unmounting', () => {

    let mockProps

    beforeEach(() => {
        mockProps = {
    
            onReset: jest.fn(),
            onIncrement: jest.fn(),
            onDecrement: jest.fn(),
            onDelete: jest.fn(),
            onRestart: jest.fn(),
            counters: [
                { id: 1, value: 0 },
                { id: 2, value: 0 },
                { id: 3, value: 0 },
                { id: 4, value: 0 },
            ],
    
        }
    })

    test('Test the componenet is mounting and unmounting', () => {
        const container = document.createElement('div')
        reactDOM.render(<Counters {...mockProps} />, container)
        const unmounting = reactDOM.unmountComponentAtNode(container)
        expect(unmounting).toEqual(true)
    })
})


describe('Check funtionality fo Counters', () => {
    
    const mockProps = {

        onReset: jest.fn(),
        onIncrement: jest.fn(),
        onDecrement: jest.fn(),
        onDelete: jest.fn(),
        onRestart: jest.fn(),
        counters: [
            { id: 1, value: 0 },
            { id: 2, value: 0 },
            { id: 3, value: 0 }
        ],

    }

    test('Reset', () => {
        const { getByRole } = render(<Counters {...mockProps} />)
        const resetButton = getByRole('reset-button')
        userEvent.click(resetButton)
        expect(mockProps.onReset).toHaveBeenCalledTimes(1)
    })

    test('Check the right number of counters lenght 3 and length 0', () => {

        const { getAllByText, rerender, queryAllByText } = render(<Counters {...mockProps} />)
        const counterOnScreen = getAllByText('Mocked Component')
        expect(counterOnScreen).toHaveLength(3)
        mockProps.counters = []
        rerender(<Counters {...mockProps} />)
        const newCounterOnScreen = queryAllByText('Mocked Component')
        expect(newCounterOnScreen).toHaveLength(0)
    })

    test('Restart', () => {
        const { getByRole } = render(<Counters {...mockProps} />)
        const restartButton = getByRole('restart-button')
        expect(restartButton).toBeEnabled()
        userEvent.click(restartButton)
        expect(mockProps.onRestart).toHaveBeenCalled()
    })

})