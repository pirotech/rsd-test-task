import React from 'react';
import {Route, Switch} from 'react-router-dom';


const Topic = () => (
    <div>Topic</div>
);

const Topics = () => (
    <div>Topics</div>
);


const routes = (
    <div>
        {/*exact - отображает только при точном совпалении*/}
        <Switch>
            {/*первое совпадение рендерится*/}
            <Route path="/budget" component={Topic} />
            <Route path="/" component={Topics} />
        </Switch>
    </div>

);

export default routes;
