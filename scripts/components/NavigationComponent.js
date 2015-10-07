var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
	componentWillMount: function(){
		this.props.router.on('route', () => {
			this.forceUpdate();
		});
	},
	render: function() {
		var links=[];
		var currentUrl = Backbone.history.getFragment();
		

		if (currentUrl===''){
			var home=<li key="home" className="active"><a href="#">Home</a></li>
		}else{
			var home=<li key="home"><a href="#">Home</a></li>
		}
		if(Parse.User.current()){
			var name = <a href="#dashboard" className="right name">{Parse.User.current().get('firstname')}</a>
			if (currentUrl==='dashboard'){
				links.push(<li key="dashboard" className="active"><a href="#dashboard">Dashboard</a></li>,
					   <li key="logout" onClick={this.logout}><a href="#">Logout</a></li>)
			}else{
				links.push(<li key="dashboard"><a href="#dashboard">Dashboard</a></li>,
					   <li key="logout" onClick={this.logout}><a href="#">Logout</a></li>)
			}
			
		}
		else{
			if (currentUrl==='login'){
				links.push(<li key="login" className="active"><a href="#login">Login</a></li>,
						<li key="register"><a href="#register">Register</a></li>)
			}else if (currentUrl==='register'){
				links.push(<li key="login"><a href="#login">Login</a></li>,
						<li key="register" className="active"><a href="#register">Register</a></li>)
			}else{
				links.push(<li key="login"><a href="#login">Login</a></li>,
						<li key="register"><a href="#register">Register</a></li>)
			}
			
		}
		return (
			<div className="nav-wrapper">
				<a href="#" className="brand-logo left">Login Example</a>
				{name}
				<ul id="nav-mobile" className="right">
					{home}
					{links}
				</ul>
			</div>
		);
	},
	logout: function(){
		Parse.User.logOut();
	}
})