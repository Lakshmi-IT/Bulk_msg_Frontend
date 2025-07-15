import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pricingPlans = {
  monthly: [
    {
      name: "START",
      price: "Free",
      features: ["Basic Support", "1 Project", "Community Access"],
      color: "green",
    },
    {
      name: "PRO",
      price: "$38",
      features: ["Priority Support", "10 Projects", "Analytics Tools"],
      color: "green",
      popular: true,
    },
    {
      name: "ENTERPRISE",
      price: "$99",
      features: ["Unlimited Projects", "Dedicated Manager", "Custom Tools"],
      color: "green",
    },
  ],
  annually: [
    {
      name: "START",
      price: "Free",
      features: ["Basic Support", "1 Project", "Community Access"],
      color: "green",
    },
    {
      name: "PRO",
      price: "$399",
      features: ["Priority Support", "10 Projects", "Analytics Tools"],
      color: "green",
      popular: true,
    },
    {
      name: "ENTERPRISE",
      price: "$999",
      features: ["Unlimited Projects", "Dedicated Manager", "Custom Tools"],
      color: "green",
    },
  ],
};


function Pricing() {
  const [planType, setPlanType] = useState("monthly");

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        {/* Heading */}
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Pricing
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
            Choose a plan that fits your needs.
          </p>

          {/* Toggle Buttons */}
          <div className="flex mx-auto border-2 border-green-500 rounded overflow-hidden mt-6">
            {["monthly", "annually"].map((type) => (
              <button
                key={type}
                onClick={() => setPlanType(type)}
                className={`py-1 px-4 focus:outline-none transition-all duration-300 ${
                  planType === type ? "bg-green-500 text-white" : ""
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-wrap justify-center -m-4">
          <AnimatePresence mode="wait">
            {pricingPlans[planType].map((plan, idx) => (
              <motion.div
                key={plan.name}
                className="p-4 xl:w-1/4 md:w-1/2 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`h-full p-6 rounded-lg border-2 border-${plan.color}-500 flex flex-col relative overflow-hidden`}
                >
                  {plan.popular && (
                    <span className={`bg-${plan.color}-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl`}>
                      POPULAR
                    </span>
                  )}
                  <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{plan.name}</h2>
                  <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                    {plan.price}
                    {plan.price !== "Free" && (
                      <span className="text-lg ml-1 font-normal text-gray-500">{planType === "monthly" ? "/mo" : "/yr"}</span>
                    )}
                  </h1>

                  {plan.features.map((feature, i) => (
                    <p key={i} className="flex items-center text-gray-600 mb-2">
                      <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      {feature}
                    </p>
                  ))}

                  <button
                    className={`mt-auto text-white bg-${plan.color}-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-${plan.color}-600 rounded`}
                  >
                    Get Started
                  </button>

                  <p className="text-xs text-gray-500 mt-3">Cancel anytime. No credit card required.</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
