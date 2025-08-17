import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OurPackages from '../../Pages/OurPackages/OurPackages';
import MeetOurTourGuides from '../../Pages/MeetOurTourGuides/MeetOurTourGuides';
import { motion } from 'framer-motion';
import useTheme from '../../ThemeProvider/ThemeHook';

const TabSection = () => {
     const { isDarkMode } = useTheme()
    return (
        <section className={`py-16 max-w-[1280px]  px-4 md:px-16 ${isDarkMode ? 'bg-gray-800 text-blue-500' : 'bg-gray-100 text-black'}`}>
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl font-bold ">Explore With Us</h2>
                <p className=" mt-2">Choose from our best packages and meet experienced tour guides.</p>
            </motion.div>

            <Tabs selectedTabClassName="react-tabs__tab--selected-custom">
                <div className="flex justify-center mb-8">
                    <TabList className="flex gap-4  shadow-md px-6 py-2 rounded-full">
                        <Tab className="cursor-pointer text-lg px-4 py-2 rounded-full hover:bg-yellow-100 transition-all duration-300">
                            Our Packages
                        </Tab>
                        <Tab className="cursor-pointer text-lg px-4 py-2 rounded-full hover:bg-yellow-100 transition-all duration-300">
                            Meet Our Tour Guides
                        </Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <OurPackages />
                    </motion.div>
                </TabPanel>

                <TabPanel>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <MeetOurTourGuides />
                    </motion.div>
                </TabPanel>
            </Tabs>

            <style jsx>{`
                .react-tabs__tab--selected-custom {
                    background-color: #facc15;
                    color: white;
                    font-weight: bold;
                }
            `}</style>
        </section>
    );
};

export default TabSection;
