import React, { useState, useEffect } from 'react';
import axios from 'axios';


// Dummy data for third-party API responses
const dummyApiData = {
    'p': [2, 3, 5, 7],
    'f': [1, 1, 2, 3, 5, 8],
    'e': [2, 4, 6, 8],
    'r': [10, 20, 30, 40]
};

function Calc() {
    const [numberType, setNumberType] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [numbersStore, setNumbersStore] = useState([]);

    const windowSize = 10;

    const fetchNumbers = async (type) => {
        // Simulate third-party API call with dummy data
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(dummyApiData[type] || []);
            }, 100);
        });
    };

    const handleFetchNumbers = async (fetchWith) => {
        try {
            let newNumbers = [];
            const startTime = Date.now();

            if (fetchWith === 'fetch') {
                const response = await fetchNumbers(numberType);
                if (!response) throw new Error('Failed to fetch numbers');
                newNumbers = response;
            } else if (fetchWith === 'axios') {
                const response = await fetchNumbers(numberType);
                newNumbers = response;
            }

            if (Date.now() - startTime > 500) {
                throw new Error('Fetching numbers took too long');
            }

            const uniqueNewNumbers = [...new Set(newNumbers)];
            let updatedNumbersStore = [...new Set([...numbersStore, ...uniqueNewNumbers])];

            if (updatedNumbersStore.length > windowSize) {
                updatedNumbersStore = updatedNumbersStore.slice(-windowSize);
            }

            const average = updatedNumbersStore.reduce((sum, num) => sum + num, 0) / updatedNumbersStore.length;

            setNumbersStore(updatedNumbersStore);
            setResult({
                windowPrevState: numbersStore,
                windowCurrState: updatedNumbersStore,
                numbers: uniqueNewNumbers,
                avg: average.toFixed(2),
            });
            setError('');
        } catch (err) {
            setError(err.message || 'An error occurred');
            setResult(null);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Average Calculator</h1>
                <input
                    type="text"
                    value={numberType}
                    onChange={e => setNumberType(e.target.value)}
                    placeholder="Enter number type (p, f, e, r)"
                />
                <button onClick={() => handleFetchNumbers('fetch')}>Fetch with Fetch API</button>
                <button onClick={() => handleFetchNumbers('axios')}>Fetch with Axios</button>
                {result && (
                    <div>
                        <p>Previous Window State: {JSON.stringify(result.windowPrevState)}</p>
                        <p>Current Window State: {JSON.stringify(result.windowCurrState)}</p>
                        <p>Numbers: {JSON.stringify(result.numbers)}</p>
                        <p>Average: {result.avg}</p>
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </header>
        </div>
    );
}

export default Calc;
