import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store'
import { Home } from '../features/Home/Home';
import { CssBaseline } from '@mui/material';
import './App.css';

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