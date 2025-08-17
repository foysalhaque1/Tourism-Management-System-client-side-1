import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  FaMoneyBillWave, 
  FaUserTie, 
  FaUser, 
  FaMapMarkedAlt, 
  FaBook,
  FaEdit,
  FaUsers,
  FaLock
} from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosInstanceSecure from '../../../Hooks/useAxiosInstanceSecure';

const AdminManageProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxiosInstanceSecure();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({});
    const [selectedRole, setSelectedRole] = useState('admin');

    const adminEmail = user?.email;

    // Role options for the dropdown
    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'tour guide', label: 'Tour Guide' },
        { value: 'tourist', label: 'Tourist' }
    ];

    // 1️⃣ Load Admin Profile
    const { data: profile, isLoading } = useQuery({
        queryKey: ['admin-profile', adminEmail],
        enabled: !!adminEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/profile/${adminEmail}`);
            if (!res.data?.email) {
                const newAdmin = {
                    email: adminEmail,
                    name: user?.displayName || 'Admin',
                    photoURL: user?.photoURL || 'https://i.ibb.co/2n4cD4F/user.png',
                    role: 'admin'
                };
                await axiosSecure.post('/admin/profile', newAdmin);
                return newAdmin;
            }
            return res.data;
        },
        onSuccess: (data) => {
            setForm(data);
            setSelectedRole(data.role || 'admin');
        }
    });

    // 2️⃣ Load Admin Stats
    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosInstance.get('/admin/stats');
            return res.data;
        }
    });

    // 3️⃣ Update Profile Mutation
    const updateMutation = useMutation({
        mutationFn: async (updatedData) => {
            return await axiosSecure.patch(`/admin/profile/${adminEmail}`, updatedData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin-profile', adminEmail]);
            Swal.fire('Updated!', 'Profile updated successfully', 'success');
            setIsModalOpen(false);
        },
        onError: () => {
            Swal.fire('Error!', 'Update failed', 'error');
        }
    });

    const handleSave = () => {
        updateMutation.mutate({ 
            name: form.name, 
            photoURL: form.photoURL,
            role: selectedRole
        });
    };

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

    if (isLoading || statsLoading || !profile) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome, {profile.name}!
                        </h1>
                        <p className="text-gray-600">Admin Dashboard Overview</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="btn btn-outline btn-primary mt-4 md:mt-0 flex items-center gap-2"
                    >
                        <FaEdit /> Edit Profile
                    </button>
                </div>

                {/* Statistics Dashboard */}
                <div className="mb-12">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        <StatCard 
                            icon={<FaMoneyBillWave className="text-blue-500 text-2xl" />}
                            title="Total Revenue"
                            value={`$${(stats?.totalPayments || 0).toLocaleString()}`}
                            color="bg-blue-100"
                        />
                        <StatCard 
                            icon={<FaUser className="text-green-500 text-2xl" />}
                            title="Clients"
                            value={(stats?.totalClients || 0).toLocaleString()}
                            color="bg-green-100"
                        />
                        <StatCard 
                            icon={<FaUserTie className="text-purple-500 text-2xl" />}
                            title="Tour Guides"
                            value={(stats?.totalTourGuides || 0).toLocaleString()}
                            color="bg-purple-100"
                        />
                        <StatCard 
                            icon={<FaMapMarkedAlt className="text-amber-500 text-2xl" />}
                            title="Packages"
                            value={(stats?.totalPackages || 0).toLocaleString()}
                            color="bg-amber-100"
                        />
                        <StatCard 
                            icon={<FaBook className="text-red-500 text-2xl" />}
                            title="Stories"
                            value={(stats?.totalStories || 0).toLocaleString()}
                            color="bg-red-100"
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
                                        <Cell fill="#10B981" />
                                        <Cell fill="#8B5CF6" />
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
                    <div className="flex flex-col items-center text-center">
                        <img 
                            src={profile.photoURL} 
                            alt="Admin" 
                            className="w-32 h-32 rounded-full border-4 border-white shadow-md mb-4" 
                        />
                        <h3 className="text-xl font-bold">{profile.name}</h3>
                        <p className="text-gray-600">{profile.email}</p>
                        <span className={`badge mt-2 px-3 py-1 ${
                            profile.role === 'admin' ? 'badge-primary' :
                            profile.role === 'tour guide' ? 'badge-secondary' :
                            'badge-accent'
                        }`}>
                            {profile.role}
                        </span>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <h3 className="text-2xl font-bold mb-4">Edit Profile</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Photo URL</label>
                                <input
                                    type="text"
                                    value={form.photoURL}
                                    onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Role</label>
                                <div className="flex items-center gap-2">
                                    <FaLock className="text-gray-400" />
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                        className="select select-bordered w-full"
                                    >
                                        {roleOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSave}
                                    className="btn btn-primary"
                                    disabled={updateMutation.isLoading}
                                >
                                    {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
    <div className={`${color} p-5 rounded-xl shadow-sm flex items-center`}>
        <div className="mr-4 p-3 bg-white rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-gray-600 text-sm">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default AdminManageProfile;