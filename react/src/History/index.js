import {createHashHistory, createBrowserHistory} from 'history';

export const history = createHashHistory({

    hashType: 'slash', // The hash type to use (see below)
    forceRefresh: true

});

/*export const browserHistory = createBrowserHistory({

    forceRefresh: true
});*/
export default createBrowserHistory({forceRefresh: true});
