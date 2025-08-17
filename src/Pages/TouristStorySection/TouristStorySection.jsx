import React from 'react';
import { FacebookShareButton } from 'react-share';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';  // Using react-router instead of react-router-dom
import useTheme from '../../ThemeProvider/ThemeHook';

const TouristStorySection = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
     const { isDarkMode } = useTheme()

    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['randomUserStories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/randomStories?limit=4');
            return res.data;
        }
    });

    const handleShare = (story) => {
        console.log(story)
        if (!user) {
            navigate('/login');
        }
    };

    if (isLoading) return <p>Loading stories...</p>;

    return (
        <section className={`py-10 px-4 max-w-[1280px] ${isDarkMode ? 'bg-gray-800 text-blue-500' : 'bg-gray-100 text-black' }`}>
            <h2 className="text-3xl font-bold text-center text-primary mb-6">Tourist Stories</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {stories.map((story, index) => (
                    <div key={index} className={`shadow-md rounded-xl p-4 flex flex-col h-full ${isDarkMode ? 'bg-gray-800 text-blue-500' : 'bg-gray-100 text-gray-600'}`}>
                        <div className="flex-grow space-y-2">
                            <h3 className="text-xl  font-semibold">{story.title}</h3>
                            <p className="">{story.storyText.slice(0, 150)}...</p>
                            <div className="flex gap-2 flex-wrap">
                                {story.imageUrls?.slice(0, 3).map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt="Story"
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto pt-4">
                            <div className="flex justify-between items-center">
                                <Link 
                                    to={'allStories'} 
                                    className=""
                                >
                                    See More
                                </Link>
                                {user ? (
                                    <FacebookShareButton
                                        url={window.location.href}
                                        quote={story.title}
                                        hashtag="#TravelStory"
                                        className="btn btn-outline btn-sm"
                                    >
                                       FaceBook Share
                                    </FacebookShareButton>
                                ) : (
                                    <button
                                        onClick={() => handleShare(story)}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Share
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='text-center mt-16'>
                <Link to={'/allStories'} className='btn btn-primary'>All Stories</Link>
            </div>
        </section>
    );
};

export default TouristStorySection;