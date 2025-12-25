import React, { useEffect, useState } from 'react'
import Sidebar from '@/Layouts/Partials/Sidebar'
import Navbar from '@/Layouts/Partials/Navbar'
import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/Context/ThemeSwitcherContext';

export default function AppLayout({ children }) {

    // destruct darkMode and themeSwitcher from context
    const { darkMode, themeSwitcher } = useTheme();

    // define state sidebarOpen
    const [sidebarOpen, setSidebarOpen] = useState(
        localStorage.getItem('sidebarOpen') === 'true'
    );

    // define state mobileSidebarOpen (mobile)
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // define react hooks
    useEffect(() => {
        localStorage.setItem('sidebarOpen', sidebarOpen);
    }, [sidebarOpen])

    // Close mobile sidebar when screen becomes larger
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // define function toggleSidebar
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // define function toggleMobileSidebar
    const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

    return (
        <div className='min-h-screen flex overflow-y-auto'>
            <Sidebar 
                sidebarOpen={sidebarOpen} 
                mobileSidebarOpen={mobileSidebarOpen}
                setMobileSidebarOpen={setMobileSidebarOpen}
            />
            <div className='flex-1 flex flex-col min-h-screen'>
                <Navbar 
                    toggleSidebar={toggleSidebar} 
                    toggleMobileSidebar={toggleMobileSidebar}
                    themeSwitcher={themeSwitcher} 
                    darkMode={darkMode} 
                />
                <div className='w-full py-8 px-4 md:px-6 min-h-screen overflow-y-auto mb-14 md:mb-0'>
                    <Toaster position='top-right' />
                    {children}
                </div>
            </div>
        </div>
    )
}
