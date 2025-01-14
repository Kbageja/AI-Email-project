import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col items-center my-2  p-6 text-center ">
      {/* Large Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500 mb-6 sm:mb-8 md:mb-10">
        About Us
      </h1>

      {/* Expanded Content */}
      <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xs sm:max-w-md md:max-w-3xl leading-relaxed px-4 sm:px-6 md:px-0">
        At our core, we are a team of innovators who believe in simplifying communication through the power of AI. 
        Our company specializes in enabling businesses to send emails to multiple users simultaneously with unmatched ease and efficiency. 
        Whether it's for marketing campaigns, client updates, or employee communication, we make the process seamless and stress-free.
        <br />
        <br />
        Our mission is simple: eliminate unnecessary operational costs for companies. Traditional methods of hiring large teams to send 
        marketing emails are both time-consuming and expensive. We envision a world where artificial intelligence takes over this 
        repetitive task, allowing businesses to focus on growth and creativity rather than logistics.
        <br />
        <br />
        By using cutting-edge technology, we ensure that every email sent is personalized, timely, and impactful. Join us in transforming 
        the way businesses connect with their audiences—efficiently, intelligently, and affordably.
      </p>
    </div>
  );
};

export default AboutUs;
