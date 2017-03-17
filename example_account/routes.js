const express = require('express');
const passport = require('passport');

const User = require('./models/user');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.successes = req.flash('success');
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

router.get('/', (req, res, next) => {
  User.find()
    .sort({ createdAt: 'descending' })
    .exec((err, users) => {
      if (err) return next(err);
      res.render('index', { users });
    });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username.trim();
  const password = req.body.password;

  User.findOne({ username }, (err, user) => {
    if (err) return next(err);
    if (user) {
      req.flash('error', 'User already exists!');
      return res.redirect('/signup');
    }
    const newUser = new User({ username, password });
    newUser.save(next);
  });
  //log in if sign up successfully
}, passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.get('/users/:username', (req, res, next) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) return next(err);
    if (!user) return next(404);
    res.render('profile', { user });
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  successFlash: true,
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('info', 'You are logged out');
  res.redirect('/');
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash('info', 'You must be logged in to see this page!');
  res.redirect('/login');
};

router.get('/edit', ensureAuthenticated, (req, res) => {
  res.render('edit');
});

router.post('/edit', ensureAuthenticated, (req, res, next) => {
  req.user.displayname = req.body.displayname.trim();
  req.user.bio = req.body.bio;
  req.user.save((err) => {
    if (err) return next(err);
    req.flash('info', 'Profile updated!');
    res.redirect('/edit');
  });
});

module.exports = router;
