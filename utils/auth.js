const withAuth = (req, res, next) => {
  // if the user is not logged in redirect them to the login page
  if (!req.session.loggedIn) {
      res.redirect('/login');
  } else {
      next();
  }
};

module.exports = withAuth;
