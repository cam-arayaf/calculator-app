import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import './assets/css/index.css';
import CalculatorContainer from './containers/CalculatorContainer';

render(
    <StrictMode>
        <CalculatorContainer initialValue="0" />
    </StrictMode>,
    document.getElementById('root')
);