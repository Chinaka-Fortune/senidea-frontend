import React from 'react'
import ContactHead from './contactUsComponents/ContactHead';
import ContactMessage from './contactUsComponents/ContactMessage';
import ReachAndAddressBoxes from './contactUsComponents/ReachAndAddressBoxes';
import Location from './contactUsComponents/Location';

const Contact = () => {
  return (
    <div>
      <ContactHead />
      <ContactMessage />
      <ReachAndAddressBoxes />
      <Location />
    </div>
  )
}

export default Contact
