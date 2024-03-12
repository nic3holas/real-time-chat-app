import React, { useState, useRef, useEffect } from 'react';
import Anavbar from '../Anavbar/Anavbar';
import embuni from './uoem.jpeg';
import BookingCount from '../BookingCount/BookingCount';

function Admin() {
  return (
    <div>
     <Anavbar/>

     <img src={embuni} alt='university photo'/>
     <BookingCount/>
    </div>
  );
}

export default Admin;
