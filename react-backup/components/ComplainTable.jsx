import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Td, Th, Tr, Tbody, Thead } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./css/table.css";

const ComplainTable = ({ complaints }) => {
  const [complaintsData, setComplaintsData] = useState(complaints); // Initialize complaintsData with the prop data
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setComplaintsData(complaints); // Update complaintsData when the prop data changes
  }, [complaints]);

  const handleCheckboxChange = (complainId) => {
    const updatedComplaints = complaintsData.map((complain) => {
      if (complain._id === complainId) {
        const updatedComplain = { ...complain, completed: !complain.completed };
        axios
          .put(
            `https://hostelchatbotnitrr.onrender.com/complain/${complainId}`,
            {
              completed: updatedComplain.completed,
            }
          )
          .then(() => {
            setComplaintsData((prevComplaints) =>
              prevComplaints.map((prevComplain) =>
                prevComplain._id === complainId ? updatedComplain : prevComplain
              )
            );
          })
          .catch((error) => {
            console.log(error);
          });
        return updatedComplain;
      }
      return complain;
    });

    setComplaintsData(updatedComplaints);
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
  };

  const filteredComplaints = selectedOption
    ? complaintsData.filter((complain) => complain.problem === selectedOption)
    : complaintsData;

  return (
    <>
      <div className="options">
        <select
          className="complain-select"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="">All</option>
          <option value="Electricity">Electricity</option>
          <option value="Food">Food</option>
          <option value="Water">Water</option>
          <option value="Furniture">Furniture</option>
          <option value="Room Cleaning">Room Cleaning</option>
          <option value="Ragging">Ragging</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <Table className="complain-table">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Contact</Th>
            <Th>Hostel</Th>
            <Th>Room</Th>
            <Th>Problem</Th>
            <Th>Comment</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredComplaints.map((complain) => (
            <Tr key={complain._id}>
              <Td>{complain.name}</Td>
              <Td>{complain.contact}</Td>
              <Td>{complain.hostel}</Td>
              <Td>{complain.room}</Td>
              <Td>{complain.problem}</Td>
              <Td>{complain.comment}</Td>
              <Td>
                {complain.completed ? (
                  <FontAwesomeIcon icon={faCheck} className="check-icon" />
                ) : (
                  <input
                    type="checkbox"
                    checked={complain.completed}
                    onChange={() => handleCheckboxChange(complain._id)}
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default ComplainTable;
