import React from 'react';
import ReactDOM from 'react-dom';
import configStore from './store/configStore';
import App from './components/app';

const store = configStore();

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
);

/* webpack hot reloading */
if (module.hot) {
    module.hot.accept();
}