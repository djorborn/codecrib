const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./User');
const dotenv = require('dotenv');
dotenv.config();

passport.use(
  'github',
  new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  }, (accessToken, refeshToken, profile, done) => {
    console.log(profile)
    User.sync({force: false}).then( () => {
      User.findOne({where: {
        githubId: profile.id,
      }}).then( (user) => {
        if (!user) {
          User.create({
            username: profile._json.login,
            githubId: profile.id,
            name: profile._json.name,
            email: profile._json.email,
            imageUrl: profile._json.avatar_url
          }).then((user) => {
            return done(null, user);
          })
        }
        return done(null, user);
      })
    })
  })
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

module.exports = passport;
