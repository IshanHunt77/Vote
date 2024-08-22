import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ABI } from './ABI.jsx';
import Web3 from 'web3';

const Vote = () => {
  const location = useLocation();
  const candidates = location.state?.candidates || {};

  const { candidate1, candidate2, candidate3 } = candidates;
  const contractAddress = "0x4a18Dd72bDdB2f5266bEe76f8416C7498eB3610E";

  const [id, setId] = useState(null);
  const [web3Instance, setWeb3Instance] = useState(null);
  const [voteInstance, setVoteInstance] = useState(null);
  const navi = useNavigate();

  const gotoResults = () => {
    navi("/results", {
      state: {
        candidate1,
        candidate2,
        candidate3
      }
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
          const web3 = new Web3(window.ethereum);
          const voteContract = new web3.eth.Contract(ABI, contractAddress);
          setWeb3Instance(web3);
          setVoteInstance(voteContract);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("Please install a wallet");
    }
  }, []);

  useEffect(() => {
    const voting = async (id) => {
      if (!web3Instance || !voteInstance || id === null) {
        return;
      }
      const accounts = await web3Instance.eth.getAccounts();
      await voteInstance.methods.countingVote(id).send({ from: accounts[0] });
    };
    console.log(id);
    if (id !== null) {
      voting(id);
    }
  }, [id, web3Instance, voteInstance]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <button
        className="btn mb-3"
        style={{ width: '200px', height: '50px', backgroundColor: 'blue', color: 'white' }}
        onClick={() => setId(1)}
      >
        {candidate1 || "Candidate 1"}
      </button>
      <button
        className="btn mb-3"
        style={{ width: '200px', height: '50px', backgroundColor: 'blue', color: 'white' }}
        onClick={() => setId(2)}
      >
        {candidate2 || "Candidate 2"}
      </button>
      <button
        className="btn mb-3"
        style={{ width: '200px', height: '50px', backgroundColor: 'blue', color: 'white' }}
        onClick={() => setId(3)}
      >
        {candidate3 || "Candidate 3"}
      </button>
      <button
        className="btn"
        style={{ width: '200px', height: '50px', backgroundColor: 'blue', color: 'white' }}
        onClick={gotoResults}
      >
        Results
      </button>
    </div>
  );
};

export default Vote;
