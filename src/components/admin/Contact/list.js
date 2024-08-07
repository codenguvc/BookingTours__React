import React, { useState, useEffect } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { app } from "../../../firebase/firebase";
import deleteContact from "./delete";
import { getDatabase, ref, get } from 'firebase/database';
import { BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";


const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchContact = async () => {
      const db = getDatabase(app);
      const contactsRef = ref(db, "contacts");
      try {
        const snapshot = await get(contactsRef);
        if (snapshot.exists()) {
          setContacts(Object.entries(snapshot.val()).map(([id, contact]) => ({ id, ...contact })))
        } else {
          console.log("No data availabe");
        }
      } catch (error){
        console.error("Error fetching data:", error);
      }
    };
    fetchContact();
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    renderPageNumbers.push(
      <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
        <a className="page-link" id={i} onClick={handleClick} href="#">
          {i}
        </a>
      </li>
    );
  }

  return (
    <div id="wrapper">
      <Sidebar />
      <div
        id="content-wrapper"
        className="d-flex flex-column"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="rounded h-100 p-4 bg-white">
                  <h1 className="mb-4">Liên hệ</h1>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tên khách hàng</th>
                          <th scope="col">Email</th>
                          <th scope="col">Nội dung</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col">Hành động</th>
</tr>
                      </thead>
                      <tbody>
                        {currentItems.map((contact) => (
                          <tr key={contact.id}>
                            <th scope="row">{contact.id}</th>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.content}</td>
                            <td>
                              <select
                                className="form-select"
                                defaultValue={contact.status}
                              >
                                <option value="Chờ xử lý">Chờ xử lý</option>
                                <option value="Đã xử lý">Đã liên hệ</option>
                              </select>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteContact(contact.id, setContacts, contacts)}
                              >
                                <BiTrash size={25} color="white" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="container-fluid">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <a className="page-link" href="#" aria-label="Previous" onClick={handlePrevPage}>
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>
                          {renderPageNumbers}
                          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <a className="page-link" href="#" aria-label="Next" onClick={handleNextPage}>
                              <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ContactList;