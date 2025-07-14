import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Pencil, Trash2, User } from 'lucide-react';
import axios from 'axios';

const UserDetails = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');


    const [editingUser, setEditingUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/getAdmins'); // Adjust to your backend route
                setUsers(res?.data?.data || []);
            } catch (err) {
                console.error('Failed to load users', err);
            }
        };

        fetchUsers();
    }, []);

    console.log(users, "users")


    const handleEdit = (user) => {
        setEditingUser(user);
        setShowEditModal(true);
    };



    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            const { username, email, phone } = editingUser;
            await axios.put(`http://localhost:5000/api/auth/updateUser/${editingUser._id}`, {
                username, email, phone
            });
            setUsers((prev) =>
                prev.map((u) => (u._id === editingUser._id ? editingUser : u))
            );
            setShowEditModal(false);
            setEditingUser(null);
        } catch (err) {
            console.error('Update failed', err);
            alert('Failed to update user');
        }
    }


    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/auth/delete/${userId}`);
            setUsers((prev) => prev.filter((u) => u._id !== userId));
        } catch (err) {
            console.error('Delete failed', err);
            alert('Failed to delete user');
        }
    };


    const filteredUsers = users?.filter(
        (user) =>
            user.username?.toLowerCase()?.includes(search.toLowerCase()) ||
            user.phone?.toLowerCase()?.includes(search.toLowerCase()) ||

            user.email?.toLowerCase()?.includes(search.toLowerCase())
    );

    return (
        <div className="md:p-6 max-w-6xl mx-auto">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-center md:p-5 p-2">
                    <CardTitle className="text-xl flex items-center gap-2 text-blue-600">
                        <User className="w-5 h-5" /> Admin - All Users
                    </CardTitle>
                    <Input
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mt-4 sm:mt-0 w-full sm:w-64"
                    />
                </CardHeader>
                <CardContent className="p-2">
                    <div className="overflow-auto rounded-lg border md:p-5 p-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Phone No</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Registered On</TableHead>
                                    <TableHead>Actions</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers?.length > 0 ? (
                                    filteredUsers?.map((user, index) => (
                                        <TableRow key={user._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{user?.username}</TableCell>
                                            <TableCell>{user?.phone}</TableCell>
                                            <TableCell>{user?.email}</TableCell>
                                            <TableCell className="capitalize">{user?.role}</TableCell>
                                            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="space-x-5 flex items-center">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </TableCell>


                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                                            No users found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            {showEditModal && editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                        <form
                            onSubmit={handleEditUser}
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                                    <Input
                                        placeholder="Username"
                                        value={editingUser.username}
                                        onChange={(e) =>
                                            setEditingUser({ ...editingUser, username: e.target.value })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={editingUser.email}
                                        onChange={(e) =>
                                            setEditingUser({ ...editingUser, email: e.target.value })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone No:</label>
                                    <Input
                                        type="tel"
                                        placeholder="Phone"
                                        value={editingUser.phone}
                                        onChange={(e) =>
                                            setEditingUser({ ...editingUser, phone: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setEditingUser(null);
                                    }}
                                    className="px-4 py-2 text-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}


export default UserDetails;