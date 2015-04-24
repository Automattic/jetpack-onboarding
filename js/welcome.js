var WelcomeBox = React.createClass({displayName: "WelcomeBox",
  render: function() {
    return (
      React.createElement("div", {className: "welcome"}, 
        "Hello, world foo! I am the welcome screen."
      )
    );
  }
});