import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './Pages/home';

export default function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </BrowserRouter>
        
    );
}

