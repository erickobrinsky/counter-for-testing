import React from 'react'
import reactDOM from 'react-dom';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Check component is Mounting and Unmounting', () => {
    test('Testing component is Mounting and Unmounting', () => {
        const container = document.createElement('div')
        reactDOM.render(<App />, container)
        const unmounted = reactDOM.unmountComponentAtNode(container)
        expect(unmounted).toEqual(true)
    })
})

describe('Check funtionalities', () => {

    test('Four render counters upon start', () => {
        render(<App />)
        const counters = screen.getAllByRole('counter')
        expect(counters).toHaveLength(4)
    })

    test('Trigger onDelete', () => {
        render(<App />)
        const deleteButtons = screen.getAllByRole('buttonDelete');
        userEvent.click(deleteButtons[0])
        const counters = screen.getAllByRole('counter')
        expect(counters).toHaveLength(3)
    })

    test('Increment Button', () => {
        render(<App />)
        const incrementButtons = screen.getAllByRole('incrementalButton')
        userEvent.click(incrementButtons[0])

        const decrementButtons = screen.getAllByRole('decrementalButton')
        expect(decrementButtons[0]).toBeEnabled()

        const innerCounter = screen.getAllByRole('numberCounter')
        expect(innerCounter[0]).toHaveTextContent('1')

        const generalCounter = screen.getByRole('counterGeneral')
        expect(generalCounter).toHaveTextContent('1')
    })

    test('Decrement Button', () => {
        render(<App />)
        const decrementButtons = screen.getAllByRole('decrementalButton')
        userEvent.click(decrementButtons[0])
        expect(decrementButtons[0]).not.toBeEnabled()

        const innerCounter = screen.getAllByRole('numberCounter')
        expect(innerCounter[0]).toHaveTextContent('Zero')

        const generalCounter = screen.getByRole('counterGeneral')
        expect(generalCounter).toHaveTextContent('0')
    })

    test('Cart Amount gets updated', () => {
        render(<App />)

        const incrementButtons = screen.getAllByRole('incrementalButton')
        userEvent.click(incrementButtons[0])

        const decrementButtons = screen.getAllByRole('decrementalButton')
        expect(decrementButtons[0]).toBeEnabled()

        const generalCounter = screen.getByRole('counterGeneral')
        expect(generalCounter).toHaveTextContent('1')

        userEvent.click(decrementButtons[0])
        expect(decrementButtons[0]).not.toBeEnabled()

        expect(generalCounter).toHaveTextContent('0')
    })

    test('Resets all Counters', () => {

        render(<App />)

        const incrementButtons = screen.getAllByRole('incrementalButton')
        for (const button of incrementButtons) userEvent.click(button)

        const innerCounter = screen.getAllByRole('numberCounter')
        for (const inner of innerCounter) expect(inner).toHaveTextContent('1')

        const generalCounter = screen.getByRole('counterGeneral')
        expect(generalCounter).toHaveTextContent('4')

        const resetButton = screen.getByRole('reset-button')
        userEvent.click(resetButton)

        for (const inner of innerCounter) expect(inner).toHaveTextContent('Zero')

        expect(generalCounter).toHaveTextContent('0')

    })
})

describe('Window location reload function', () => {

    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: jest.fn() },
        });
    });

    afterAll(() => {
        Object.defineProperty(window, 'location', { configurable: true, value: window.location });
    });

    test('Calls reload function', () => {
        window.location.reload(true);
        expect(window.location.reload).toHaveBeenCalled();
    });
})