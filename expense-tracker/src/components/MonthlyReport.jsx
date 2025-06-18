import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Charts from '../pages/Charts';

const MonthlyReport = () => {
  const reportRef = useRef();
  const [loading, setLoading] = useState(false);

  const transactions = useSelector((s) => s.transactions.transactions ?? []);
  const income = useSelector((s) => s.income.amount ?? 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  const handleDownload = async () => {
    if (!reportRef.current) return;
    setLoading(true);

    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#ffffff',
        useCORS: true,
        onclone: (clonedDoc) => {
          clonedDoc.body.querySelectorAll('*').forEach((el) => {
            el.removeAttribute('class');
            el.style.backgroundColor = '#ffffff';
            el.style.color = '#000000';
          });
        },
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Monthly_Report.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white  p-4 rounded shadow-md mt-2 text-gray-900 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Monthly Report</h2>
        <button
          onClick={handleDownload}
          className={`${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-950'
          } text-white px-4 py-2 rounded`}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      <div
        ref={reportRef}
        className="bg-white  text-black p-4 rounded-lg w-full"
      >
        {/* add summary */}
        <div className="mb-4">
          <p className="font-semibold">Total Income: Rs. {income}</p>
          <p className="font-semibold">Total Expenses: Rs. {expenses}</p>
          <p className="font-semibold">Balance: Rs. {balance}</p>
        </div>

{/* transacion list  */}
        <div className="mt-4">
          <h3 className="font-semibold text-2xl mb-2">Transactions</h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="border border-gray-300  p-2">Date</th>
                <th className="border border-gray-300  p-2">Category</th>
                <th className="border border-gray-300  p-2">Amount</th>
                <th className="border border-gray-300  p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="text-center">
                  <td className="border border-gray-300 p-2">{tx.date}</td>
                  <td className="border border-gray-300 p-2">{tx.category}</td>
                  <td className="border border-gray-300 p-2">Rs. {tx.amount}</td>
                  <td className="border border-gray-300 p-2 capitalize">{tx.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
{/* add charts  */}
        <div className="mt-6">
          <Charts />
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;
