import './App.css';

import { Provider } from 'react-redux';
import { store } from './store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../features/Home/Home';
import { CssBaseline } from '@mui/material';

export const App = () => {

    return (
        <Provider store={store}>
        <CssBaseline />
            <Router>
                <Routes>
                    <Route path='/' element={<><Home /></>} />
                </Routes>
            </Router>
        </Provider>
    );
}