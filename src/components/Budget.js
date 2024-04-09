// Budget.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch, currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value);
        const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

        if (!isNaN(value) && value >= totalExpenses) {
            setNewBudget(value);
            dispatch({ type: 'SET_BUDGET', payload: value });
        } else {
            alert(`Budget cannot be lower than total spending (${currency}${totalExpenses})`);
        }
    }

    const handleCurrencyChange = (event) => {
        const selectedCurrency = event.target.value;
        dispatch({ type: 'CHG_CURRENCY', payload: selectedCurrency });
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}{budget}</span>
            <input type="number" value={newBudget} onChange={handleBudgetChange} max={20000} />
            <select value={currency} onChange={handleCurrencyChange}>
                <option value="$">Dollar ($)</option>
                <option value="£">Pound (£)</option>
                <option value="€">Euro (€)</option>
                <option value="₹">Rupee (₹)</option>
            </select>
        </div>
    );
};

export default Budget;
