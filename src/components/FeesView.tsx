import React, { useState, useMemo } from 'react';
import { FeeRecord, Student, Language, FeeStatus, SchoolSettings } from '../types';
import { getTranslation } from '../translations';
import { SCHOOL_EMBLEM } from '../data/mockData';
import {
  Receipt,
  Search,
  Filter,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  DollarSign,
  X,
  CreditCard,
  Building,
  Calendar,
  Check
} from 'lucide-react';

interface FeesViewProps {
  fees: FeeRecord[];
  students: Student[];
  lang: Language;
  settings: SchoolSettings;
  onUpdateFeeRecord: (updated: FeeRecord) => void;
  onAddNewFeeRecord: (newFee: FeeRecord) => void;
  isCollectModalInitiallyOpen?: boolean;
}

export const FeesView: React.FC<FeesViewProps> = ({
  fees,
  students,
  lang,
  settings,
  onUpdateFeeRecord,
  onAddNewFeeRecord,
  isCollectModalInitiallyOpen = false
}) => {
  const t = getTranslation(lang);
  const isUrdu = lang === 'ur';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | FeeStatus>('all');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');

  // Modals state
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(isCollectModalInitiallyOpen);
  const [printingVoucher, setPrintingVoucher] = useState<FeeRecord | null>(null);

  // Collect Fee form state
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [billingMonth, setBillingMonth] = useState('November');
  const [tuitionFee, setTuitionFee] = useState<number>(6500);
  const [examFee, setExamFee] = useState<number>(1500);
  const [labFee, setLabFee] = useState<number>(1000);
  const [discount, setDiscount] = useState<number>(0);
  const [amountPaying, setAmountPaying] = useState<number>(9000);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Bank Transfer' | 'EasyPaisa/JazzCash'>('Cash');
  const [dueDate, setDueDate] = useState('2026-11-10');

  // Filtered fee list
  const filteredFees = useMemo(() => {
    return fees.filter((f) => {
      const matchesSearch =
        f.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.studentNameUrdu.includes(searchQuery) ||
        f.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.voucherNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
      const matchesClass = selectedClassFilter === 'all' || f.className === selectedClassFilter;

      return matchesSearch && matchesStatus && matchesClass;
    });
  }, [fees, searchQuery, statusFilter, selectedClassFilter]);

  // Aggregate stats
  const totalBilled = fees.reduce((acc, f) => acc + f.totalAmount, 0);
  const totalCollected = fees.reduce((acc, f) => acc + (f.paidAmount || 0), 0);
  const totalOutstanding = totalBilled - totalCollected;

  // Handle opening collect modal for a specific unpaid voucher
  const handleQuickPayVoucher = (fee: FeeRecord) => {
    setSelectedStudentId(fee.studentId);
    setBillingMonth(fee.month);
    setTuitionFee(fee.tuitionFee);
    setExamFee(fee.examFee);
    setLabFee(fee.labFee);
    setDiscount(fee.discount);
    setAmountPaying(fee.totalAmount - (fee.paidAmount || 0));
    setPaymentMethod('Cash');
    setDueDate(fee.dueDate);
    setIsCollectModalOpen(true);
  };

  // Submit Collect Fee
  const handleSaveFee = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === selectedStudentId);
    if (!student) return;

    const netTotal = tuitionFee + examFee + labFee - discount;
    const paid = Math.min(amountPaying, netTotal);
    const newStatus: FeeStatus = paid >= netTotal ? 'paid' : paid > 0 ? 'partial' : 'unpaid';

    // Check if voucher for this student and month already exists
    const existingIndex = fees.findIndex((f) => f.studentId === student.id && f.month === billingMonth);

    if (existingIndex >= 0) {
      const existing = fees[existingIndex];
      const updatedRecord: FeeRecord = {
        ...existing,
        tuitionFee,
        examFee,
        labFee,
        discount,
        totalAmount: netTotal,
        paidAmount: paid,
        status: newStatus,
        paymentMethod,
        paidDate: new Date().toISOString().split('T')[0]
      };
      onUpdateFeeRecord(updatedRecord);
    } else {
      const newRecord: FeeRecord = {
        id: `fee-${Date.now()}`,
        voucherNo: `VCH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        studentId: student.id,
        studentName: student.name,
        studentNameUrdu: student.nameUrdu,
        rollNo: student.rollNo,
        className: student.className,
        month: billingMonth,
        year: 2026,
        tuitionFee,
        examFee,
        labFee,
        discount,
        totalAmount: netTotal,
        paidAmount: paid,
        status: newStatus,
        dueDate,
        paidDate: new Date().toISOString().split('T')[0],
        paymentMethod
      };
      onAddNewFeeRecord(newRecord);
    }

    setIsCollectModalOpen(false);
  };

  // Trigger Print Receipt
  const handlePrintTrigger = () => {
    window.print();
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold text-slate-900 tracking-tight ${isUrdu ? 'font-urdu-clean' : ''}`}>
            {t.feesManager}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.feesSubtitle}
          </p>
        </div>

        <button
          onClick={() => {
            setAmountPaying(9000);
            setIsCollectModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t.collectFeeModalTitle}</span>
        </button>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 no-print">
        {/* Total Billed */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {isUrdu ? 'کل بلنگ (فیس ڈیمانڈ)' : 'Total Billed Amount'}
          </span>
          <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
            Rs. {totalBilled.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400">Total generated vouchers</span>
        </div>

        {/* Total Received */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            {isUrdu ? 'وصول شدہ فیس' : 'Total Recovered'}
          </span>
          <p className="text-2xl font-extrabold text-emerald-700 font-mono tabular-nums mt-1">
            Rs. {totalCollected.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            {totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0}% recovery rate
          </span>
        </div>

        {/* Total Outstanding */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
            {isUrdu ? 'کل بقایا جات' : 'Total Pending / Overdue'}
          </span>
          <p className="text-2xl font-extrabold text-red-600 font-mono tabular-nums mt-1">
            Rs. {totalOutstanding.toLocaleString()}
          </p>
          <span className="text-[11px] text-red-500">Uncollected arrears</span>
        </div>
      </div>

      {/* Search & Filter Strip */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 no-print">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchFeesPlaceholder}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 ltr:pl-9 rtl:pr-9 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {(['all', 'paid', 'unpaid', 'partial'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors capitalize ${
                  statusFilter === st
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st === 'all'
                  ? t.allStatuses
                  : st === 'paid'
                  ? t.statusPaid
                  : st === 'unpaid'
                  ? t.statusUnpaid
                  : t.statusPartial}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-mono tabular-nums shrink-0 px-2">
            {filteredFees.length} {isUrdu ? 'واؤچرز' : 'items'}
          </span>
        </div>
      </div>

      {/* Fee Ledger Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs no-print">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">{t.voucherNo}</th>
                <th className="py-3.5 px-4">{t.studentName}</th>
                <th className="py-3.5 px-4">{t.class}</th>
                <th className="py-3.5 px-4">{t.month}</th>
                <th className="py-3.5 px-4 text-right rtl:text-left">{t.totalFee}</th>
                <th className="py-3.5 px-4 text-right rtl:text-left">{t.paidAmountCol}</th>
                <th className="py-3.5 px-4 text-center">{t.filterStatus}</th>
                <th className="py-3.5 px-4 text-center">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {filteredFees.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    {isUrdu ? 'کوئی فیس واؤچر تلاش کے مطابق نہیں ملا۔' : 'No fee records found.'}
                  </td>
                </tr>
              ) : (
                filteredFees.map((fee) => {
                  const pending = fee.totalAmount - (fee.paidAmount || 0);

                  return (
                    <tr key={fee.id} className="hover:bg-blue-50/40 transition-colors">
                      {/* Voucher # */}
                      <td className="py-3 px-4 font-mono font-semibold text-slate-800 tabular-nums">
                        {fee.voucherNo}
                      </td>

                      {/* Student info */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">
                          {isUrdu ? fee.studentNameUrdu : fee.studentName}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {fee.rollNo}
                        </span>
                      </td>

                      {/* Class */}
                      <td className="py-3 px-4 text-slate-700">
                        {isUrdu ? fee.className.replace('Class', 'کلاس') : fee.className}
                      </td>

                      {/* Month */}
                      <td className="py-3 px-4 text-slate-700 font-medium">
                        {fee.month} {fee.year}
                      </td>

                      {/* Total fee */}
                      <td className="py-3 px-4 text-right rtl:text-left font-mono font-semibold text-slate-900 tabular-nums">
                        Rs. {fee.totalAmount.toLocaleString()}
                      </td>

                      {/* Paid fee */}
                      <td className="py-3 px-4 text-right rtl:text-left font-mono font-bold text-emerald-700 tabular-nums">
                        Rs. {(fee.paidAmount || 0).toLocaleString()}
                        {pending > 0 && (
                          <span className="block text-[10px] text-red-500 font-normal">
                            Rem: Rs. {pending.toLocaleString()}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                            fee.status === 'paid'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : fee.status === 'unpaid'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {fee.status === 'paid' && <CheckCircle2 className="w-3 h-3" />}
                          {fee.status === 'unpaid' && <AlertCircle className="w-3 h-3" />}
                          {fee.status === 'partial' && <Clock className="w-3 h-3" />}
                          <span>
                            {fee.status === 'paid'
                              ? t.statusPaid
                              : fee.status === 'unpaid'
                              ? t.statusUnpaid
                              : t.statusPartial}
                          </span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {fee.status !== 'paid' && (
                            <button
                              onClick={() => handleQuickPayVoucher(fee)}
                              className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
                            >
                              {isUrdu ? 'وصول کریں' : 'Pay'}
                            </button>
                          )}
                          <button
                            onClick={() => setPrintingVoucher(fee)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                            title={t.printReceipt}
                          >
                            <Printer className="w-3.5 h-3.5 text-slate-600" />
                            <span>{t.printReceipt}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Collect / Add Student Fee */}
      {isCollectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto no-print">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden my-8">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-200" />
                <h3 className="font-bold text-base sm:text-lg">
                  {t.collectFeeModalTitle}
                </h3>
              </div>
              <button
                onClick={() => setIsCollectModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFee} className="p-6 space-y-4">
              {/* Select Student */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Student *
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.rollNo} - {isUrdu ? s.nameUrdu : s.name} ({s.className})
                    </option>
                  ))}
                </select>
              </div>

              {/* Month & Due Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.month} *
                  </label>
                  <select
                    value={billingMonth}
                    onChange={(e) => setBillingMonth(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m} 2026
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.dueDate}
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              {/* Fee Breakdown Inputs */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
                <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                  Fee Breakdown (PKR)
                </span>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      {t.tuitionFee}
                    </label>
                    <input
                      type="number"
                      value={tuitionFee}
                      onChange={(e) => setTuitionFee(Number(e.target.value))}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      {t.examFee}
                    </label>
                    <input
                      type="number"
                      value={examFee}
                      onChange={(e) => setExamFee(Number(e.target.value))}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      {t.labFee}
                    </label>
                    <input
                      type="number"
                      value={labFee}
                      onChange={(e) => setLabFee(Number(e.target.value))}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      {t.discount}
                    </label>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 font-mono text-emerald-600"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs font-bold text-slate-900">
                  <span>{t.netPayable}:</span>
                  <span className="font-mono text-sm text-blue-800">
                    Rs. {(tuitionFee + examFee + labFee - discount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Paying Now & Payment Method */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.payingAmount} (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={amountPaying}
                    onChange={(e) => setAmountPaying(Number(e.target.value))}
                    className="w-full text-xs sm:text-sm bg-blue-50/50 border border-blue-300 rounded-xl p-2.5 font-mono font-bold text-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.paymentMethod}
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                  >
                    <option value="Cash">Cash (کیش کاؤنٹر)</option>
                    <option value="Bank Transfer">Bank Transfer (بینک ڈپازٹ)</option>
                    <option value="EasyPaisa/JazzCash">EasyPaisa / JazzCash</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCollectModalOpen(false)}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2 & PRINTABLE VIEW: Official School Fee Voucher / Receipt */}
      {printingVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-300 shadow-2xl overflow-hidden my-4">
            
            {/* Modal Controls (Hidden in Print) */}
            <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between no-print">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-sm">
                  Official Fee Voucher & Receipt: {printingVoucher.voucherNo}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintTrigger}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.print}</span>
                </button>
                <button
                  onClick={() => setPrintingVoucher(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PRINT CONTAINER: Dual Copy (School Copy & Student Copy) */}
            <div className="p-6 bg-white text-slate-900 space-y-6 print-sheet">
              
              {/* COPY 1: STUDENT COPY */}
              <div className="border border-slate-800 p-5 rounded-lg relative">
                <div className="absolute top-2 ltr:right-2 rtl:left-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-100 border border-slate-300 rounded">
                  {t.officialStudentCopy}
                </div>

                {/* Voucher Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-300">
                  <img
                    src={SCHOOL_EMBLEM}
                    alt="School Crest"
                    className="w-12 h-12 rounded-full border border-slate-300 object-cover"
                  />
                  <div>
                    <h2 className="text-base font-extrabold uppercase text-slate-900 tracking-wide">
                      {settings.schoolName}
                    </h2>
                    <p className="text-xs font-urdu-clean text-slate-700">
                      {settings.schoolNameUrdu}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {settings.address} | Tel: {settings.phone} | Principal: {settings.principalName}
                    </p>
                  </div>
                </div>

                {/* Voucher Meta details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3 text-xs bg-slate-50 p-2.5 rounded border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Voucher No:</span>
                    <span className="font-mono font-bold text-slate-900">{printingVoucher.voucherNo}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Billing Month:</span>
                    <span className="font-semibold text-slate-900">{printingVoucher.month} {printingVoucher.year}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Due Date:</span>
                    <span className="font-mono font-semibold text-slate-900">{printingVoucher.dueDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Status:</span>
                    <span className="font-bold text-emerald-700 uppercase">{printingVoucher.status}</span>
                  </div>
                </div>

                {/* Student Credentials */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs mb-3">
                  <div>
                    <span className="text-slate-500">{t.studentName}: </span>
                    <span className="font-bold text-slate-900">{printingVoucher.studentName} ({printingVoucher.studentNameUrdu})</span>
                  </div>
                  <div>
                    <span className="text-slate-500">{t.rollNo}: </span>
                    <span className="font-mono font-bold text-slate-900">{printingVoucher.rollNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">{t.class}: </span>
                    <span className="font-bold text-slate-900">{printingVoucher.className}</span>
                  </div>
                </div>

                {/* Itemized Table */}
                <table className="w-full text-xs border border-slate-300 mb-3">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-[11px] font-bold">
                      <th className="py-1 px-3 text-left">Fee Particulars</th>
                      <th className="py-1 px-3 text-right">Amount (PKR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-1 px-3">Tuition Fee ({printingVoucher.month})</td>
                      <td className="py-1 px-3 text-right font-mono">{printingVoucher.tuitionFee.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-3">Examination & Assessment Charges</td>
                      <td className="py-1 px-3 text-right font-mono">{printingVoucher.examFee.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-3">Science & Computer Laboratory Fee</td>
                      <td className="py-1 px-3 text-right font-mono">{printingVoucher.labFee.toLocaleString()}</td>
                    </tr>
                    {printingVoucher.discount > 0 && (
                      <tr className="text-emerald-700">
                        <td className="py-1 px-3">Scholarship / Fee Concession</td>
                        <td className="py-1 px-3 text-right font-mono">-{printingVoucher.discount.toLocaleString()}</td>
                      </tr>
                    )}
                    <tr className="bg-slate-50 font-bold border-t border-slate-300">
                      <td className="py-1.5 px-3">Total Payable (قبل از آخری تاریخ)</td>
                      <td className="py-1.5 px-3 text-right font-mono text-sm text-slate-900">
                        Rs. {printingVoucher.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="font-bold text-emerald-800">
                      <td className="py-1.5 px-3">Amount Received (ادا شدہ رقم)</td>
                      <td className="py-1.5 px-3 text-right font-mono text-sm">
                        Rs. {(printingVoucher.paidAmount || 0).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Signatures */}
                <div className="pt-6 flex items-center justify-between text-xs text-slate-600">
                  <div className="border-t border-slate-400 w-36 text-center pt-1">
                    Depositor / Student
                  </div>
                  <div className="border-t border-slate-400 w-36 text-center pt-1 font-semibold text-slate-900">
                    Accounts Officer / Stamp
                  </div>
                </div>
              </div>

              {/* Divider for cut */}
              <div className="border-t-2 border-dashed border-slate-400 my-4 text-center relative no-print">
                <span className="bg-white px-3 text-[11px] text-slate-400 font-mono absolute -top-2.5 left-1/2 -translate-x-1/2">
                  ✂ Cut along dashed line for School Accounts Copy
                </span>
              </div>

              {/* COPY 2: SCHOOL / ACCOUNTS COPY */}
              <div className="border border-slate-800 p-5 rounded-lg relative">
                <div className="absolute top-2 ltr:right-2 rtl:left-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-100 border border-slate-300 rounded">
                  {t.officialSchoolCopy}
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                  <div>
                    <h3 className="font-extrabold text-sm uppercase">{settings.schoolName} - ACCOUNTS RECORD</h3>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Voucher: {printingVoucher.voucherNo} · Date: {printingVoucher.paidDate || printingVoucher.dueDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-blue-900 font-mono">
                      Paid: Rs. {(printingVoucher.paidAmount || 0).toLocaleString()}
                    </span>
                    <p className="text-[10px] text-slate-500">Method: {printingVoucher.paymentMethod || 'Cash'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs py-2">
                  <div><span className="text-slate-500">Student: </span><span className="font-bold">{printingVoucher.studentName}</span></div>
                  <div><span className="text-slate-500">Roll No: </span><span className="font-mono font-bold">{printingVoucher.rollNo}</span></div>
                  <div><span className="text-slate-500">Class: </span><span className="font-bold">{printingVoucher.className}</span></div>
                </div>

                <div className="pt-4 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Audited & verified by Cashier</span>
                  <span className="font-mono">Timestamp: 2026-11-05 08:30:12</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
