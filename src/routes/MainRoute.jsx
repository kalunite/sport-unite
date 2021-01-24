import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainNavbar from '../ui/container/MainNavbar/MainNavbar';
import FootballRoute from './FootballRoute/FootballRoute';

const MainRoute = () => {
    return (
        <Router>
            <MainNavbar />
            <Route path="/football" component={FootballRoute} />
        </Router>
    );
};

export default MainRoute;