import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { PayrollRepository } from "../data/repository/PayrollRepository";
import Sidebar from "./Sidebar";
import { v4 as uuid } from "uuid";
import { redirect } from "react-router-dom";
import { UserRepository } from "../data/repository/UserRepository";
// import { db } from "../firebaseConfig"; // Import Firestore instance

const Content = ({
  showForm,
  name,
  userId,
  role,
  month,
  base,
  tunjangan,
  insentif,
  total,
  handleNameChange,
  handleUserIdChange,
  handleRoleChange,
  handleMonthChange,
  handleBaseChange,
  handleTunjanganChange,
  handleInsentifChange,
  handleTotalChange,
  handleCancelClicked,
  handleSaveClicked,
  search,
  handleSearchChange,
  handleAddClicked,
  payrolls,
  handlePrintClick,
  handleAmbilClicked,
  handleEditClicked,
  handleDeleteClicked,
  status,
}) => {
  if (showForm != null) {
    return (
      <div className="flex flex-col gap-4 justify-start items-start p-8">
        <div className="flex flex-col items-start w-full gap-2">
          <span>Nama Karyawan</span>
          <input
            type="text"
            placeholder="Masukkan Nama Karyawan"
            value={name}
            onChange={handleNameChange}
            className="flex w-full bg-gray-50"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <span>User ID</span>
          <input
            component="input"
            type="text"
            placeholder="Masukkan User Id"
            value={userId}
            onChange={handleUserIdChange}
            className="bg-gray-50"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <span>Jabatan</span>
          <input
            component="input"
            type="text"
            placeholder="Masukkan Jabatan"
            value={role}
            onChange={handleRoleChange}
            className="bg-gray-50"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <span>Bulan</span>
          <input
            component="input"
            type="text"
            placeholder="Masukkan Bulan"
            value={month}
            onChange={handleMonthChange}
            className="bg-gray-50"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <span>Base Gaji</span>
          <input
            component="input"
            type="text"
            placeholder="Masukkan Base Gaji"
            value={base}
            onChange={handleBaseChange}
            className="bg-gray-50"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <span>Tunjangan Kerja</span>
          <input
            component="input"
            type="text"
            placeholder="Masukkan Tunjangan Kerja"
            value={tunjangan}
            onChange={handleTunjanganChange}
            className="bg-gray-50"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <span>Insentif</span>
          <input
            component="input"
            type="text"
            placeholder="Masukkan Insentif"
            value={insentif}
            onChange={handleInsentifChange}
            className="bg-gray-50"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <span>Total Gaji</span>
          <input
            component="input"
            type="text"
            placeholder="Masukkan Total Gaji"
            value={total}
            onChange={handleTotalChange}
            className="bg-gray-50"
          />
        </div>
        <div className="flex flex-row gap-4 w-full justify-end">
          <button
            onClick={handleCancelClicked}
            className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          
          {status === false && (
            <button
            onClick={handleAmbilClicked}
            className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-lg"
          >
            Ambil Gaji
          </button>
          )}

          {status === true && (
            <button
            className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-lg"
          >
            Gaji Sudah Diambil
          </button>
          )}

          <button
            onClick={handleSaveClicked}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="gap-2">
        <div className="flex flex-row justify-between">
          <div>
            <input
              type="text"
              placeholder="Search.."
              className="bg-gray-50"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handlePrintClick()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Cetak Daftar Gaji
            </button>
            <button
              onClick={() => handleAddClicked()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Tambah Data Gaji
            </button>
          </div>
        </div>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>ID Karyawan</th>
              <th>Jabatan</th>
              <th>Gaji Pokok</th>
              <th>Tunjangan Kerja</th>
              <th>Insentif</th>
              <th>Total Gaji</th>
              <th>Aksi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payrolls?.map((data, index) => (
              <tr key={data.userId}>
                <td>{data.name}</td>
                <td>{data.userId}</td>
                <td>{data.role}</td>
                <td>{data.base}</td>
                <td>{data?.additional[0]?.amount ?? 0}</td>
                <td>{data?.additional[1]?.amount ?? 0}</td>
                <td>{data.total}</td>
                <td className="flex flex-row justify-center gap-2">
                  <button
                    onClick={() => handleAddClicked(data)}
                    className="border border-blue-500 px-4 py-2 rounded-lg"
                  >
                    Detail
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {}}
                    className="border border-blue-500 px-4 py-2 rounded-lg"
                  >
                    { data.taken ? (
                      "Gaji Sudah Diambil"
                    ) : (
                      "Belum Diambil"
                    )}
                  </button>
                </td>
              </tr>
            )) ?? []}
          </tbody>
        </table>
      </div>
    );
  }
};

