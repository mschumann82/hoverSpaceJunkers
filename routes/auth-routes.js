const path = require("path");

module.exports = function(app,passport,express){

	
	app.post('/signin', passport.authenticate('local-signin',  
			 { successRedirect: '/profile',
			   failureRedirect: '/signin'}
			 ));
			 
			
	app.post('/signup', passport.authenticate('local-signup',  
			 { successRedirect: '/profile', 
			   failureRedirect: '/signup'} ));

	app.get('/logout', function (req, res) {
		req.session.destroy(function(err) {
			res.redirect('/');
		});
	});

	
	app.use('/profile', isLoggedIn);
	app.use('/profile', express.static(path.join(__dirname, 'profile')));

	
	app.get('/session',  function(req,res){

		//for testing
		res.send(req.user);

	});


	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
		{
			return next();
		}
		
		res.redirect('/signin');
	}
}






