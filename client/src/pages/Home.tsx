import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <section className="bg-white py-20 pt-40">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Revolutionize Your Email Campaigns
            </h2>
            <p className="text-lg mb-8">
              Generate, manage, and optimize personalized email campaigns with
              AI-powered tools.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Your Campaign
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Campaign Management",
                  description: "Create, update, and manage campaigns easily.",
                },
                {
                  title: "Recipient Management",
                  description: "Upload and manage recipient data seamlessly.",
                },
                {
                  title: "AI Email Generation",
                  description: "Generate personalized emails with AI.",
                },
                {
                  title: "Email Scheduling",
                  description: "Schedule and send emails at the perfect time.",
                },
                {
                  title: "Analytics",
                  description: "Track performance and optimize campaigns.",
                },
                {
                  title: "User Profiles",
                  description: "Manage account settings and preferences.",
                },
              ].map((feature, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-gray-100 py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  plan: "Basic",
                  price: "$19/month",
                  features: ["Campaign Management", "Recipient Management"],
                },
                {
                  plan: "Pro",
                  price: "$49/month",
                  features: ["All Basic Features", "AI Email Generation"],
                },
                {
                  plan: "Enterprise",
                  price: "Custom",
                  features: ["All Pro Features", "Dedicated Support"],
                },
              ].map((plan, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">{plan.plan}</h3>
                  <p className="text-2xl font-bold mb-6">{plan.price}</p>
                  <ul className="mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="text-gray-600 mb-2">
                        - {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" className="py-20 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "John Doe",
                  position: "Marketing Manager",
                  testimonial:
                    "AI Email Generator has transformed the way we manage our email campaigns. It's efficient and easy to use.",
                },
                {
                  name: "Jane Smith",
                  position: "Sales Director",
                  testimonial:
                    "The AI-powered email generation feature has saved us hours of work and significantly improved our email response rates.",
                },
                {
                  name: "Michael Lee",
                  position: "Product Manager",
                  testimonial:
                    "With AI Email Generator, we can quickly create personalized emails and track their success, all in one platform.",
                },
              ].map((testimonial, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                  <p className="text-gray-600 mb-4">
                    "{testimonial.testimonial}"
                  </p>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.position}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-blue-600 text-white py-6">
          <div className="container mx-auto px-6 text-center">
            <p>© 2025 AI Email Generator. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
