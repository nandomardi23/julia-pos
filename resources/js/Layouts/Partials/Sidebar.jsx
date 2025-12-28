import React from "react";
import { usePage } from "@inertiajs/react";
import { IconBrandLaravel, IconBrandReact, IconX } from "@tabler/icons-react";
import LinkItem from "@/Layouts/Partials/LinkItem";
import LinkItemDropdown from "@/Layouts/Partials/LinkItemDropdown";
import Menu from "@/Utils/Menu";

export default function Sidebar({ sidebarOpen, mobileSidebarOpen = false, setMobileSidebarOpen }) {
    const { auth, app_settings: settings = {} } = usePage().props;
    const menuNavigation = Menu();

    const closeMobileSidebar = () => {
        if (setMobileSidebarOpen) {
            setMobileSidebarOpen(false);
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div className={`${sidebarOpen ? 'w-[260px]' : 'w-[100px]'} hidden lg:block min-h-screen overflow-y-auto border-r transition-all duration-300 bg-white dark:bg-gray-950 dark:border-gray-900`}>
                {sidebarOpen ? (
                    <>
                        <div className="flex items-center gap-3 px-6 py-2 h-16 border-b dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950">
                            {settings.store_logo ? (
                                <img 
                                    src={`/storage/settings/${settings.store_logo}`} 
                                    className="w-8 h-8 object-contain"
                                    alt="Logo"
                                />
                            ) : (
                                <div className="p-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                                    <IconBrandLaravel size={20} strokeWidth={2} />
                                </div>
                            )}
                            <div className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100 uppercase truncate">
                                {settings.store_name || 'KASIR'}
                            </div>
                        </div>
                        <div className="w-full p-3 flex items-center gap-4 border-b border-t dark:bg-gray-950/50 dark:border-gray-900">
                            <img src={auth.user.avatar ? auth.user.avatar : "https://ui-avatars.com/api/?name=" + auth.user.name} className="w-12 h-12 rounded-full" />
                            <div className="flex flex-col gap-0.5">
                                <div className="text-sm font-semibold capitalize text-gray-700 dark:text-gray-50">
                                    {auth.user.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {auth.user.email}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col overflow-y-auto">
                            {menuNavigation.map((item, index) => (
                                item.details.some(detail => detail.permissions === true) && (
                                    <div key={index}>
                                        <div className="text-gray-500 text-xs py-3 px-4 font-bold uppercase">
                                            {item.title}
                                        </div>
                                        {item.details.map((detail, indexDetail) => (
                                            detail.permissions === true && (
                                                detail.hasOwnProperty('subdetails') ? (
                                                    <LinkItemDropdown
                                                        key={indexDetail}
                                                        title={detail.title}
                                                        icon={detail.icon}
                                                        data={detail.subdetails}
                                                        access={detail.permissions}
                                                        sidebarOpen={sidebarOpen}
                                                    />
                                                ) : (
                                                    <LinkItem
                                                        key={indexDetail}
                                                        title={detail.title}
                                                        icon={detail.icon}
                                                        href={detail.href}
                                                        access={detail.permissions}
                                                        sidebarOpen={sidebarOpen}
                                                    />
                                                )
                                            )
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center items-center px-6 py-2 h-16 border-b dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950">
                            {settings.store_logo ? (
                                <img 
                                    src={`/storage/settings/${settings.store_logo}`} 
                                    className="w-7 h-7 object-contain"
                                    alt="Logo"
                                />
                            ) : (
                                <div className="p-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                                    <IconBrandLaravel size={18} strokeWidth={2} />
                                </div>
                            )}
                        </div>
                        <div className='w-full px-6 py-3 flex justify-center items-center gap-4 border-b bg-white dark:bg-gray-950/50 dark:border-gray-900'>
                            <img src={auth.user.avatar ? auth.user.avatar : "https://ui-avatars.com/api/?name=" + auth.user.name} className='w-8 h-8 rounded-full' />
                        </div>
                        <div className="w-full flex flex-col overflow-y-auto items-center justify-center">
                            {menuNavigation.map((link, i) => {
                                const visibleDetails = link.details.filter(
                                    (detail) => detail.permissions === true
                                );

                                if (!visibleDetails.length) {
                                    return null;
                                }

                                return (
                                    <div
                                        className="flex flex-col min-w-full items-center relative"
                                        key={i}
                                    >
                                        {visibleDetails.map((detail, x) =>
                                            detail.hasOwnProperty("subdetails") ? (
                                                <LinkItemDropdown
                                                    sidebarOpen={sidebarOpen}
                                                    key={x}
                                                    title={detail.title}
                                                    data={detail.subdetails}
                                                    icon={detail.icon}
                                                    access={detail.permissions}
                                                />
                                            ) : (
                                                <LinkItem
                                                    sidebarOpen={sidebarOpen}
                                                    key={x}
                                                    access={detail.permissions}
                                                    icon={detail.icon}
                                                    href={detail.href}
                                                    title={detail.title}
                                                />
                                            )
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* Mobile Sidebar Overlay */}
            <div 
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
                    ${mobileSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={closeMobileSidebar}
            />
            
            {/* Mobile Sidebar Drawer */}
            <div 
                className={`fixed inset-y-0 left-0 z-50 w-[280px] transform transition-transform duration-300 ease-in-out
                    ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    bg-white dark:bg-gray-950 border-r dark:border-gray-900 overflow-y-auto`}
            >
                {/* Header with close button */}
                <div className="flex items-center gap-3 px-4 py-3 h-16 border-b dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950">
                    <div className="flex items-center gap-2 flex-1">
                        {settings.store_logo ? (
                            <img 
                                src={`/storage/settings/${settings.store_logo}`} 
                                className="w-8 h-8 object-contain"
                                alt="Logo"
                            />
                        ) : (
                            <div className="p-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                                <IconBrandLaravel size={20} strokeWidth={2} />
                            </div>
                        )}
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase truncate">
                            {settings.store_name || 'KASIR'}
                        </div>
                    </div>
                    <button 
                        onClick={closeMobileSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
                    >
                        <IconX size={20} strokeWidth={1.5} />
                    </button>
                </div>
                
                {/* User Info */}
                <div className="w-full p-3 flex items-center gap-4 border-b dark:bg-gray-950/50 dark:border-gray-900">
                    <img 
                        src={auth.user.avatar ? auth.user.avatar : "https://ui-avatars.com/api/?name=" + auth.user.name} 
                        className="w-12 h-12 rounded-full" 
                    />
                    <div className="flex flex-col gap-0.5">
                        <div className="text-sm font-semibold capitalize text-gray-700 dark:text-gray-50">
                            {auth.user.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {auth.user.email}
                        </div>
                    </div>
                </div>
                
                {/* Menu Items */}
                <div className="w-full flex flex-col overflow-y-auto pb-20">
                    {menuNavigation.map((item, index) => (
                        item.details.some(detail => detail.permissions === true) && (
                            <div key={index}>
                                <div className="text-gray-500 text-xs py-3 px-4 font-bold uppercase">
                                    {item.title}
                                </div>
                                {item.details.map((detail, indexDetail) => (
                                    detail.permissions === true && (
                                        detail.hasOwnProperty('subdetails') ? (
                                            <LinkItemDropdown
                                                key={indexDetail}
                                                title={detail.title}
                                                icon={detail.icon}
                                                data={detail.subdetails}
                                                access={detail.permissions}
                                                sidebarOpen={true}
                                                onNavigate={closeMobileSidebar}
                                            />
                                        ) : (
                                            <LinkItem
                                                key={indexDetail}
                                                title={detail.title}
                                                icon={detail.icon}
                                                href={detail.href}
                                                access={detail.permissions}
                                                sidebarOpen={true}
                                                onNavigate={closeMobileSidebar}
                                            />
                                        )
                                    )
                                ))}
                            </div>
                        )
                    ))}
                </div>
            </div>
        </>
    );
}
