import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Productos from './pages/Productos';

const Routes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/productos" component={Productos} />
                <Route exact path="/quienesomos" component={QuienesSomos} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;