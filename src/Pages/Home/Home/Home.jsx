import React from 'react';
import Banner from '../Banner/Banner';
import OurPackages from '../../OurPackages/OurPackages';
import MeetOurTourGuides from '../../MeetOurTourGuides/MeetOurTourGuides';
import TouristStorySection from '../../TouristStorySection/TouristStorySection';
import HeroSection1 from '../../OtherSection1/OtherSection1';
import WhyTravelWithUs from '../../OtherSection2/OtherSection2';
import TabSection from '../../TabSection/TabSection';
import OverviewSection from '../../OverViewSection/OverViewSection';
import TouristTestimonials from '../../Testimonial/Testimonial';
import Faq from '../../FaqSection/Faq';
import Offer from '../../OfferSection/Offer';

const Home = () => {
    return (
        <div className='mt-4'>
            <Banner></Banner>
            <div className='mt-4'>
                <OverviewSection></OverviewSection>
            </div>
            {/* Our packages */}
            <div className='my-4'>
                <TabSection></TabSection>
               
                <TouristStorySection></TouristStorySection>
                
                <WhyTravelWithUs></WhyTravelWithUs>
                <Offer></Offer>
                <TouristTestimonials></TouristTestimonials>
                <Faq></Faq>
                <HeroSection1></HeroSection1>
            </div>
        </div>
    );
};

export default Home;