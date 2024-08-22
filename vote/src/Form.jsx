import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [candidates, setCandidates] = useState({
    candidate1: "",
    candidate2: "",
    candidate3: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "address") {
      setAddress(value);
    } else {
      setCandidates((prevCandidates) => ({
        ...prevCandidates,
        [name]: value
      }));
    }
  };

  const gotoVote = () => {
    navigate("/vote", {
      state: {
        candidates,
      },
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            id="emailInput"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="addressInput" className="form-label">Metamask/Backpack address</label>
          <input
            type="text"
            className="form-control"
            id="addressInput"
            name="address"
            placeholder="Enter your address"
            value={address}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="candidate1Input" className="form-label">Candidate 1</label>
          <input
            type="text"
            className="form-control"
            id="candidate1Input"
            name="candidate1"
            placeholder="Enter candidate 1"
            value={candidates.candidate1}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="candidate2Input" className="form-label">Candidate 2</label>
          <input
            type="text"
            className="form-control"
            id="candidate2Input"
            name="candidate2"
            placeholder="Enter candidate 2"
            value={candidates.candidate2}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="candidate3Input" className="form-label">Candidate 3</label>
          <input
            type="text"
            className="form-control"
            id="candidate3Input"
            name="candidate3"
            placeholder="Enter candidate 3"
            value={candidates.candidate3}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={gotoVote}>Submit</button>
      </div>
    </div>
  );
}
