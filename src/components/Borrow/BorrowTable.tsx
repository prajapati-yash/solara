import React, { useState } from 'react';
import BorrowPopup from '@/components/Borrow/BorrowPopUp'; // Adjust the import path as necessary

const BorrowTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const data = [
    { protocol: 'Solana', tvl: '$100', maxAmount: '$1' },
    { protocol: 'Aave V4', tvl: '-', maxAmount: '$0' },
    { protocol: 'Spark', tvl: '-', maxAmount: '$0' },
    { protocol: 'Aura', tvl: '-', maxAmount: '$0' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-orange-200">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-orange-100 text-orange-800 uppercase">
            <th className="px-6 py-3 font-semibold tracking-wider">Protocol</th>
            <th className="px-6 py-3 font-semibold tracking-wider">TVL</th>
            <th className="px-6 py-3 font-semibold tracking-wider">Max Amount</th>
            <th className="px-6 py-3 font-semibold tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-orange-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-orange-50 transition-colors duration-200">
              <td className="px-6 py-4 font-medium text-orange-900">{row.protocol}</td>
              <td className="px-6 py-4 text-orange-700">{row.tvl}</td>
              <td className="px-6 py-4 text-orange-700">{row.maxAmount}</td>
              <td className="px-6 py-4">
                <button
                  className="bg-orange-700 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                  onClick={() => setIsModalOpen(true)}
                >
                  Borrow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <BorrowPopup onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default BorrowTable;
