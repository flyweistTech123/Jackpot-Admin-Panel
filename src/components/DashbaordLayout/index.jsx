import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineRuleFolder } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { TbFileText } from "react-icons/tb";
import { PiCoins } from "react-icons/pi";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoGameControllerOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { TiChartPieOutline } from "react-icons/ti";
import { TiContacts } from "react-icons/ti";
import { BiGame } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { MdOutlineDeveloperMode } from "react-icons/md";
import { GrGamepad } from "react-icons/gr";
import { VscLaw } from "react-icons/vsc";
import { PiOfficeChair } from "react-icons/pi";



import img1 from '../../assets/images/logo.png'
import defaultAvatar from '../../assets/images/images.jpeg'
import { useAdmin } from "../../pages/Admin Profile/AdminContext";

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

  const { adminProfile, loading } = useAdmin();

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
      name: "Rules",
      icon: MdOutlineRuleFolder,
      path: "/rules"
    },
    {
      name: "Game Logs",
      icon: BiGame,
      path: "/game-logs"
    },
    {
      name: "Transaction List",
      icon: GrTransaction,
      path: "/transaction-list"
    },
    {
      name: "Coin System",
      icon: PiCoins,
      path: "/coin-system"
    },
    {
      name: "How To Play",
      icon: FaRegCirclePlay,
      path: "/how-to-play"
    },
    {
      name: "Responsible Gaming",
      icon: IoGameControllerOutline,
      path: "/responsible-gaming"
    },
    {
      name: "Powered By Company",
      icon: FaRegBuilding,
      path: "/powered-by-company"
    },
    {
      name: "RTP",
      icon: TiChartPieOutline,
      path: "/rtp"
    },
    {
      name: "Contact Details",
      icon: TiContacts,
      path: "/contact-details"
    },
    {
      name: "Help And Support",
      icon: BiSupport,
      path: "/help-and-support"
    },
    {
      name: "Privacy Policy",
      icon: MdOutlinePrivacyTip,
      path: "/privacy-policy"
    },
    {
      name: "Terms and Conditions",
      icon: TbFileText,
      path: "/terms-and-conditions"
    },
    {
      name: "Website",
      icon: CgWebsite,
      path: "/website",
      children: [
        {
          name: "Home Page",
          icon: GoHome,
          path: "/website/home-page"
        },
        {
          name: "Developer Page",
          icon: MdOutlineDeveloperMode,
          path: "/website/developer-page"
        },
        {
          name: "Game Page",
          icon: GrGamepad,
          path: "/website/game-page"
        },
        {
          name: "Legal Page",
          icon: VscLaw,
          path: "/website/legal-page"
        },
        {
          name: "Jobs Page",
          icon: PiOfficeChair,
          path: "/website/jobs-page"
        },
      ],
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


  const handleLogout = () => {
    localStorage.removeItem("adminProfile");
    sessionStorage.removeItem("token");
    navigate('/')
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
              <img
                src={img1}
                alt="Logo"
                className="w-[50px] h-[50px] object-contain rounded-full"
              />
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

          {/* Admin Profile Section */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right text-white">
              <p className="font-semibold">{adminProfile?.fullName || "Admin Name"}</p>
              <p className="text-xs opacity-80">{adminProfile?.email || "admin@email.com"}</p>
            </div>
            <div className="w-[50px] h-[50px] cursor-pointer rounded-full overflow-hidden border-2 border-white" onClick={() => navigate('/admin-details')}>
              <img
                src={adminProfile?.profilePicture || defaultAvatar}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 px-4 cursor-pointer py-2 bg-red-600 text-white text-xs rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-[90px] h-full  px-4 overflow-hidden flex-1">
          <div className="h-full overflow-auto hidescroll">
            <div className="flex flex-wrap gap-2 sm:gap-0 items-center justify-between">
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