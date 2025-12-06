import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineRefresh } from "react-icons/md";
import { useAuth } from "../UserAccount/UserAccountProvider.js";
import './UserAccount.css';
import axios from 'axios';

const PhoneVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { phoneNumber, token } = location.state || {};
    const { setIsAuthen, setUser, user } = useAuth();

    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");

    const [verificationCode, setVerificationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValidFirstName, setIsValidFirstName] = useState(false);
    const [isValidLastName, setIsValidLastName] = useState(false);

    const [timer, setTimer] = useState(90);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    const showNameInputs = !(user.firstName && user.lastName);

    useEffect(() => {
        if (!isResendDisabled) return;
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isResendDisabled]);

    const handleResendCode = async () => {
        setIsResendDisabled(true);
        setTimer(90);
        try {
            await axios.post('https://api.mrh-store.com/api/authorize/login', { login: phoneNumber });
        } catch (error) {
            console.error('خطا در ارسال مجدد کد:', error);
        }
    };

    const blurInput = (setInputValid, value) => {
        setInputValid(value.trim() === '');
    };

    const verifyCode = async () => {
        if (showNameInputs) {
            if (!firstName.trim()) return setIsValidFirstName(true);
            if (!lastName.trim()) return setIsValidLastName(true);
        }

        setLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.post('https://api.mrh-store.com/api/authorize/verify', {
                born_at: "",
                club: 0,
                code: verificationCode,
                lastname: lastName,
                marriage_at: "",
                name: firstName,
                token: token
            }, { headers: { 'Content-Type': 'application/json' } });

            if (response.data.ok) {
                localStorage.setItem('token', response.data.data);
                localStorage.setItem('userInfos', JSON.stringify({ firstName, lastName }));
                setUser({ firstName, lastName });
                setIsAuthen(true);
                navigate('/');
            } else {
                setErrorMessage(response.data.errors?.Code || 'مشکلی در ورود پیش آمد.');
            }
        } catch (error) {
            setErrorMessage('خطا در ارتباط با سرور.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="full-layout bg-full-screen-image login-page flex items-center justify-center">
            <div className="content-body w-full max-w-[350px] m-auto">
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
                        <form noValidate className="w-full mt-1 form-group mb-2 av-invalid px-4">
                            <div className="w-full p-0 flex justify-between items-center">
                                <div className="text-[#31eee8] text-[1rem]">اطلاعات ورود</div>
                                <div className="text-[#31eee8] text-clip">{phoneNumber}</div>
                                <button type="button" className="bg-[#b8c2cc] px-2 py-1 text-[#171420] rounded-lg text-sm" onClick={() => navigate(-1)}>برگشت</button>
                            </div>
                            {showNameInputs && (
                                <>
                                    <div className="form-group mb-3">
                                        <label className="form-control-label flex pr-1 w-full text-[#ccc] text-[1rem] mb-2">نام</label>
                                        <input
                                            name="firstName"
                                            placeholder="نام"
                                            required
                                            autoComplete="off"
                                            value={firstName}
                                            className={`form-control w-full bg-[#171420] outline-none border-0 rounded-lg py-2 px-3 placeholder:text-[#31eee8] text-sm  ${isValidFirstName && firstName.trim() === '' ? 'is-invalid' : ''}`}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            onBlur={(e) => blurInput(setIsValidFirstName, e.target.value)}
                                        />
                                        {isValidFirstName && firstName.trim() === '' && (
                                            <div className='invalid-feedback text-[#ea5455] text-sm'>الزامی می باشد</div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-control-label flex pr-1 w-full text-[#ccc] text-[1rem] mb-2">نام خانوادگی</label>
                                        <input
                                            name="lastName"
                                            placeholder="نام خانوادگی"
                                            required
                                            autoComplete="off"
                                            value={lastName}
                                            className={`form-control w-full bg-[#171420] outline-none border-0 rounded-lg py-2 px-3 placeholder:text-[#31eee8] text-sm  ${isValidLastName && lastName.trim() === '' ? 'is-invalid' : ''}`}
                                            onChange={(e) => setLastName(e.target.value)}
                                            onBlur={(e) => blurInput(setIsValidLastName, e.target.value)}
                                        />
                                        {isValidLastName && lastName.trim() === '' && (
                                            <div className='invalid-feedback text-[#ea5455] text-sm'>الزامی می باشد</div>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className="form-group w-full mt-5">
                                <div className="flex justify-between mb-4">
                                    <label className="form-control-label flex pr-1 w-full text-[#ccc] text-[1rem] mb-2">کد ارسالی</label>
                                    <button type="button" className={`${isResendDisabled ? 'text-[#31eee8] text-xl flex items-center ' : 'bg-[#28c76f] flex items-center rounded-md px-2 py-1 text-white'}`} onClick={handleResendCode} disabled={isResendDisabled}>
                                        <MdOutlineRefresh className={isResendDisabled ? "invisible" : "text-lg"} />
                                        <small className="text-nowrap">
                                            {isResendDisabled ? `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : 'ارسال مجدد'}
                                        </small>
                                    </button>
                                </div>
                                <input name="code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="کد ارسال شده" required="" autocomplete="off" id="code" type="text" className="form-control w-full bg-[#171420] outline-none border-0 rounded-lg py-2 px-3 text-center placeholder:text-[#31eee8] text-sm" />
                            </div>
                            <div class="my-4">
                                <button type="button" className="w-full submit-btn bg-[#31eee8] rounded-md pb-3 pt-2 text-sm" onClick={verifyCode} disabled={loading}>
                                    {loading ? 'در حال بررسی...' : 'ورود'}
                                </button>
                                {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                            </div>
                        </form>
                    </div>
                    {/* <div className="login-card-footer w-full">
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
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default PhoneVerification;
