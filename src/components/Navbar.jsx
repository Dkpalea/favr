import React from 'react';

const Navbar = () => (
  <div id="navbar">
    <div id="logo" className="logo"><a onClick={trackEvent}>confer</a></div>
    <input id="navbar-search-input" type="search" className="body" />
    <div id="navbar-icons" />
  </div>
);

function trackEvent() {
  mixpanel.track(`Logo clicked`);
  console.log(`Track sent`);
}

export default Navbar;
