import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Produto from './pages/Produto';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Produto} />
            </Switch>
        </BrowserRouter>
    );

}