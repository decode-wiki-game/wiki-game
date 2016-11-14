import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter from 'react-router';

import {Router} from 'react-router';
import {Route} from  'react-router';
import {IndexRoute} from 'react-router';

import App from './components/App';
import Pregame from './components/Pregame';

// var routes = (
// 	<Router history={ReactRouter.browserHistory}>
// 		//Add index route???
// 		<Route path="/" component={App}>
// 			<Route path="/pregame" component={Pregame}/>
// 		</Route>
// 	</Router>
// 	)

ReactDOM.render(<Pregame />, document.getElementById('app'));