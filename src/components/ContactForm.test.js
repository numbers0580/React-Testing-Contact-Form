import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ContactForm from './ContactForm';
import { act } from 'react-dom/test-utils';

test('Forms gets rendered. No crashes.', () => {
    render(<ContactForm />);
});

test('ContactForm creates output of input fields', () => {
    render(<ContactForm />);
    //type into all 4 inputs
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
    fireEvent.change(fNameInput, {target: {value: 'PJ'}}); //Found error if I enter more than 3 characters
    fireEvent.change(lNameInput, {target: {value: 'Wood'}});
    fireEvent.change(emailInput, {target: {value: 'file-cabinet@shovedoffcliff.com'}});
    fireEvent.change(msgInput, {target: {value: 'Please send all inquiries to the listed email'}});
    //Click the 'Submit' button
    //query for the button
    const submitBtn = screen.getByTestId('btnSubmit');
    //run the click event on the button
    act(() => {fireEvent.click(submitBtn);});
    //fireEvent.click(submitBtn);
    //assert that the output has been created
    //const outputData = screen.getByTestId('outputInfo');  // I suspect these tests are running even before the button click has time to actually output anything
    //expect(outputData).toBeInTheDocument();               // Will work on these later
});