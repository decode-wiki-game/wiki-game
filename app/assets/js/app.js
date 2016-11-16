import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import App from './components/App';
import Pregame from './components/Pregame';
import Endgame from './components/Endgame';
import Game from './components/Game';
import Lobby from './components/Lobby';
import LobbyList from './components/LobbyList';
import Rules from './components/Rules';
import NotFound from './components/NotFound';



const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
         <IndexRoute component={Game} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
);


render(routes, document.getElementById('app'));
