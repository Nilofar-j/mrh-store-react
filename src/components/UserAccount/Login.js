import axios from 'axios';
import './UserAccount.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changePhoneNumberValueHandler = (e) => {
        setPhoneNumber(e.target.value);
    };
    const blurPhoneNumberInputHandler = () => {
        if (phoneNumber.trim() === '') {
            setIsValid(true);
        };
    };
    const validatePhoneNamberLogin = async (e) => {
        e.preventDefault();
        let phoneRegex = /^09\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setErrorMessage('شماره موبایل معتبر نیست');
            return;
        };
        setLoading(true);

        try {
            const response = await axios.post('https://api.mrh-store.com/api/authorize/login', { login: phoneNumber }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.ok) {
                console.log('ورود موفقیت‌آمیز:', response.data.data.token);
                navigate('/PhoneVerification', {
                    state: {
                        phoneNumber,
                        token: response.data.data.token,
                    },
                });
            } else {
                setErrorMessage(response.data.message || 'مشکلی در ورود پیش آمد.');
                alert(response.data.message, 'مشکلی در ورود پیش آمد.');
            };
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="full-layout bg-full-screen-image login-page">
            <div className="content-body flex items-center justify-center h-full w-full max-w-[350px] m-auto">
                <div className="card w-full bg-[#201c2a] p-4">
                    <div className="w-full pt-1 pb-1">
                        <div className="card-title">
                            <div className="position-absolute top-0 right-0">
                                <a aria-current="page" className="flex items-center text-white text-sm gap-2 login-header-back-home active" href="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    <div className="font-bold">صفحه اصلی</div>
                                </a>
                            </div>
                            <h4 className="text-center w-full pt-5">
                                <div className="w-full flex justify-center">
                                    <a href="/">
                                        <img src="https://mrh-store.com/static/media/logo.8ea9ff34.png" alt="logo" width="100px" />
                                    </a>
                                </div>
                            </h4>
                        </div>
                    </div>
                    <div className="text-center my-auto card-body">
                        <form noValidate method="get" className="w-full mt-6 form-group mb-2 av-invalid px-4">
                            <div className="form-group flex items-center flex-col mb-4">
                                <label className="mb-4 text-white">شماره موبایل</label>
                                <input
                                    name="login"
                                    dir="ltr"
                                    id="login"
                                    required
                                    autoComplete="off"
                                    type="text"
                                    value={phoneNumber}
                                    onChange={changePhoneNumberValueHandler}
                                    onBlur={blurPhoneNumberInputHandler}
                                    className={`form-control w-full bg-[#171420] outline-none border-0 rounded-lg py-2 px-3 ${isValid && phoneNumber.trim() === '' ? 'is-invalid' : ''}`}
                                />
                                {isValid && phoneNumber.trim() === '' && (
                                    <div className='invalid-feedback text-[#ea5455] text-sm'>الزامی می باشد</div>
                                )}
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <button type="button" onClick={validatePhoneNamberLogin} className="w-full submit-btn mt-2 mx-0 bg-[#31eee8] pb-3 pt-1 rounded-lg text-center text-sm" disabled={loading}>
                                    {loading ? 'لطفا صبر کنید...' : 'بررسی'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="login-card-footer w-full">
                        <div className="title text-sm w-[50%] bg-[#171420] cursor-pointer p-2 text-center rounded-lg m-auto text-white">شبکه های اجتماعی</div>
                        <div className="collapse">
                            <div className="card">
                                <div className="card-body">
                                    <div className="cardbox d-flex justify-content-center my-0">
                                        <a href="https://api.whatsapp.com/send/?phone=989010313531&amp;text&amp;app_absent=0" className="card instagram">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </a>
                                        <a href="https://t.me/mrhstoretelegram" className="card instagram">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </a>
                                        <a href="https://www.instagram.com/mr.h_store" className="card instagram">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
