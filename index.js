const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const app = express();

//	Require Routes

const routes = require('./routes/routers.js');
const routesApi = require('./routes/route-api.js');
// 	Settings

app.set('appName', 'Wekunow.com | Weku blockchain Explorer.');
app.set('views', __dirname + '/views');
app.set('view engine','ejs');

// 	Middleware
app.use(morgan('dev'));
app.use(express.static('public'));;

//	Routers
app.use(routes);

app.get('*', (req, res) => {
	res.end('Archivo no entrondato');
});
// 	Public

//	Sever on Port

app.listen(3000, () => {
  console.log('Server on port 3000'.green);
  console.log('Nombre de la App:', app.get('appName').green);
});
