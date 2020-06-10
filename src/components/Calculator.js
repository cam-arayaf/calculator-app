import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/calculator.css';

const Calculator = ({ value, operator, buttons, onClick }) => (
	<div className="wrapper">
		<div className="value">{ value }</div>
		<section className="buttons">
			{
				buttons.length && buttons.map(button => {
					const { className, innerText } = button;
					return (
						<button
							key={ innerText }
							className={ `${ className }${ operator === innerText && operator.length ? ' selected' : '' }` }
							onClick={ onClick }
						>
							{ innerText }
						</button>
					);
				})
			}
		</section>
	</div>
);

Calculator.propTypes = {
	value: PropTypes.string.isRequired,
	operator: PropTypes.string.isRequired,
	buttons: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired
};

Calculator.displayName = 'Calculator';

export default Calculator;