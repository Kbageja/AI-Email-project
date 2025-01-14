import AboutUs from '@/components/custom/aboutUs';
import ContactUs from '@/components/custom/contactUs';

import React from 'react';

const Home: React.FC = () => {
  return(
    <>
    <div className='flex flex-col justify-center gap-16'>
    <AboutUs/>
    <ContactUs/>
    </div>
    </>
  ); 
};

export default Home;
