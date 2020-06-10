import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calculator from '../components/Calculator';
import { buttonList } from '../constants';

const CalculatorContainer = ({ initialValue }) => {
    const [firstValue, setFirstValue] = useState(initialValue);
    const [operator, setOperator] = useState('');
    const [secondValue, setSecondValue] = useState('');
    const [buttons, setButtons] = useState([]);

    useEffect(() => setButtons(buttonList), []);

    const partialResetValues = customFirstValue => {
        setFirstValue(customFirstValue);
        setOperator('');
    }
    
    const fullResetValues = customFirstValue => {
        if (firstValue === customFirstValue && operator === '' && secondValue === '') {
            return;
        }
        setFirstValue(customFirstValue);
        setOperator('');
        setSecondValue('');
    }

    const equals = customOperator => {
        const first = Number(firstValue);
        const action = operator;
        const second = Number(secondValue);
        setOperator(customOperator);
        setSecondValue('');
        switch (action) {
            case '+':
                return setFirstValue((first + second).toString());
            case '-':
                return setFirstValue((first - second).toString());
            case '*':
                return setFirstValue((first * second).toString());
            case '/':
                return setFirstValue(second === 0 ? 'Divided by zero' : (first / second).toString());
            default:
                return;
        }
    }

    const handleClick = str => {
        if (isNaN(firstValue)) {
            return /[=*+/-]/.test(str) ? null : fullResetValues(str === 'AC' ? '0' : str === '.' ? '0.' : str );
        }
        const regexDot = /[.]/;
        const regexOperators = /[*+/-]/;
        switch (str) {
            case '=':
                return secondValue.length && equals('=');
            case 'AC':
                return fullResetValues('0');
            case '+':
            case '-':
            case '*':
            case '/':
                return secondValue.length ? equals(str) : setOperator(str);
            case '.':
                return secondValue.length ? !regexDot.test(secondValue) && setSecondValue(secondValue.concat(str)) :
                    regexOperators.test(operator) ? setSecondValue('0.') :
                    operator === '=' ? partialResetValues('0.') :
                    !regexDot.test(firstValue) && setFirstValue(firstValue.concat(str));
            default:
                return regexOperators.test(operator) ? setSecondValue(secondValue === '0' ? str : secondValue.concat(str)) :
                    partialResetValues(firstValue === '0' || operator === '=' ? str : firstValue.concat(str));
        }
    }
    
    return (
        <Calculator
            value={ secondValue.length ? secondValue : firstValue }
            operator={ operator }
            buttons={ buttons }
            onClick={ e => handleClick(e.target.innerText) }
        />
    );
}

CalculatorContainer.defaultProps = {
    initialValue: '0'
};

CalculatorContainer.propTypes = {
    initialValue: PropTypes.string
};

CalculatorContainer.displayName = 'CalculatorContainer';

export default CalculatorContainer;