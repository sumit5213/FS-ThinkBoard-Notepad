import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from "axios"
import axiosInstance from '../lib/axios'


function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [passwordMatchError, setPasswordMatchError] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)

    const navigate = useNavigate()

    const handleTogglePassword = () => {
        setShowPassword(prev => !prev)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const validatePassword = () => {
        if (isSignUp &&     password !== confirmPassword) {
            setPasswordMatchError("Password doesn't matched....")
            return false
        } else {
            setPasswordMatchError("")
            return true;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!validatePassword()) return;

            let res;
            if (isSignUp) {
                res = await axiosInstance.post("/auth/signup", {
                    email, password
                })
            }
            else {
                res = await axiosInstance.post("/auth/login", {
                    email,
                    password,
                });
            }
            localStorage.setItem("token", res.data.token)
            // onLogin();
            navigate("/home")


        } catch (error) {
            console.error('Authentication failed.', error.response?.data || error.message)
        }
    }

    return (
        <div className='min-h-screen bg-base-200 py-20'>
            <div className="card bg-primary/65 mx-auto text-primary-content w-96">
                <div className="card-body">
                    <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-white">
                        {isSignUp ? "SignUp" : "SignIn"} to your Account
                    </h2>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <form /*action="POST"*/ onSubmit={handleSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email "
                                        placeholder="Email id"
                                        className="input input-bordered text-primary"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        className="input input-bordered text-primary"
                                        placeholder="Enter your password..."
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                {isSignUp && (
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Confirm Password</span>
                                        </label>
                                        <input
                                            className="input input-bordered text-primary"
                                            placeholder="Confirm your password..."
                                            type={showPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />

                                        {passwordMatchError && <p className="text-red-500 text-sm mt-1">{passwordMatchError}</p>}

                                    </div>
                                )}


                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-2">
                                        <input
                                            type="checkbox"
                                            checked={showPassword}
                                            onChange={handleTogglePassword}
                                            className="checkbox checkbox-primary"
                                        />
                                        <span className="label-text text-white">Show Password</span>
                                    </label>
                                </div>

                                <div className="card-actions justify-end">
                                    <button type="submit" className="btn btn-primary hover:text-orange-400 text-black">
                                        {isSignUp ? "SignUp" : "SignIn"}
                                    </button>
                                </div>
                            </form>

                            {/* Toggle between the buttons */}
                            <p className="mt-4 text-center text-sm text-gray-600">
                                {isSignUp ? "Alredy have an account" : "Don't have an account"}{" "}
                                <button className='text-blue-500 hover:underline'
                                    type="button"
                                    onClick={() => setIsSignUp(!isSignUp)}>
                                    {isSignUp ? "SignIn" : "SignUp"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn