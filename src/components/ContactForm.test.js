import React from 'react';
import {render} from '@testing-library/react';
import ContactForm from './ContactForm';

test('Forms gets rendered. No crashes.', () => {
    render(<ContactForm />);
});