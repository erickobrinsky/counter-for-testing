import React from 'react';
import reactDOM from 'react-dom';
import '@testing-library/jest-dom'
import { render, shallow } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../components/counter'


describe('Check componenet is Mount and Unmount', () => {

    let mockProps

    beforeEach(() => {
        mockProps = {
            onIncrement: jest.fn(),
            onDecrement: jest.fn(),
            onDelete: jest.fn(),
            counter: { id: 1, value: 0 },
        }
    })

    test('Testing the componenet is mounting and unmounting', () => {
        const container = document.createElement('div')
        reactDOM.render(<Counter {...mockProps} />, container)
        const unmounting = reactDOM.unmountComponentAtNode(container)
        expect(unmounting).toEqual(true)
    })
})

describe('Checking status initial', () => {

    let mockProps

    beforeEach(() => {
        mockProps = {
            onIncrement: jest.fn(),
            onDecrement: jest.fn(),
            onDelete: jest.fn(),
            counter: { id: 1, value: 0 },
        }
    })

    test('Each button triggers a callback to the parent', () => {
        const { getByRole, rerender } = render(<Counter {...mockProps} />)
        const incrementBtn = getByRole('incrementalButton')
        userEvent.click(incrementBtn)
        expect(mockProps.onIncrement).toHaveBeenCalled()
        mockProps.counter.value++

        rerender(<Counter {...mockProps} />)
        const decrementBtn = getByRole('decrementalButton')
        expect(decrementBtn).toBeEnabled()
        userEvent.click(decrementBtn)
        expect(mockProps.onDecrement).toHaveBeenCalled()

        const deleteBtn = getByRole('buttonDelete')
        userEvent.click(deleteBtn)
        expect(mockProps.onDelete).toHaveBeenCalled()
    })

    test('Check if the counter set to zero', () => {
        const { getByRole } = render(<Counter {...mockProps} />)
        const counterContainer = getByRole('numberCounter')
        expect(counterContainer).toHaveTextContent('Zero')

    })

    test('Check background color yellow', () => {
        const { getByRole } = render(<Counter {...mockProps} />)
        const counterContainer = getByRole('numberCounter')
        expect(counterContainer).toHaveTextContent('Zero')
        expect(counterContainer).toHaveClass('badge-warning')
    })

    test('Check background color blue', () => {
        const { getByRole, rerender } = render(<Counter {...mockProps} />)
        const counterContainer = getByRole('numberCounter')
        const incrementBtn = getByRole('incrementalButton')
        userEvent.click(incrementBtn)
        mockProps.counter.value++
        rerender(<Counter {...mockProps} />)
        expect(counterContainer).toHaveTextContent('1')
        expect(counterContainer).toHaveClass('badge-primary')
    })

    test('Test increment button', () => {
        const { getByRole, rerender } = render(<Counter {...mockProps} />)
        const incrementBtn = getByRole('incrementalButton')
        userEvent.click(incrementBtn)
        expect(mockProps.onIncrement).toHaveBeenCalled()
        mockProps.counter.value++

        rerender(<Counter {...mockProps} />)
        const counterContainer = getByRole('numberCounter')
        expect(counterContainer).toHaveTextContent('1')
        expect(counterContainer).toHaveClass('badge-primary')

        const decrementBtn = getByRole('decrementalButton')
        expect(decrementBtn).toBeEnabled()
    })


    test('Displays the given number at counter.value', () => {

        const { getByRole } = render(<Counter {...mockProps} />)
        const counterContainer = getByRole('numberCounter')

        if (mockProps.counter.value === 0) {
            expect(counterContainer).toHaveTextContent('Zero')
            expect(counterContainer).toHaveClass('badge-warning')

        } else {

            const incrementBtn = getByRole('incrementalButton')
            userEvent.click(incrementBtn)
            mockProps.counter.value++

            for (let i = 0; i < mockProps.counter.value; i++) {
                expect(counterContainer).toHaveTextContent(str(mockProps.counter.value))
                expect(counterContainer).toHaveClass('badge-primary')
                userEvent.click(incrementBtn)
                mockProps.counter.value++
            }
        }

    })

    test('Test Delete Button', () => {
        const { getByRole } = render(<Counter {...mockProps} />)
        const deleteBtn = getByRole('buttonDelete')
        userEvent.click(deleteBtn)
        expect(mockProps.onDelete).toHaveBeenCalled()
    })

})