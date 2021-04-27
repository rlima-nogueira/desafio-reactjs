import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './Pages/home';
import Perfil from './Pages/profile';

export default function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/perfil" component={Perfil} />
            </Switch>
        </BrowserRouter>
        
    );
}

