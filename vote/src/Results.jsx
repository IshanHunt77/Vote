import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ABI } from './ABI.jsx';
import Web3 from "web3";

const Results = () => {
  const [votes, setVotes] = useState({
    count1: 0,
    count2: 0,
    count3: 0,
  });

  const contractAddress = "0x4a18Dd72bDdB2f5266bEe76f8416C7498eB3610E";
  const location = useLocation();
  const c1 = location.state.candidate1;
  const c2 = location.state.candidate2;
  const c3 = location.state.candidate3;

  const [voteInstance, setVoteInstance] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          const voteContract = new web3.eth.Contract(ABI, contractAddress);
          setVoteInstance(voteContract);
        } catch (error) {
          console.error("Failed to initialize Web3 or the contract:", error);
        }
      } else {
        alert("Please install a wallet");
      }
    };
    initWeb3();
  }, []);

  useEffect(() => {
    const getVotes = async () => {
      if (!voteInstance) return;

      try {
        const ct1 = await voteInstance.methods.getVoteCount(1).call();
        const ct2 = await voteInstance.methods.getVoteCount(2).call();
        const ct3 = await voteInstance.methods.getVoteCount(3).call();
        setVotes({
          count1: ct1,
          count2: ct2,
          count3: ct3,
        });
      } catch (error) {
        console.error("Failed to fetch vote counts:", error);
      }
    };
    getVotes();
  }, [voteInstance]);

  return (
    <div className="results-container">
      <div className="results-item">
        <span className="candidate-name">{c1}: </span>
        <span className="vote-count">{votes.count1}</span>
      </div>
      <div className="results-item">
        <span className="candidate-name">{c2}: </span>
        <span className="vote-count">{votes.count2}</span>
      </div>
      <div className="results-item">
        <span className="candidate-name">{c3}: </span>
        <span className="vote-count">{votes.count3}</span>
      </div>
    </div>
  );
};

export default Results;
