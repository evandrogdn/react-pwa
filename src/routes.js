import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Pessoa from './pages/Pessoa';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Pessoa} />
            </Switch>
        </BrowserRouter>
    );

}