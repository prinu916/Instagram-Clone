import React from 'react';
import homepage from '../../assests/images/homepage.webp';

const Auth = ({ children }) => {
    return (
        <div className="w-full h-full">

            <div className="flex w-full h-screen md:w-2/3 py-8 mx-auto">

                <div className="hidden md:block my-10 h-full bg-no-repeat" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/logo192.png)` }}>
                    <img draggable="false" className="mr-[80px] mt-[1.8rem] ml-[155px]" src={homepage} alt="homepage" />
                </div>

                <div className="flex flex-col gap-3 w-full md:w-2/5">

                    {children}

                    <p className="text-center text-sm my-2">Get the app.</p>
                    <div className="flex gap-3 justify-center text-xs text-gray-500" >
                        <span className="inline-block px-3 py-2 border rounded">App Store</span>
                        <span className="inline-block px-3 py-2 border rounded">Google Play</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Auth