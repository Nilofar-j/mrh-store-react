import { useEffect, useState } from 'react';
import { useAuth } from '../UserAccountProvider.js';
import { Link } from 'react-router-dom';
import './UserPanel.css';
import axios from 'axios';


const Profile = () => {
    const [activeItem, setActiveItem] = useState(0);
    const { isAuthen, handleLogout, user } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const storedUserInfo = JSON.parse(localStorage.getItem("userInfos")) || {};
    const storedDateInfo = JSON.parse(localStorage.getItem("dateInfos")) || {};

    const [firstName, setFirstName] = useState(storedUserInfo.firstName || "");
    const [lastName, setLastName] = useState(storedUserInfo.lastName || "");
    const [bornDate, setBornDate] = useState(storedDateInfo.bornDate || "");
    const [marridDate, setMarridDate] = useState(storedDateInfo.marridDate || "");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // useEffect(() => {
    //     axios.get("https://api.mrh-store.com/api/customer/profile/change/personal-information", {
    //         headers: {
    //             Authorization: `${localStorage.getItem("token")}`,
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((response) => {
    //             setFirstName(response.data.firstName);
    //             setLastName(response.data.lastName);
    //             setBornDate(response.data.born_at);
    //             setMarridDate(response.data.marriage_at);
    //             const updatedUserInfo = { firstName: response.data.firstName, lastName: response.data.lastName };
    //             localStorage.setItem("userInfos", JSON.stringify(updatedUserInfo));
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching profile:", error);
    //         });
    // }, []);

    if (isAuthen === null) {
        return null;
    };
    const handleActiveItem = (index) => {
        setActiveItem(index)
    };


    const handleUpdateUserInfos = async () => {
        setLoading(true);
        setError("");
        try {
            await axios.post(
                "https://api.mrh-store.com/api/customer/profile/change/personal-information",
                {
                    club: 1,
                    marriage_at: marridDate,
                    born_at: bornDate,
                    name: firstName,
                    lastname: lastName,
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const updatedUserInfo = { firstName, lastName };
            localStorage.setItem("userInfos", JSON.stringify(updatedUserInfo));
            const updatedDateInfos = { bornDate, marridDate };
            localStorage.setItem("dateInfos", JSON.stringify(updatedDateInfos));
            alert("اطلاعات با موفقیت بروزرسانی شد!");
            setShowModal(false);
        } catch (err) {
            setError("خطا در بروزرسانی اطلاعات!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="wrapper vertical-layout theme-primary navbar-floating">
                <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow theme-primary collapsed bg-[#201c2a] px-1">
                    <div className="navbar-header px-3 pt-4">
                        <ul className="nav navbar-nav flex items-center">
                            <li className="nav-item ml-auto">
                                <a aria-current="page" className="navbar-brand active" href="/">
                                    <h2 class="brand-text text-[1.57rem]">MR-H</h2>
                                </a>
                            </li>
                            <li className="nav-item nav-toggle cursor-pointer">
                                <div className="nav-link modern-nav-toggle">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toggle-icon icon-x d-none d-xl-block font-medium-4 text-primary" data-tour="toggle-icon"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                                </div>
                            </li>
                        </ul>
                        <div className="shadow-bottom d-none"></div>
                    </div>
                    <div className="scrollbar-container main-menu-content overflow-hidden mt-4">
                        <ul className="navigation navigation-main p-0 m-0">
                            <li className={`nav-item ${activeItem === 0 ? "active" : ""}`} onClick={() => handleActiveItem(0)}>
                                <Link to="/customer/dashboard">
                                    <div className="menu-text flex items-center text-base">
                                        <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                        <span className="menu-item menu-title">داشبورد</span>
                                    </div>
                                </Link>
                            </li>
                            <li className={`nav-item ${activeItem === 1 ? "active" : ""}`} onClick={() => handleActiveItem(1)}>
                                <Link to="/customer/favorite">
                                    <div className="menu-text flex items-center text-base">
                                        <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                        <span className="menu-item menu-title">علاقه مندی ها</span>
                                    </div>
                                </Link>
                            </li>
                            <li className={`nav-item ${activeItem === 2 ? "active" : ""}`} onClick={() => handleActiveItem(2)}>
                                <a href="#">
                                    <div className="menu-text flex items-center text-base">
                                        <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                        <span className="menu-item menu-title">سفارشات</span>
                                    </div>
                                </a>
                            </li>
                            <li className={`nav-item ${activeItem === 3 ? "active" : ""}`} onClick={() => handleActiveItem(3)}>
                                <a href="#">
                                    <div className="menu-text flex items-center text-base">
                                        <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                        <span className="menu-item menu-title">نظرات</span>
                                    </div>
                                </a>
                            </li>
                            <li className={`nav-item ${activeItem === 4 ? "active" : ""}`} onClick={() => handleActiveItem(4)}>
                                <a href="#">
                                    <div className="menu-text flex items-center text-base">
                                        <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                                        <span className="menu-item menu-title">آدرس</span>
                                    </div>
                                </a>
                            </li>
                            <li className={`nav-item ${activeItem === 5 ? "active" : ""}`} onClick={() => handleActiveItem(5)}>
                                <a href="#">
                                    <div className="menu-text flex items-center text-base">
                                        <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                                        <span className="menu-item menu-title">فاکتور ها</span>
                                    </div>
                                </a>
                            </li>
                            <li className={`nav-item ${activeItem === 6 ? "active" : ""}`} onClick={() => handleActiveItem(6)}>
                                <Link to="/customer/profile">
                                    <div className="menu-text flex items-center text-base">
                                        <svg className='ml-4' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        <span className="menu-item menu-title">پروفایل</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="app-content content">
                    <div className="content-overlay"></div>
                    <div className="header-navbar-shadow"></div>
                    <nav className="header-navbar navbar navbar-shadow navbar-light floating-nav bg-[#201c2a]">
                        <div class="navbar-wrapper flex justify-end text-[#31eee8]">
                            <div className="relative">
                                <div className="user-nav flex items-center gap-2 relative cursor-pointer pt-4 pl-4" onClick={() => setShowDropdown(!showDropdown)}>
                                    <a href='/' className='text-xl ml-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    </a>
                                    <span className='text-base'>{storedUserInfo.firstName} {storedUserInfo.lastName}</span>
                                </div>
                                <div className={`dropdown-menu absolute z-10 ${showDropdown ? 'show' : ""}`}>
                                    <Link to="/customer/profile" className="dropdown-item flex items-center gap-4 px-3 pt-2 pb-1">
                                        <span>
                                            <svg className='text-2xl' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </span>
                                        <span className="align-middle">پروفایل</span>
                                    </Link>
                                    <div tabindex="-1" class="dropdown-divider"></div>
                                    <Link to="/" className="dropdown-item flex items-center gap-3 px-3 pt-1 pb-3">
                                        <span>
                                            <svg className='text-xl' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                                        </span>
                                        <span className="align-middle" onClick={handleLogout}>خروج</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="content-wrapper">
                        <div className="content-header flex items-center justify-start">
                            <h1 className="content-header-title text-white text-3xl font-sans py-2 pe-4">پروفایل</h1>
                            <span className="breadcrumb-item border-r border-r-[#d6dbe1] text-[#31eee8] self-end py-2 ps-4">
                                <Link to="/customer/dashboard">داشبورد</Link>
                            </span>
                        </div>

                        <div className="flex">
                            <div className="nav-vertical mt-6 me-10">
                                <ul className="account-settings-tab nav-tabs inline-flex flex-col gap-y-1 text-[#31eee8]">
                                    <li className="nav-item cursor-pointer">
                                        <a className="active nav-link flex items-center bg-[#201c2a] ps-3 pe-4 pt-2 pb-3">
                                            <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                            <span className="d-md-inline-block d-none align-middle text-sm text-nowrap">اطلاعات شخصی</span>
                                        </a>
                                    </li>
                                    <li className="nav-item cursor-pointer">
                                        <a className="nav-link flex items-center ps-3 pe-4 bg-[#201c2a] pt-2 pb-3">
                                            <svg className='me-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                                            <span className="d-md-inline-block d-none align-middle text-sm text-nowrap">اطلاعات ورود</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="custom-calck card bg-[#201c2a] rounded-md mt-6 w-[80%]">
                                <div className="card-body p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <button className="bg-[#31eee8] text-sm font-sans px-4 py-4 rounded-md">
                                                <span>سطح کاربر :</span>
                                                <span className="ms-2 text-white">معمولی</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button className="bg-[#28c76f] text-sm font-sans px-4 py-4 text-white rounded-md">
                                                <span>امتیاز :</span>
                                                <span className="ms-2">0 تومان</span>
                                            </button>
                                        </div>
                                    </div>
                                    <form novalidate action="#" method="GET" className="flex flex-col mt-8" onSubmit={(e) => e.preventDefault()}>
                                        <div className="flex flex-row gap-x-5">
                                            <div class="form-group flex-1">
                                                <label for="firstName" className="text-[#ccc] mb-3 inline-block">نام</label>
                                                <input name="firstName" id="firstName" type="text" className="form-control bg-[#171420] text-[#31eee8] border border-[#e0e0e0] rounded-md pt-2 pb-3 px-3 w-full  focus:border-[#31eee8]" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                                <div class="valid-feedback invisible">الزامی می باشد</div>
                                            </div>
                                            <div class="form-group flex-1">
                                                <label for="lastName" className="text-[#ccc] mb-3 inline-block">نام خانوادگی</label>
                                                <input name="lastName" id="lastName" type="text" className="form-control bg-[#171420] text-[#31eee8] border border-[#e0e0e0] rounded-md pt-2 pb-3 px-3 w-full focus:border-[#31eee8]" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                                <div class="valid-feedback invisible">الزامی می باشد</div>
                                            </div>
                                        </div>
                                        <div className="w-[50%]">
                                            <div className="flex items-center justify-center pb-2">
                                                <label className="text-[#ccc] text-sm">عضویت در باشگاه مشتریان</label>
                                                <input className="ms-2" type="checkbox" id="switch" disabled="" checked="" />
                                            </div>

                                            <div className="flex flex-row items-center justify-center gap-x-6 mt-4">
                                                <div class="flex-col form-group">
                                                    <label for="mobile" className="text-[#ccc] mb-3 inline-block">تاریخ ازدواج</label>
                                                    <div class="DatePicker" role="presentation">
                                                        <input dir="rtl" type="date" name="marridDate" placeholder="انتخاب تاریخ" className="form-control bg-[#171420] text-[#31eee8] border border-[#e0e0e0] rounded-md pt-2 pb-3 px-3 w-full text-sm text-center DatePicker__inputcls" aria-label="انتخاب تاریخ" value={marridDate} onChange={(e) => setMarridDate(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div class="flex-col form-group">
                                                    <label for="mobile" className="text-[#ccc] mb-3 inline-block">تاریخ تولد</label>
                                                    <div class="DatePicker " role="presentation">
                                                        <input dir="rtl" type="date" name="bornDate" placeholder="انتخاب تاریخ" className="form-control bg-[#171420] text-[#31eee8] border border-[#e0e0e0] rounded-md pt-2 pb-3 px-3 w-full text-sm text-center DatePicker__input" aria-label="انتخاب تاریخ" value={bornDate} onChange={(e) => setBornDate(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-[70%] my-6">
                                            <button className="bg-[#31eee8] rounded-md pt-2 pb-3 text-center w-full inline-block text-black font-sans" onClick={() => setShowModal(true)}>بروزرسانی</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className={`modal-wrapper fixed top-0 right-0 w-full h-[105vh] z-20 flex items-center justify-center ${showModal ? "show" : ""}`}>
                <div className="modal-dialog w-[500px] m-auto">
                    <div className="modal-content bg-[#171420] rounded-md">
                        <div className="modal-header bg-[#201c2a] text-white rounded-md p-3 relative">
                            <h5>ثبت اطلاعات</h5>
                            <button type="button" className="close text-2xl bg-[#171420] p-1 absolute top-[-10px] left-[-10px] w-[30px] h-[30px] flex items-center justify-center rounded-md" aria-label="Close" onClick={() => setShowModal(false)}>
                                <span className="pb-1" aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body text-[#31eee8] text-right p-3">
                            <p>آیا از صحت اطلاعات خود اطمینان دارید؟</p>
                        </div>
                        <div className="modal-footer flex items-center justify-end p-2">
                            <button type="button" className="bg-Primary btn btn-Primary text-[#b8b8b8] me-5" onClick={() => setShowModal(false)}>بستن</button>
                            <button type="button" className="bg-warning btn btn-warning bg-[#ff9f43] px-8 py-2 text-center rounded-md text-white" disabled={loading} onClick={handleUpdateUserInfos}>
                                {loading ? "در حال بروزرسانی..." : " ثبت"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Profile;

// const Profile = () => {
//     const storedUserInfo = JSON.parse(localStorage.getItem("userInfos")) || {};
//     const [firstName, setFirstName] = useState(storedUserInfo.firstName || "");
//     const [lastName, setLastName] = useState(storedUserInfo.lastName || "");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         axios.get("https://api.mrh-store.com/api/customer/profile/change/personal-information", {
//             headers: {
//                 Authorization: `${localStorage.getItem("token")}`,
//                 "Content-Type": "application/json",
//             },
//         })
//             .then((response) => {
//                 setFirstName(response.data.firstName);
//                 setLastName(response.data.lastName);

//                 const updatedUserInfo = { firstName: response.data.firstName, lastName: response.data.lastName };
//                 localStorage.setItem("userInfos", JSON.stringify(updatedUserInfo));
//             })
//             .catch((error) => {
//                 console.error("Error fetching profile:", error);
//             });
//     }, []);

//     const handleUpdate = async () => {
//         setLoading(true);
//         setError("");

//         try {
//             await axios.post(
//                 "https://api.mrh-store.com/api/customer/profile/change/personal-information",
//                 {
//                     club: 1,
//                     marriage_at: "1403/11/16",
//                     born_at: "1403/11/16",
//                     name: firstName,
//                     lastname: lastName,
//                 },
//                 {
//                     headers: {
//                         Authorization: `${localStorage.getItem("token")}`,
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             const updatedUserInfo = { firstName, lastName };
//             localStorage.setItem("userInfos", JSON.stringify(updatedUserInfo));
//             alert("اطلاعات با موفقیت بروزرسانی شد!");
//         } catch (err) {
//             setError("خطا در بروزرسانی اطلاعات!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h2>ویرایش پروفایل</h2>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <label>نام:</label>
//             <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//             <label>نام خانوادگی:</label>
//             <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
//             <button onClick={handleUpdate} disabled={loading}>
//                 {loading ? "در حال بروزرسانی..." : "ذخیره تغییرات"}
//             </button>
//         </div>
//     );
// };

// export default Profile;
