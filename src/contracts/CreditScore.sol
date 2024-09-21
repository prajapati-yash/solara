// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CreditScore is Ownable {
  // Mapping to store user credit scores
  mapping(address => uint256) private scores;

  // Event emitted when a user's credit score is updated
  event ScoreUpdated(address indexed user, uint256 newScore);

  // Constructor that passes the deployer (msg.sender) to the Ownable constructor
  constructor() Ownable(msg.sender) {}

  // Function to set the credit score for a user, only callable by the owner
  function setScore(address _user, uint256 _score) external onlyOwner {
    require(_score >= 0, "Score must be non-negative");
    scores[_user] = _score;
    emit ScoreUpdated(_user, _score);
  }

  // Function to get the credit score of a user (public view)
  function getScore(address _user) external view returns (uint256) {
    return scores[_user];
  }

  // Function to decrease the credit score of a user by 1, only callable by the owner
  function decreaseScore(address _user) external onlyOwner {
    require(scores[_user] > 0, "Score is already zero");
    scores[_user] -= 1;
    emit ScoreUpdated(_user, scores[_user]);
  }

  // Function to reset a user's credit score (set to zero)
  function resetScore(address _user) external onlyOwner {
    scores[_user] = 0;
    emit ScoreUpdated(_user, 0);
  }

  // Optional: Function to increase a user's credit score (if needed for your logic)
  function increaseScore(address _user, uint256 _amount) external onlyOwner {
    scores[_user] += _amount;
    emit ScoreUpdated(_user, scores[_user]);
  }
}
