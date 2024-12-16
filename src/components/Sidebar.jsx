import {
    faHouse,
    faUsers,
    faClipboardCheck,
    faPills,
    faMoneyCheckAlt,
    faSignOutAlt,
    faReceipt,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { useLocation } from "react-router-dom";
  
  const Sidebar = () => {
    const location = useLocation()
    const currentPath = location.pathname
  
    return (
      <nav className="bg-white px-4 w-1/4">
        <div className="sidebar-header">
          <img src="logo.png" alt="logo" />
        </div>
        <ul className="sidebar-menu">
          <li>
            <a
              href="/dashboard"
              className={`${currentPath === "/dashboard" ? "active" : ""}`}
            >
              <div className="flex flex-row items-center justify-start w-full">
                <FontAwesomeIcon icon={faHouse} className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/kehadiran"
              className={`${currentPath === "/kehadiran" ? "active" : ""}`}
            >
              <div className="flex flex-row items-center justify-start w-full">
                <FontAwesomeIcon icon={faReceipt} className="w-4 h-4" />
                <span>Kehadiran</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/karyawan"
              className={`${currentPath === "/karyawan" ? "active" : ""}`}
            >
              <div className="flex flex-row items-center justify-start w-full">
                <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
                <span>Karyawan</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/cuti"
              className={`${currentPath === "/cuti" ? "active" : ""}`}
            >
              <div className="flex flex-row items-center justify-start w-full">
                <FontAwesomeIcon icon={faClipboardCheck} className="w-4 h-4" />
                <span>Cuti Karyawan</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/obat"
              className={`${currentPath === "/obat" ? "active" : ""}`}
            >
              <div className="flex flex-row items-center justify-start w-full">
                <FontAwesomeIcon icon={faPills} className="w-4 h-4" />
                <span>Obat</span>
              </div>
            </a>
          </li>
          {/* <li>
            <a
              href="/laporan"
              className={`${currentPath === "/laporan" ? "active" : ""}`}
            >
              <div className="flex flex-row items-center justify-start w-full">
                <FontAwesomeIcon icon={faPills} className="w-4 h-4" />
                <span>Laporan Obat</span>
              </div>
            </a>
          </li> */}
          <li>
            <a
              href="/payroll"
              className={`${currentPath === "/payroll" ? "active" : ""}`}
            >
              <div className="flex flex-row items-center justify-start w-full">
                <FontAwesomeIcon icon={faMoneyCheckAlt} className="w-4 h-4" />
                <span>Payroll</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/logout"
              className={`${currentPath === "/logout" ? "active" : ""}`}
            >
              <div className="flex flex-row items-center justify-start w-full">
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                <span>Logout</span>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Sidebar;  