


Schema: https://scan.sign.global/schema/onchain_evm_100_0xa
CreditScore smart contract: [0x93342b10e3FA6B0859560FD5a63E548E3fD4BE70](https://gnosisscan.io/address/0x93342b10e3FA6B0859560FD5a63E548E3fD4BE70)
LendingContract : [0xa1d1102CfC84Ce28E346e13cD91819d4885143Aa](https://gnosisscan.io/address/0xa1d1102CfC84Ce28E346e13cD91819d4885143Aa)
Mainnet Test Transaction showing Borrowing after using Sign Protocol: https://dashboard.tenderly.co/tx/gnosis-chain/0xa5dd1226f9fac29348e16824359641c93810092ecd0124cc8d2773072166dcb6


Currently not generating the credit score. Below the factors that we plan to use for MVP are mentioned. credit_score_calculation.py also suggests how these calculations can be made. 

Summary of Credit Score Factors:

	•	Activity Score: Based on the number of transactions (max score for 1000 or more transactions).
	•	Volume Score: Based on the total ETH sent (max score for 100 ETH or more).
	•	Age Score: Based on how long the wallet has been active (max score after 1 year).
	•	Transaction Regularity Score: Based on the consistency of transaction timing (lower standard deviation of transaction intervals gets a higher score).
	•	Balance Stability Score: Based on the volatility of the wallet’s outgoing transactions (lower volatility is better).

The calculated credit scores by analyzing Ethereum transactions of wallet & score are mentioned below:-

0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 - 99.74
0x78D262EE17922bfB29476E25df20eEC17e252902 - 41.81


Further the code was attempted to be optimized for $ values instead of ETH. 

As of MVP, the credit score is not calculated and we allow any builder pack holders to access microfinance loans from Solara's Lending Pool.