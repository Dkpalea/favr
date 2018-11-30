import React from 'react';
import {addFavr} from '../stateStoreAndFunctions';

const now = new Date(Date.now() + 100000);

const favr = {
  favrId: `123`,
  title: `myTitle`,
  details: `myDetails`,
  pickupLocation: `fromHere`,
  dropoffLocation: `toThere`,
  expirationTime: now.getTime(),
  REFrequestedBy: {
    email: `12345@12345.com`,
    profilePicCode: ``,
    firstName: `firstName`,
    lastName: `lastName`,
  },
  REFfulFilledBy: {
    email: `1234@1234.com`,
    profilePicCode: ``,
    firstName: `Dustin`,
    lastName: `Palea`,
  },
  requestAmount: 12,
};

const Navbar = () => (
  <div className="navbar">
    <div onClick={() => addFavr(favr.title, favr.details, favr.pickupLocation, favr.dropoffLocation, favr.expirationTime, favr.requestAmount)} className="logo">f&#257;vr</div>
  </div>
);

export default Navbar;
