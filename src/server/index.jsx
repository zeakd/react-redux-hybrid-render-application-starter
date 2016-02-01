import express from 'express';
import path from 'path';
import proxy from 'proxy-middleware';
import bodyParser from 'body-parser';
import url from 'url';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router';

import reducers from '../reducers';
import routes from '../routes';
import { apiRouter } from './routers';

var app = express();

app.set("port", process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set("env", process.env.NODE_ENV || "development");
if (__DEV__) {
    app.use('/dist', proxy(url.parse('http://localhost:3001/dist')));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');
// app.set("host", process.env.HOST || "0.0.0.0");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../static')));
app.use('/api', apiRouter);

function renderFullPage(renderedContent, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${renderedContent}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/dist/main.js"></script>
      </body>
    </html>
   `
}

app.use((req, res, next) => {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            // You can also check renderProps.components or renderProps.routes for
            // your "not found" component or route respectively, and send a 404 as
            // below, if you're using a catch-all route.      
            const store = createStore(reducers);
            const initialState = {
                routing: {
                    location: renderProps.location
                }
            };
            
            var rendered = renderToString(
                <Provider store={store}>
                    <div>
                        <RouterContext {...renderProps} />
                    </div>
                </Provider>
            )
            res.status(200).send(renderFullPage(rendered, initialState));
        } else {
            res.status(404).end();
        }
    })
});


export default app;