import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router';

import {Router} from 'react-router';
import {Route} from  'react-router';
import {IndexRoute} from 'react-router';

import App from './components/App';
import Pregame from './components/Pregame';
import Endgame from './components/Endgame';
import Game from './components/Game';
import Lobby from './components/Lobby';
import LobbyList from './components/LobbyList';
import Rules from './components/Rules';


ReactDOM.render(<Rules />, document.getElementById('app'));