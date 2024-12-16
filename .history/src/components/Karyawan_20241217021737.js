import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { UserRepository } from "../data/repository/UserRepository";
import { v4 as uuid } from "uuid";

const Content = ({
  showForm,
  name,
  email,
  role,
  handleNameChange,
  handleEmailChange,
  handleRoleChange,
  handleCancelClicked,
  handleSaveClicked,
  search,
  handleSearchChange,
  handleAddClicked,
  users,
  handleEditClicked,
  handleDeleteClicked,
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
          <span>Email</span>
          <input
            component="input"
            type="text"
            placeholder="Masukkan Email"
            value={email}
            onChange={handleEmailChange}
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
        <div className="flex flex-row gap-4 w-full justify-end">
          <button
            onClick={handleCancelClicked}
            className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
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
          <div>
            <button
              onClick={handleAddClicked}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Tambah Karyawan
            </button>
          </div>
        </div>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>ID Karyawan</th>
              <th>Jabatan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((data, index) => (
              <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.id}</td>
                <td>{data.role}</td>
                <td className="flex flex-row justify-center gap-2">
                  <button
                    onClick={() => handleEditClicked(data)}
                    className="border border-blue-500 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClicked(data.id)}
                    className="bg-red-300 border border-blue-500 px-4 py-2 rounded-lg"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

const Karyawan = () => {
  const userRepository = new UserRepository();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getAllUsers = async () => {
    const data = await userRepository.getAllUser();
    setUsers(
      data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleEditClicked = (value) => {
    setShowForm(value);
    setName(value.name);
    setEmail(value.email);
    setRole(value.role);
  };

  const handleAddClicked = () => {
    setShowForm({});
    setName("");
    setEmail("");
    setRole("");
  };

  const handleCancelClicked = () => {
    setShowForm(null);
  };

  const handleSaveClicked = () => {
    try {
      const user = {
        id: showForm.id ?? uuid(),
        name: name,
        email: email,
        role: role,
        imageUrl: null,
      };

      userRepository.addUser(user);
      setShowForm(null);
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClicked = (id) => {
    userRepository.deleteUser(id);
    getAllUsers();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  useEffect(() => {
    getAllUsers(search);
  }, [search]);

  return (
    <div className="flex flex-row ">
      <Sidebar />

      <div className="w-full h-screen bg-gray-50">
        <div className="flex flex-col w-full">
          <h2 className="text-start text-2xl font-bold p-4 bg-white">
            Data Karyawan
          </h2>

          {showForm != null && (
            <span className="text-2xl text-start font-bold px-10">
              {(showForm.id != null && "Edit Data Karyawan") ||
                "Tambah Data Karyawan"}
            </span>
          )}

          <div className="m-10 bg-white p-4 rounded-lg">
            <Content
              showForm={showForm}
              name={name}
              email={email}
              role={role}
              handleNameChange={handleNameChange}
              handleEmailChange={handleEmailChange}
              handleRoleChange={handleRoleChange}
              handleCancelClicked={handleCancelClicked}
              handleSaveClicked={handleSaveClicked}
              search={search}
              handleSearchChange={handleSearchChange}
              handleAddClicked={handleAddClicked}
              users={users}
              handleEditClicked={handleEditClicked}
              handleDeleteClicked={handleDeleteClicked}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Karyawan;