import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaUser, FaLock, FaMoneyBillWave, FaShare, FaStar, FaBook } from 'react-icons/fa';
import useTheme from '../../ThemeProvider/ThemeHook';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);
     const { isDarkMode } = useTheme()

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I view package details?",
            answer: "All users can browse packages, but you need to sign in to view full details. Click 'View Details' on any package after logging in.",
            icon: <FaLock className="text-blue-500 mr-3" />
        },
        {
            question: "Can I book tours without signing in?",
            answer: "No, you must be signed in to book tours. Sign up to access booking and payment features.",
            icon: <FaUser className="text-green-500 mr-3" />
        },
        {
            question: "How does the payment process work?",
            answer: "After selecting a package, you'll be guided through a secure payment process. We accept major credit cards and digital wallets.",
            icon: <FaMoneyBillWave className="text-yellow-500 mr-3" />
        },
        {
            question: "What's the 'Congratulations' feature after 3 bookings?",
            answer: "We reward loyal travelers! After your 3rd booking, you'll unlock special badges, discounts, and exclusive offers.",
            icon: <FaStar className="text-purple-500 mr-3" />
        },
        {
            question: "How can I share my travel stories?",
            answer: "Signed-in users can share their experiences directly to Facebook through our 'Share Your Story' feature.",
            icon: <FaShare className="text-blue-600 mr-3" />
        },
        {
            question: "Can I apply to become a tour guide?",
            answer: "Yes! Any signed-in user can apply through our 'Become a Guide' section. We'll review your application and get back to you.",
            icon: <FaUser className="text-red-500 mr-3" />
        },
        {
            question: "How do I meet available tour guides?",
            answer: "After signing in, visit the 'Meet Our Guides' section to browse professional guides, read reviews, and select your preferred guide.",
            icon: <FaBook className="text-teal-500 mr-3" />
        }
    ];

    return (
        <section className={`py-16 px-4 ${isDarkMode ? 'bg-gray-800 text-blue-500' : 'bg-gray-100 text-black'} `}>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-primary mb-2">Frequently Asked Questions</h2>
                <p className="text-center  mb-12">Everything you need to know about our travel services</p>
                
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className=" rounded-xl shadow-md overflow-hidden transition-all duration-200"
                        >
                            <button
                                className={`flex items-center justify-between w-full p-6 text-left ${activeIndex === index ? 'bg-blue-50' : ''}`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <div className="flex items-center">
                                    {faq.icon}
                                    <span className="font-semibold ">{faq.question}</span>
                                </div>
                                {activeIndex === index ? (
                                    <FaChevronUp className="text-blue-500" />
                                ) : (
                                    <FaChevronDown className="text-blue-500" />
                                )}
                            </button>
                            
                            <div 
                                className={`px-6 pb-6 pt-0 transition-all duration-300 ${activeIndex === index ? 'block' : 'hidden'}`}
                            >
                                <p className="pl-9">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

               
            </div>
        </section>
    );
};

export default Faq;