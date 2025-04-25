import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])

    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:3000/profile', { withCredentials: true })
            setUser(res.data)
            setPosts(res.data.posts)
        } catch (error) {
            setUser(null)
            navigate('/login')
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const handleDelete = async (postId) => {
        await axios.delete(`http://localhost:3000/delete/${postId}`, { withCredentials: true });
        setPosts(posts.filter(post => post._id !== postId));
    };

    const handleLogout = async () => {
        await axios.get(`http://localhost:3000/logout`, { withCredentials: true });
        navigate('/login')
    };

    return (
        // <div className='min-h-screen flex flex-col items-center justify-center bg-gray-900 p-3'>
        //     {/* Profile Card */}
        //     <div className='w-full max-w-md p-8 bg-white/5 rounded-lg shadow-lg border border-slate-600'>
        //         <div className='flex flex-col md:flex-row items-center gap-6'>
        //             {user && (
        //                 <>
        //                     <div className='w-full md:w-1/3 flex justify-center'>
        //                         <img className='w-32 h-32 object-cover border-4 border-cyan-900 rounded-full' src={`http://localhost:3000/uploads/${user.image}`} alt="User" />
        //                     </div>
        //                     <div className='w-full md:w-2/3 flex flex-col gap-4'>
        //                         <h1 className='text-2xl font-bold text-gray-100'>{user.username} </h1>
        //                         <h2 className='text-lg text-gray-300'>{user.email} </h2>
        //                         <div className='flex gap-4 mt-4'>
        //                             <button className='bg-blue-500 text-white text-lg font-semibold rounded-xl px-4 py-2' onClick={() => navigate("/addtask")}>Add Task </button>
        //                             <button className='bg-red-600 text-white text-lg font-semibold rounded-xl px-4 py-2' onClick={handleLogout}>Logout </button>
        //                         </div>
        //                     </div>
        //                 </>
        //             )}
        //         </div>
        //     </div>

        //     {/* Posts Section */}
        //     <div className='w-full max-w-6xl   p-5 mt-5 border border-slate-600 bg-white/5 rounded-lg'>
        //         <h2 className='text-2xl text-gray-300 font-bold mb-5'>All Posts </h2>
        //         {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        //             {posts.map((post) => (
        //                 <div className='bg-white/10 text-gray-100 border-2 border-cyan-900 rounded-lg' key={post._id}>
        //                     <img className='w-full h-48 object-cover rounded-t-md mb-4' src={`http://localhost:3000/uploads/${post.image}`} alt={post.title} />
        //                     <h3 className='text-xl font-semibold text-gray-300 ms-4 capitalize'>{post.title} </h3>
        //                     <div className='flex gap-4 p-4'>
        //                         <button className='px-4 py-2 bg-red-500 text-white rounded-lg text-sm' onClick={() => handleDelete(post._id)}>Delete </button>
        //                         <button className='px-4 py-2 bg-teal-800 text-white rounded-lg text-sm' onClick={() => navigate(`/update/${post._id}`)}>Update </button>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div> */}

        //         <div className='flex  items-center pb-5 overflow-x-auto scroll-smooth  gap-4 P-2'>
        //             {posts.map((post) => (
        //                 <div className='min-w-[300px] max-w-[300px]  text-gray-100 border-2 border-cyan-900 rounded-lg flex-shrink-0' key={post._id}>
        //                     <img className='w-full h-48 object-cover rounded-t-md mb-4' src={`http://localhost:3000/uploads/${post.image}`} alt={post.title} />
        //                     <h3 className='text-xl font-semibold text-gray-300 ms-4 capitalize'>{post.title}</h3>
        //                     <div className='flex gap-4 p-4'>
        //                         <button className='px-4 py-2 bg-red-500 text-white rounded-lg text-sm' onClick={() => handleDelete(post._id)}>Delete</button>
        //                         <button className='px-4 py-2 bg-teal-800 text-white rounded-lg text-sm' onClick={() => navigate(`/update/${post._id}`)}>Update</button>
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div >
        <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-white'>
            <div className='w-full max-w-3xl p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-cyan-800'>
                <div className='flex flex-col md:flex-row items-center gap-6'>
                    {user && (
                        <>
                            <div className='w-full md:w-1/3 flex justify-center'>
                                <img className='w-32 h-32 object-cover border-4 border-cyan-500 rounded-full shadow-lg' src={`http://localhost:3000/uploads/${user.image}`} alt='User' />
                            </div>
                            <div className='w-full md:w-2/3 flex flex-col gap-3'>
                                <h1 className='text-3xl font-bold text-cyan-400'>{user.username}</h1>
                                <p className='text-lg text-gray-300'>{user.email}</p>
                                <div className='flex gap-4 mt-2'>
                                    <button className='bg-cyan-600 hover:bg-cyan-700 transition px-4 py-2 rounded-xl text-white font-medium' onClick={() => navigate("/addtask")}>Add Task</button>
                                    <button className='bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl text-white font-medium' onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className='w-full max-w-6xl mt-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-600'>
                <h2 className='text-2xl font-bold text-gray-200 mb-5'>All Posts</h2>
                <div className='flex overflow-x-auto scroll-smooth gap-5 pb-4'>
                    {posts.map((post) => (
                        <div className='min-w-[300px] max-w-[300px] bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-900 border border-cyan-700 rounded-xl shadow-md flex-shrink-0' key={post._id}>
                            <img className='w-full h-48 object-cover rounded-t-xl' src={`http://localhost:3000/uploads/${post.image}`} alt={post.title} />
                            <h3 className='text-xl font-semibold text-white px-4 mt-3 capitalize'>{post.title}</h3>
                            <div className='flex gap-3 p-4'>
                                <button className='flex-1 bg-red-500 hover:bg-red-600 transition text-white rounded-lg px-3 py-2 text-sm' onClick={() => handleDelete(post._id)}>Delete</button>
                                <button className='flex-1 bg-teal-600 hover:bg-teal-700 transition text-white rounded-lg px-3 py-2 text-sm' onClick={() => navigate(`/update/${post._id}`)}>Update</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}
export default Profile