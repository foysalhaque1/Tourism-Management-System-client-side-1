import React from 'react';

const TouristTestimonials = () => {
    // Static testimonial data
    const testimonials = [
        {
            id: 1,
            quote: "The tour was absolutely amazing! Our guide was knowledgeable and made the whole experience unforgettable.",
            author: "Sarah Johnson",
            rating: 5,
            location: "New York, USA"
        },
        {
            id: 2,
            quote: "Best vacation ever! Everything was perfectly organized and the destinations were breathtaking.",
            author: "Michael Chen",
            rating: 5,
            location: "Toronto, Canada"
        },
        {
            id: 3,
            quote: "I've traveled a lot, but this was truly special. The attention to detail was impressive.",
            author: "Emma Rodriguez",
            rating: 4,
            location: "London, UK"
        }
    ];

    // Function to render star ratings
    const renderStars = (rating) => {
        return (
            <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <section className="py-12 px-4 bg-gradient-to-br from-white to-blue-50">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">Traveler Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                        {renderStars(testimonial.rating)}
                        <blockquote className="text-gray-600 italic mb-4 flex-grow">
                            "{testimonial.quote}"
                        </blockquote>
                        <div className="mt-auto">
                            <p className="font-semibold text-primary">{testimonial.author}</p>
                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TouristTestimonials;