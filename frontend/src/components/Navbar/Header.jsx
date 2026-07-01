import React, { useEffect, useState } from 'react'
import { exploreOutline, homeFill, homeOutline, likeFill, likeOutline, messageFill, messageOutline, postUploadOutline } from './SvgIcons'
import { Link, useLocation } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import Notifications from './Notifications';
import NewPost from './NewPost';
import { useSelector } from 'react-redux';
import SearchBox from './SearchBar/SearchBox';
import { ClickAwayListener } from '@mui/material';

const Header = () => {

    const { user } = useSelector((state) => state.user);

    const [profileToggle, setProfileToggle] = useState(false)
    const [newPost, setNewPost] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchTrigger, setSearchTrigger] = useState(false);

    const location = useLocation();
    const [onHome, setOnHome] = useState(false);
    const [onChat, setOnChat] = useState(false);

    useEffect(() => {
        setOnHome(location.pathname === "/")
        setOnChat(location.pathname.split('/').includes("direct"))
    }, [location]);

    return (
        <nav className="fixed top-0 w-full border-b bg-white z-10">
            {/* <!-- navbar container --> */}
            <div className="flex flex-row justify-between items-center py-2 px-3.5 sm:w-full sm:py-2 sm:px-4 md:w-full md:py-2 md:px-6 xl:w-4/6 xl:py-3 xl:px-8 mx-auto">

                {/* <!-- logo --> */}
                <Link to="/"><img draggable="false" className="mt-1.5 h-8 w-auto max-w-[140px] object-contain" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram logo" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `${process.env.PUBLIC_URL}/logo192.png`; }} /></Link>

                <SearchBox triggerSearch={searchTrigger} />

                {/* <!-- icons container  --> */}
                <div className="relative flex items-center space-x-6 sm:mr-5">
                    <Link to="/">{profileToggle || !onHome ? homeOutline : homeFill}</Link>

                    <Link to="/direct/inbox">{onChat ? messageFill : messageOutline}</Link>

                    <button type="button" onClick={() => setNewPost(true)} className="cursor-pointer focus:outline-none">{postUploadOutline}</button>

                    <button type="button" onClick={() => setSearchTrigger((prev) => !prev)} className="hidden sm:block cursor-pointer focus:outline-none" aria-label="Explore">{exploreOutline}</button>
                    <button type="button" onClick={() => setShowNotifications((prev) => !prev)} className="hidden sm:block cursor-pointer focus:outline-none" aria-label="Activity Feed">{likeOutline}</button>

                    <div onClick={() => setProfileToggle(!profileToggle)} className={`${profileToggle && 'border-black border' || (!onHome && !onChat) && 'border-black border'} rounded-full cursor-pointer h-7 w-7 p-[0.5px]`}><img draggable="false" loading="lazy" className="w-full h-full rounded-full object-cover" src={user.avatar} alt="" /></div>

                    {showNotifications && <Notifications />}
                </div>

                {profileToggle &&
                    <ProfileDetails setProfileToggle={setProfileToggle} />
                }

                <NewPost newPost={newPost} setNewPost={setNewPost} />

            </div>
        </nav>
    )
}

export default Header