const Payroll = () => {
  const payrollRepository = new PayrollRepository();
  const userRepository = new UserRepository();

  const [fullData, setFullData] = useState([]);
  const [statusGaji, setStatusGaji] = useState(false);

  const [payrolls, setPayrolls] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(null);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [month, setMonth] = useState("");
  const [base, setBase] = useState("");
  const [tunjangan, setTunjangan] = useState("");
  const [insentif, setInsentif] = useState("");
  const [total, setTotal] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getAllPayroll = async () => {
    const data = await payrollRepository.fetchPayroll();
    console.log(data);
    setPayrolls(
      data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handlePrintClick = () => {
    const csvContent = convertToCSV(payrolls);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "payrolls.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data) => {
    const headers = [
      "Nama",
      "ID Karyawan",
      "Jabatan",
      "Gaji Pokok",
      "Tunjangan Kerja",
      "Insentif",
      "Total Gaji",
    ];
    let csvContent = headers.join(",") + "\n";
    data.forEach((item) => {
      let row = "";
      row += item.name + ",";
      row += item.userId + ",";
      row += item.role + ",";
      row += item.base + ",";
      row += (item?.additional[0]?.amount ?? 0) + ",";
      row += (item?.additional[1]?.amount ?? 0) + ",";
      row += item.total;
      csvContent += row + "\n";
    });
    return csvContent;
  };

  const handleEditClicked = (value) => {
    setShowForm(value);
    setName(value.name);
    setUserId(value.email);
    setRole(value.role);
  };

  const handleAddClicked = (data) => {
    setShowForm({});
    if (data) {
      setFullData(data);
      cekStatusGaji(data);
      setName(data.name);
      setUserId(data.userId);
      setRole(data.role);
      setMonth(data.month);
      setBase(data.base);
      setTunjangan(data.additional[0]?.amount ?? 0);
      setInsentif(data.additional[1]?.amount ?? 0);
      setTotal(data.total);
    } else {
      setName("");
      setUserId("");
      setRole("");
      setMonth("");
      setBase("");
      setTunjangan("");
      setInsentif("");
      setTotal("");
    }
  };

  const handleCancelClicked = () => {
    setShowForm(null);
  };

  const cekStatusGaji = async(value) => {
    try { 
      const data = await payrollRepository.cekStatus(value);
      setStatusGaji(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveClicked = () => {
    try {
      const payroll = {
        userId: userId,
        name: name,
        role: role,
        base: Number(base),
        month: month,
        additional: [
          {
            name: "Tunjangan Kerja",
            amount: Number(tunjangan),
          },
          {
            name: "Insentif",
            amount: Number(insentif),
          },
        ],
        total: Number(total),
        actualDay: 31,
        id: uuid(),
        leaveDay: 0,
        presentDay: 23,
        workDay: 23,
        taken: false,
      };

      payrollRepository.addPayroll(payroll);
      setShowForm(null);
      getAllPayroll();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteClicked = (id) => {
    // userRepository.deleteUser(id);
    // getAllUsers();
  };

  const handleNameChange = async (e) => {
      setName(e.target.value);
      const data = await userRepository.findUser(e.target.value);
      if (data) {
        setUserId(data.id);
        setRole(data.role);
      }else{
        setUserId("");
        setRole("");
      }
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleBaseChange = (e) => {
    setBase(e.target.value);
  };

  const handleTunjanganChange = (e) => {
    setTunjangan(e.target.value);
  };

  const handleInsentifChange = (e) => {
    setInsentif(e.target.value);
  };

  const handleTotalChange = (e) => {
    setTotal(e.target.value);
  };

  const handleAmbilClicked = async (e) => {
    try {
      const statuses = await payrollRepository.updateStatus(fullData);
      console.log(statuses);
      window.location.href = "/payroll";
    } catch (error) {
      console.log('ini',error);
    }
  };

  useEffect(() => {
    getAllPayroll(search);

  }, [search]);

  (async () => {
    const payrollRepository = new PayrollRepository();
    
    try {
      const allUsers = await payrollRepository.fetchPayroll();
      const userCount = allUsers.length;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  })();

  return (
    <div className="flex flex-row ">
      <Sidebar />

      <div className="w-full h-screen bg-gray-50">
        <div className="flex flex-col w-full">
          <h2 className="text-start text-2xl font-bold p-4 bg-white">
            Daftar Gaji Karyawan Klinik
          </h2>

          {showForm != null && (
            <span className="text-2xl text-start font-bold px-10">
              {"Detail Gaji"}
            </span>
          )}

          <div className="m-10 bg-white p-4 rounded-lg">
            <Content
              showForm={showForm}
              name={name}
              userId={userId}
              role={role}
              month={month}
              base={base}
              tunjangan={tunjangan}
              insentif={insentif}
              total={total}
              handleNameChange={handleNameChange}
              handleUserIdChange={handleUserIdChange}
              handleRoleChange={handleRoleChange}
              handleMonthChange={handleMonthChange}
              handleBaseChange={handleBaseChange}
              handleTunjanganChange={handleTunjanganChange}
              handleInsentifChange={handleInsentifChange}
              handleTotalChange={handleTotalChange}
              handleCancelClicked={handleCancelClicked}
              handleSaveClicked={handleSaveClicked}
              search={search}
              handleSearchChange={handleSearchChange}
              handleAddClicked={handleAddClicked}
              payrolls={payrolls}
              handlePrintClick={handlePrintClick}
              handleEditClicked={handleEditClicked}
              handleAmbilClicked={handleAmbilClicked}
              handleDeleteClicked={handleDeleteClicked}
              status={statusGaji}

            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;