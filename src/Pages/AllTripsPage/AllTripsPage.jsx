import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const AllTripsPage = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'asc', 'desc'

    // Fetch all packages (unchanged from your original code)
    const { data: packages = [], isLoading, isError } = useQuery({
        queryKey: ['tourPackages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/packages');
            return res.data;
        }
    });

    // Sort packages client-side
    const sortedPackages = React.useMemo(() => {
        const packagesToSort = [...packages];
        switch(sortOrder) {
            case 'asc':
                return packagesToSort.sort((a, b) => a.price - b.price);
            case 'desc':
                return packagesToSort.sort((a, b) => b.price - a.price);
            default:
                return packagesToSort; // Default order (as returned from backend)
        }
    }, [packages, sortOrder]);

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load packages</p>;

    return (
        <section className="py-10 px-4 md:px-10 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h2 className="text-4xl font-bold text-center md:text-left text-gray-800">
                        Explore All Our Tour Packages
                    </h2>
                    
                    {/* Sorting Dropdown */}
                    <div className="mt-4 md:mt-0">
                        <label htmlFor="sort" className="mr-2 text-gray-600">Sort by price:</label>
                        <select
                            id="sort"
                            className="select select-bordered select-sm"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="default">Default Order</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedPackages.map((pkg) => (
                        <div key={pkg._id} className="card w-full bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            {pkg.photos?.[0] && (
                                <figure>
                                    <img
                                        src={pkg.photos[0]}
                                        alt={pkg.tourType}
                                        className="h-48 w-full object-cover rounded-t-lg"
                                        onError={(e) => e.target.src = '/default-tour.jpg'}
                                    />
                                </figure>
                            )}

                            <div className="card-body">
                                <h2 className="card-title capitalize text-gray-800">{pkg.tourType}</h2>
                                <p className="text-lg font-semibold text-primary">${pkg.price}</p>
                                <div className="card-actions justify-end mt-4">
                                    <button
                                        className="btn btn-outline btn-primary"
                                        onClick={() => navigate(`/packages/${pkg._id}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllTripsPage;