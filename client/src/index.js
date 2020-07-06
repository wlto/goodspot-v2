import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import PostingList from './components/PostingList/PostingList';
import LargePosting from './components/LargePosting/LargePosting';
import Confirmation from './components/Confirmation/Confirmation';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path='/' component={App}></Route>
            <Route path='/postings' component={PostingList}></Route>
            <Route path='/posting' component={LargePosting}></Route>
            <Route path='/confirmation' component={Confirmation}></Route>
        </Switch>
    </HashRouter>,
    document.getElementById('root')
);
registerServiceWorker();
