import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import { FaMoneyBillWave, FaUsers, FaMapMarkedAlt, FaBook } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const StatsDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading, isError } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user/stats');
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-8">Loading statistics...</div>;
    if (isError) return <div className="text-center py-8 text-red-500">Failed to load statistics</div>;

    // Data for charts
    const revenueData = [
        { name: 'Total Revenue', value: stats?.totalPayments || 0 }
    ];

    const userDistributionData = [
        { name: 'Clients', value: stats?.totalClients || 0 },
        { name: 'Tour Guides', value: stats?.totalTourGuides || 0 }
    ];

    const contentData = [
        { name: 'Packages', value: stats?.totalPackages || 0 },
        { name: 'Stories', value: stats?.totalStories || 0 }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Platform Statistics</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={<FaMoneyBillWave className="text-blue-500 text-2xl" />}
                    title="Total Revenue"
                    value={`$${(stats?.totalPayments || 0).toLocaleString()}`}
                    color="bg-blue-100"
                />
                <StatCard
                    icon={<FaUsers className="text-green-500 text-2xl" />}
                    title="Total Users"
                    value={(stats?.totalClients + stats?.totalTourGuides || 0).toLocaleString()}
                    color="bg-green-100"
                />
                <StatCard
                    icon={<FaMapMarkedAlt className="text-purple-500 text-2xl" />}
                    title="Tour Packages"
                    value={(stats?.totalPackages || 0).toLocaleString()}
                    color="bg-purple-100"
                />
                <StatCard
                    icon={<FaBook className="text-amber-500 text-2xl" />}
                    title="Travel Stories"
                    value={(stats?.totalStories || 0).toLocaleString()}
                    color="bg-amber-100"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
                    <div className="h-64">
                        <BarChart
                            width={500}
                            height={300}
                            data={revenueData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                            <Bar dataKey="value" fill="#3B82F6" />
                        </BarChart>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
                    <div className="h-64">
                        <PieChart width={500} height={300}>
                            <Pie
                                data={userDistributionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {userDistributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10B981' : '#8B5CF6'} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Platform Content</h2>
                    <div className="h-64">
                        <BarChart
                            width={800}
                            height={300}
                            data={contentData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#F59E0B" />
                        </BarChart>
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatDetail
                    title="Average Revenue per User"
                    value={`$${((stats?.totalPayments || 0) / (stats?.totalClients || 1)).toFixed(2)}`}
                />
                <StatDetail
                    title="Guides to Clients Ratio"
                    value={`1:${Math.round((stats?.totalClients || 0) / (stats?.totalTourGuides || 1))}`}
                />
                <StatDetail
                    title="Stories per Package"
                    value={((stats?.totalStories || 0) / (stats?.totalPackages || 1)).toFixed(1)}
                />
            </div>
        </div>
    );
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
    <div className={`${color} p-6 rounded-xl shadow-sm flex items-center`}>
        <div className="mr-4 p-3 bg-white rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

// Reusable Stat Detail Component
const StatDetail = ({ title, value }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <p className="text-2xl font-bold text-primary mt-2">{value}</p>
    </div>
);

export default StatsDashboard;