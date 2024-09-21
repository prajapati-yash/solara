// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ISPHook} from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import "./CreditScore.sol";

contract LendingContract is ReentrancyGuard {
  using SafeMath for uint256;

  struct Loan {
    uint256 amount;
    uint256 interest;
    uint256 dueDate;
    bool repaid;
    bool defaulted;
    bool approved; // New field to check if loan is approved
  }

  IERC20 public token;
  CreditScore public creditScore;

  mapping(address => Loan) public loans;
  mapping(address => uint256) public lenderShares;
  mapping(address => uint256) public lenderLockInPeriod;

  uint256 public constant LOCK_IN_PERIOD = 30 days;
  uint256 public constant LOAN_DURATION = 30 days;
  uint256 public constant INTEREST_RATE = 5; // 5% interest rate

  event LoanRequested(address borrower, uint256 amount);
  event LoanApproved(address borrower, uint256 amount);
  event LoanRepaid(address borrower, uint256 amount);
  event LoanDefaulted(address borrower, uint256 amount);
  event SharesDeposited(address lender, uint256 amount);
  event SharesWithdrawn(address lender, uint256 amount);

  constructor(address _token, address _creditScore) {
    token = IERC20(_token);
    creditScore = CreditScore(_creditScore);
  }

  function depositShares(uint256 _amount) external nonReentrant {
    require(_amount > 0, "Amount must be greater than 0");
    require(
      token.transferFrom(msg.sender, address(this), _amount),
      "Transfer failed"
    );

    lenderShares[msg.sender] = lenderShares[msg.sender].add(_amount);
    lenderLockInPeriod[msg.sender] = block.timestamp.add(LOCK_IN_PERIOD);

    emit SharesDeposited(msg.sender, _amount);
  }

  function withdrawShares(uint256 _amount) external nonReentrant {
    require(_amount > 0, "Amount must be greater than 0");
    require(lenderShares[msg.sender] >= _amount, "Insufficient shares");
    require(
      block.timestamp >= lenderLockInPeriod[msg.sender],
      "Shares are still locked"
    );

    lenderShares[msg.sender] = lenderShares[msg.sender].sub(_amount);
    require(token.transfer(msg.sender, _amount), "Transfer failed");

    emit SharesWithdrawn(msg.sender, _amount);
  }

  function requestLoan(uint256 _amount) external nonReentrant {
    require(_amount > 0, "Amount must be greater than 0");
    require(loans[msg.sender].amount == 0, "Existing loan not repaid");

    uint256 borrowerScore = creditScore.getScore(msg.sender);
    require(borrowerScore > 0, "No credit score available");

    // Set the loan request to pending approval
    loans[msg.sender] = Loan({
      amount: _amount,
      interest: _amount.mul(INTEREST_RATE).div(100),
      dueDate: block.timestamp.add(LOAN_DURATION),
      repaid: false,
      defaulted: false,
      approved: false // Loan not yet approved
    });

    emit LoanRequested(msg.sender, _amount);
  }

  // This function will be called when attestation is received from Sign Protocol
  function didReceiveAttestation(
    address attester,
    uint64 schemaId,
    uint64 attestationId,
    bytes calldata extraData
  ) external payable {
    (address borrower, uint256 loanAmount) = abi.decode(
      extraData,
      (address, uint256)
    );
    Loan storage loan = loans[borrower];
    require(loan.amount > 0, "No loan request found");
    require(!loan.approved, "Loan already approved");
    require(loanAmount == loan.amount, "Invalid loan amount");

    // Approve the loan
    loan.approved = true;

    // Transfer loan amount to borrower
    require(token.transfer(borrower, loanAmount), "Loan transfer failed");

    emit LoanApproved(borrower, loanAmount);
  }

  function repayLoan() external nonReentrant {
    Loan storage loan = loans[msg.sender];
    require(loan.amount > 0, "No active loan");
    require(loan.approved, "Loan not yet approved");
    require(!loan.repaid, "Loan already repaid");
    require(!loan.defaulted, "Loan has defaulted");

    uint256 totalAmount = loan.amount.add(loan.interest);
    require(
      token.transferFrom(msg.sender, address(this), totalAmount),
      "Transfer failed"
    );

    loan.repaid = true;

    emit LoanRepaid(msg.sender, totalAmount);
  }

  function registerDefault(address _borrower) external {
    Loan storage loan = loans[_borrower];
    require(loan.amount > 0, "No active loan");
    require(loan.approved, "Loan not yet approved");
    require(!loan.repaid, "Loan already repaid");
    require(!loan.defaulted, "Loan already defaulted");
    require(block.timestamp > loan.dueDate, "Loan not yet due");

    loan.defaulted = true;
    creditScore.decreaseScore(_borrower);

    emit LoanDefaulted(_borrower, loan.amount.add(loan.interest));
  }
}
