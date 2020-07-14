import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ContactForm from './ContactForm';
import { act } from 'react-dom/test-utils';

test('Forms gets rendered. No crashes.', () => {
    render(<ContactForm />);
});

test('ContactForm creates output of input fields', () => {
    render(<ContactForm />);
    //4 inputs
    //query for all inputs
    const fNameInput = screen.getByLabelText(/first name/i);
    expect(fNameInput).toBeInTheDocument();
    const lNameInput = screen.getByLabelText(/last name/i);
    expect(lNameInput).toBeInTheDocument();
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    const msgInput = screen.getByLabelText(/message/i);
    expect(msgInput).toBeInTheDocument();

    //run the change event to add text
    fireEvent.change(fNameInput, {target: {value: 'Peter'}}); //Found error if I enter more than 3 characters, changed in ContactForm to minLength: 2
    fireEvent.change(lNameInput, {target: {value: 'Wood'}});
    fireEvent.change(emailInput, {target: {value: 'file-cabinet@shovedoffcliff.com'}});
    fireEvent.change(msgInput, {target: {value: 'Please send all inquiries to the listed email'}});

    //Submit button
    //query for the button
    const submitBtn = screen.getByRole('button');

    //run the click event on the button
    fireEvent.click(submitBtn); //act(() => {fireEvent.click(submitBtn);});


    //assert that the output has been created
    //const outputData = screen.findByTestId('outputInfo'); //Changing .getByTestId to .findByTestId fixed this error, BUT... next line
    //expect(outputData).toBeInTheDocument(); //Now I'm getting an error here
    setTimeout(() => {
        //I suspected the test was firing before the output even generated, which caused an error in this test
        //I found this setTimeout code here, which fixed the problem. I set it for 1/10th of a second = 100 milliseconds:
        //https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks#:~:text=Use%20setTimeout%20in%20your%20React,after%20a%20period%20of%20time.
        const outputData = screen.findByTestId('outputInfo');
        expect(outputData).toBeInTheDocument();
    }, 100);
});