import React from 'react';
import { MainPage, CartPage, ItemPage, CategoryPage } from '../pages';
import AppHeader from '../app-header';
import Background from '../../assets/img/food-bg.jpg';

import { Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <div style={{ background: `url(${Background}) center center/cover no-repeat` }} className="app">
            <AppHeader total={50} />
            <Switch>
                <Route path='/' exact component={MainPage} />
                <Route path='/cart' exact component={CartPage} />
                <Route path='/:category' exact component={CategoryPage} />
                <Route path='/:category/:id' exact component={ItemPage} />
            </Switch>
        </div>
    )
}

export default App;