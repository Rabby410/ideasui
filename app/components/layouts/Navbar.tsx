'use client'
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../ModeToggle";
// import { FiMenu, FiX } from "react-icons/fi"; // Importing icons for menu and close

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to close sidebar
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <nav className="container mx-auto w-full relative px-4 py-5 flex items-center justify-between">
                <Link href="/"><img src="/ideasui.png" alt="IdeasUI Logo" className="w-[180px] md:w-[320px]"/></Link>
                <div className="hidden md:flex gap-4 font-bold text-lg">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <Link href="/bd-news" className="hover:text-primary">BD News</Link>
                    <Link href="/software-development" className="hover:text-primary">Software Development</Link>
                </div>
                <div className="md:hidden">
                    {/* Displaying menu or close icon based on the sidebar state */}
                    {!isSidebarOpen ? (
                        <svg onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                        // <FiMenu onClick={toggleSidebar} className="text-2xl cursor-pointer" />
                    ) : (
                        <svg onClick={closeSidebar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        // <FiX onClick={closeSidebar} className="text-2xl cursor-pointer" />
                    )}
                </div>
                <ModeToggle />
            </nav>
            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
                    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow h-full">
                        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                            <h1 className="font-bold text-2xl dark:text-black"><Link href="/" onClick={closeSidebar}><img src="/ideasui.png" alt="IdeasUI Logo" className="w-[180px]"/></Link></h1>
                            <svg onClick={closeSidebar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x dark:text-black"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>

                            {/* <FiX onClick={closeSidebar} className="text-2xl cursor-pointer" /> */}
                        </div>
                        <div className="py-4">
                            <Link href="/bd-news" onClick={closeSidebar} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">BD News</Link>
                            <Link href="/software-development" onClick={closeSidebar} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Software Development</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
