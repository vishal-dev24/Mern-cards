import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ username: '', email: '', password: '', image: null, })

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', formData.username)
        data.append('email', formData.email)
        data.append('password', formData.password)
        data.append('image', formData.image)
        await axios.post('http://localhost:3000/register', data, { withCredentials: true })
        setFormData({ username: '', email: '', password: '', image: null, })
        navigate('/login')
    }

    return (
        <div className='min-h-screen flex justify-center items-start bg-gray-900 text-gray-100 '>
            <div className='w-full max-w-sm px-8 py-5 mt-20 rounded-lg shadow-md border border-slate-500 '>
                <h1 className='text-3xl font-semibold mb-3 text-gray-100 text-center'>Register !</h1>
                <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
                    <input className='px-4 py-3 m-2 text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 bg-slate-900 capitalize focus:outline-none border border-slate-500 rounded-lg bg-slate-200 w-full' onChange={handleChange} value={formData.username} type="text" name="username" placeholder='enter your name' required />
                    <input className='px-4 py-3 m-2 text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 bg-slate-900 capitalize focus:outline-none border border-slate-500 rounded-lg bg-slate-200 w-full' onChange={handleChange} value={formData.email} type="email" name="email" placeholder='enter your email' required />
                    <input className='px-4 py-3 m-2 text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 bg-slate-900 capitalize focus:outline-none border border-slate-500 rounded-lg bg-slate-200 w-full' onChange={handleChange} value={formData.password} type="password" name="password" placeholder='enter your password' required />
                    <input className='px-3 py-2 m-2 text-lg placeholder:text-gray-200 font-semibold hover:border-teal-600 capitalize focus:outline-none border border-slate-500 rounded-lg bg-slate-900 w-full
                     file:mr-3 file:px-4 file:py-2 file:text-sm file:rounded-full file:border-1 file:border-white file:bg-cyan-700 file:text-white hover:file:bg-cyan-600    ' onChange={handleChange} type="file" name="image" required />
                    <button className='p-2.5 m-2 text-xl text-gray-200 font-semibold hover:bg-slate-800 capitalize border border-slate-4500 rounded-lg bg-slate-900 w-full' type='submit'>Submit</button>
                    <p onClick={() => navigate('/login')} className='text-center text-slate-100 cursor-pointer text-lg hover:text-violet-500 mt-3'>if You Are Already Register , then Login</p>
                </form>
            </div>
        </div>
    )
}

export default Register
