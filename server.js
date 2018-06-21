const express = require('express');
const app = express();

const session = require('express-session');
const SqlStore = require('connect-session-sequelize')(session.Store);
const db = require('./modules/sequelize');
const passport = require('./modules/passport'); 
const path = require('path');

app.get('/preview', (req, res, next) => {
  res.sendFile(__dirname + '/routes/preview.html');
})

app.set('view engine', 'pug');

const Store = new SqlStore({db: db});
app.use(
  express.json(),
  express.urlencoded({extended: false}),
  express.static(
    path.join(__dirname, 'public')
  ),
  session({
    secret: process.env.SECRET,
    cookies: {maxAge: null},
    store: Store
  }),
  passport.initialize(),
  passport.session(),
);
Store.sync({force: true});


const apiRouter = require('./routes/api.router');
const dashboardRouter = require('./routes/dashboard.router');
const loginRouter = require('./routes/login.router');
const indexRouter = require('./routes/index.router');

app.use('/api', apiRouter);
app.use('/dashboard', dashboardRouter);
app.use('/login', loginRouter);
app.use('/', indexRouter);

app.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

app.listen(8080, () => {
  console.log("Server is running, best go catch it! @ : 8080");
})

module.exports = app;