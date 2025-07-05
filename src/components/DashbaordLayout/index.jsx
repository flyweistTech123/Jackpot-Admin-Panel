import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineCalendarToday } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TiPen } from "react-icons/ti";
import { MdOutlineCategory } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { PiImageSquareBold } from "react-icons/pi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdNotificationsNone } from "react-icons/md";
import { MdOutlineBuild } from "react-icons/md";
import { MdOutlineAutoStories } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaHourglassHalf, } from "react-icons/fa";
import { TbUserOff } from "react-icons/tb";
import { MdOutlineLiveHelp } from "react-icons/md";
import { MdOutlineLocalActivity } from "react-icons/md";

import img1 from '../../assets/images/logo.png'
import img2 from '../../assets/images/Adviser1.png'

/**
 * Dashboard Layout Component
 *
 * A responsive layout component that provides a consistent structure for dashboard pages
 * with a collapsible sidebar navigation, header, and main content area.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render in the main content area
 */
const DashbaordLayout = ({ children, title = "", hedartitle = "", titleAction = null, headerAction = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      icon: MdOutlineDashboard,
      path: "/dashboard"
    },
    {
      name: "User",
      icon: LuUsersRound,
      path: "/users"
    },
    {
      name: "Adviser",
      icon: LiaChalkboardTeacherSolid,
      path: "/adviser",
      children: [
        {
          name: "Adviser List",
          icon: LiaChalkboardTeacherSolid,
          path: "/adviser/list"
        },
        {
          name: "Pending Request",
          icon: FaHourglassHalf,
          path: "/adviser/pending"
        },
        {
          name: "Suspended",
          icon: TbUserOff,
          path: "/adviser/suspended"
        },
      ],
    },
    {
      name: "Appointment",
      icon: MdOutlineCalendarToday,
      path: "/appointment"
    },
    {
      name: "Completed",
      icon: IoMdCheckmarkCircleOutline,
      path: "/completed-calls"
    },
    {
      name: "Earning",
      icon: RiMoneyRupeeCircleLine,
      path: "/earning"
    },
    {
      name: "Blogs",
      icon: TiPen,
      path: "/blog"
    },
    {
      name: "Category",
      icon: MdOutlineCategory,
      path: "/category",
      children: [
        {
          name: "Category",
          icon: MdOutlineCategory,
          path: "/category/list"
        },
        {
          name: "Skills",
          icon: MdOutlineLiveHelp,
          path: "/category/skills"
        },
      ],
    },
    {
      name: "Team Management",
      icon: BiSupport,
      path: "/team-management",
      children: [
        {
          name: "Team List",
          icon: MdOutlineLocalActivity,
          path: "/team-management/list"
        },
        {
          name: "Team Role",
          icon: MdOutlineLiveHelp,
          path: "/team-management/role"
        },
      ],
    },
    {
      name: "Banner Management",
      icon: PiImageSquareBold,
      path: "/banner-management"
    },
    {
      name: "Withdrawal",
      icon: BiMoneyWithdraw,
      path: "/withdrawal",
      children: [
        {
          name: "Withdrawal Request ",
          icon: MdOutlineLocalActivity,
          path: "/withdrawal/request"
        },
        {
          name: "Withdraw Method",
          icon: MdOutlineLiveHelp,
          path: "/withdrawal/method"
        },
        {
          name: "Wallet History",
          icon: MdOutlineLiveHelp,
          path: "/withdrawal/history"
        },
      ],
    },
    {
      name: "Notifications",
      icon: MdNotificationsNone,
      path: "/notification"
    },
    {
      name: "Support Management",
      icon: BiSupport,
      path: "/support-management",
      children: [
        {
          name: "Ticket",
          icon: MdOutlineLocalActivity,
          path: "/support-management/ticket"
        },
        {
          name: "Faq",
          icon: MdOutlineLiveHelp,
          path: "/support-management/faq"
        },
        {
          name: "Delete Request",
          icon: MdOutlineLiveHelp,
          path: "/support-management/delete-request"
        },
      ],

    },
    {
      name: "General Setting",
      icon: MdOutlineBuild,
      path: "/general-setting"
    },
    {
      name: "Page Management",
      icon: MdOutlineAutoStories,
      path: "/page-management"
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleSubmenu = (menuName) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`bg-white fixed top-0 left-0 z-40 h-full w-[260px]  pt-[90px] transition-transform duration-300 ease-in-out shadow-2xl
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-[240px]`}
      >
        {/* Close button on mobile */}
        <div className="absolute top-4 right-4 md:hidden z-50">
          <button onClick={toggleMobileMenu}>
            <FiX size={24} />
          </button>
        </div>

        <nav className="h-full overflow-y-auto px-4 hidescroll">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-5">
                <div
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => {
                    if (item.children) {
                      toggleSubmenu(item.name);
                    } else {
                      navigate(item.path);
                      if (windowWidth < 768) setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`  flex justify-center items-center transition-all duration-200 font-semibold
              ${location.pathname === item.path || location.pathname.includes(item.path)
                          ? " text-[#FFB000]"
                          : "text-[#00000080]  group-hover:text-[#FFB000]"
                        }`}
                    >
                      <item.icon size={20} />
                    </div>
                    <span
                      className={`font-poppins font-[600] leading-[150%] ml-3 text-[16px] ${location.pathname === item.path || location.pathname.includes(item.path)
                        ? "text-[#FFB000]"
                        : "text-[#00000080] group-hover:text-[#FFB000]"
                        }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {item.children && (
                    <IoIosArrowDown
                      className={`
    w-4 h-4 ml-2 transition-transform duration-300
    ${openSubmenus[item.name]
                          ? "rotate-180 text-[#FFB000]"
                          : "text-[#6B7280] group-hover:text-[#FFB000]"
                        }`}
                    />
                  )}
                </div>

                {/* Submenu */}
                {item.children && openSubmenus[item.name] && (
                  <ul className="space-y-2 bg-[#ECF0F5] rounded-[12px] p-2.5 mt-3">
                    {item.children.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.path}
                          onClick={() => windowWidth < 768 && setIsMobileMenuOpen(false)}
                        >
                          <div className="group flex items-center">
                            <div
                              className={` rounded-full flex justify-center items-center transition-all duration-200 
              ${location.pathname === subItem.path
                                  ? "text-[#FFB000]"
                                  : "text-[#00000080]  group-hover:text-[#FFB000]"
                                }`}
                            >
                              <subItem.icon size={18} />
                            </div>
                            <span
                              className={`font-urbanist font-[500] leading-[150%] ml-3 text-[16px] transition-all ${location.pathname === subItem.path
                                ? "text-[#FFB000]"
                                : "text-[#00000080] hover:text-[#FFB000]"
                                }`}
                            >
                              {subItem.name}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>

                )}
              </li>
            ))}
          </ul>

        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && windowWidth < 768 && (
        <div
          className="fixed inset-0 bg-white bg-opacity-40 z-30"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Main content section */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="fixed rounded-2xl top-2 left-2 right-2 h-[72px] z-40 bg-black px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-white mr-2"
              onClick={toggleMobileMenu}
            >
              <FiMenu size={24} />
            </button>
            <div className="bg-white w-[60px] h-[60px] rounded-full flex items-center justify-center">
              <img src={img1} alt="Logo" className="w-[50px] h-[50px] object-contain rounded-full" />
            </div>
            <div className="text-white font-bold text-xl leading-tight uppercase">
              Jackpot<br />Admin
            </div>
            <div className="text-white text-sm ml-6 hidden sm:flex items-center gap-1">
              <span>Home</span>
              <span>{'>'}</span>
              <span>{hedartitle}</span>
            </div>
          </div>
          <div className="bg-white w-[50px] h-[50px] rounded-full cursor-pointer">
            <img src={img2} alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-[90px] h-full  px-4 overflow-hidden flex-1">
          <div className="h-full overflow-auto hidescroll">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {titleAction}
                <h2 className="font-urbanist text-[18px] font-[600] text-[#0A0E15] whitespace-nowrap">
                  {title}
                </h2>
              </div>
              <div className="">
                {headerAction}
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
};



export default DashbaordLayout;