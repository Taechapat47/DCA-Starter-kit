import React, { useState } from "react";
import {
  FaWallet, FaLayerGroup, FaCoins, FaLeaf
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import DCAcalculator from "../component/DCAcalculate";
import { useLocation } from "react-router-dom";

// ------------------- Popup สำหรับเพิ่มพอร์ต -------------------
function AddPortfolioPopup({ onClose, onAdd }) {
  const ICONS = [
    { icon: <FaLayerGroup />, color: "#539bfc" },
    { icon: <FaCoins />, color: "#56e0ff" },
    { icon: <FaLeaf />, color: "#6067ef" },
    { icon: <FaWallet />, color: "#7c3aed" },
    { icon: <FaWallet />, color: "#7ee2fc" }
  ];
  const [drafts, setDrafts] = useState([
    { iconIndex: 0, name: "", invested: 0, gain: 0, allocation: 0 }
  ]);
  const [editMode, setEditMode] = useState(true);
  const [iconSelectIdx, setIconSelectIdx] = useState(null);

  const totalInvested = drafts.reduce((sum, p) => sum + (parseFloat(p.invested) || 0), 0);
  const getAllocation = (invested) =>
    totalInvested > 0 ? ((parseFloat(invested) || 0) / totalInvested) * 100 : 0;

  const handleChange = (idx, key, value) => {
    setDrafts(drafts =>
      drafts.map((d, i) =>
        i === idx
          ? { ...d, [key]: key === "iconIndex" ? value : value }
          : d
      )
    );
  };

  const handleAddDraft = () => {
    setDrafts([...drafts, { iconIndex: 0, name: "", invested: 0, gain: 0, allocation: 0 }]);
  };

  const handleDeleteDraft = (idx) => {
    setDrafts(drafts.filter((_, i) => i !== idx));
  };

  const handleDone = () => {
    setEditMode(false);
    onAdd(drafts.map((d) => ({
      ...d,
      items: 0,
      value: Number(d.invested),
      gain: 0,
      gainPercent: 0,
      gainUp: true,
      allocation: getAllocation(d.invested),
      allocation2: 0,
      invested: Number(d.invested)
    })));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg px-12 py-8 min-w-[900px] w-full max-w-4xl relative">
        <div className="flex justify-between mb-6">
          <div className="font-bold text-2xl">Name</div>
          <div className="flex gap-3">
            {editMode && (
              <button
                className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded text-white font-semibold text-base"
                onClick={handleAddDraft}
              >+ เพิ่มพอร์ต</button>
            )}
            <button
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold text-base"
              onClick={handleDone}
              disabled={!editMode}
            >เสร็จสิ้น</button>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-6 gap-x-12 gap-y-2 text-base font-bold mb-2">
            <div>Icon</div>
            <div>Name</div>
            <div>Invested</div>
            <div>Gain</div>
            <div>Allocation</div>
            {editMode && <div>ลบ</div>}
          </div>
          {drafts.map((d, idx) => (
            <div className="grid grid-cols-6 gap-x-12 gap-y-2 items-center mb-4" key={idx}>
              {/* Icon */}
              <div className="flex justify-center relative">
                <button
                  className={`border-2 ${iconSelectIdx === idx ? "border-blue-400" : "border-blue-500"} rounded-xl p-3`}
                  style={{ background: ICONS[d.iconIndex]?.color + "22" }}
                  type="button"
                  onClick={() => setIconSelectIdx(iconSelectIdx === idx ? null : idx)}
                >
                  <span className="text-3xl" style={{ color: ICONS[d.iconIndex]?.color }}>
                    {ICONS[d.iconIndex]?.icon}
                  </span>
                </button>
                {iconSelectIdx === idx && (
                  <div
                    className="absolute z-50 left-0 top-14 flex gap-2 bg-white rounded-xl shadow-lg border p-2"
                    onMouseLeave={() => setIconSelectIdx(null)}
                  >
                    {ICONS.map((ic, i) => (
                      <button
                        key={i}
                        className={`border-2 ${d.iconIndex === i ? "border-blue-500" : "border-transparent"} rounded-xl p-2`}
                        style={{ background: ic.color + "22" }}
                        onClick={() => {
                          handleChange(idx, "iconIndex", i);
                          setIconSelectIdx(null);
                        }}
                        type="button"
                      >
                        <span className="text-2xl" style={{ color: ic.color }}>{ic.icon}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Name */}
              <div>
                <input
                  className="border rounded px-3 py-2 w-44 text-base"
                  placeholder="ตั้งชื่อพอร์ต"
                  value={d.name}
                  onChange={e => handleChange(idx, "name", e.target.value)}
                  disabled={!editMode}
                  style={{ minWidth: 120 }}
                />
              </div>
              {/* Invested */}
              <div>
                <input
                  className="border rounded px-3 py-2 w-28 text-right text-base"
                  type="number"
                  min={0}
                  value={d.invested}
                  onChange={e => handleChange(idx, "invested", e.target.value)}
                  disabled={!editMode}
                  style={{ minWidth: 70 }}
                />
              </div>
              {/* Gain */}
              <div>
                <span className="text-green-500 text-base font-semibold">+${d.gain}</span>
                <div className="text-xs text-green-400">▲ 0.00%</div>
              </div>
              {/* Allocation */}
              <div>
                <span className="text-base">{getAllocation(d.invested).toFixed(2)}%</span>
              </div>
              {/* ลบ */}
              {editMode && (
                <div>
                  <button
                    className="text-red-500 font-bold text-base"
                    onClick={() => handleDeleteDraft(idx)}
                  >ลบ</button>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* ปิด popup */}
        <button
          className="absolute top-3 right-4 text-3xl text-gray-400"
          onClick={onClose}
        >×</button>
      </div>
    </div>
  );
}
// ------------------- END Popup -------------------

const ICONS = [
  { icon: <FaLayerGroup />, color: "#539bfc" },
  { icon: <FaCoins />, color: "#56e0ff" },
  { icon: <FaLeaf />, color: "#6067ef" },
  { icon: <FaWallet />, color: "#7c3aed" },
  { icon: <FaWallet />, color: "#7ee2fc" }
];

function EditableText({ value, onChange, className = "", inputClass = "", multiline = false, ...props }) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  const handleBlur = () => {
    setEditing(false);
    onChange(temp);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (!multiline || e.ctrlKey)) {
      setEditing(false);
      onChange(temp);
    }
    if (e.key === "Escape") {
      setEditing(false);
      setTemp(value);
    }
  };

  return editing ? (
    multiline ? (
      <textarea
        className={"w-full border rounded p-1 text-sm bg-white text-gray-900 " + inputClass}
        autoFocus value={temp}
        onChange={e => setTemp(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        rows={3}
      />
    ) : (
      <input
        className={"border rounded p-1 bg-white text-gray-900 " + inputClass}
        autoFocus value={temp}
        onChange={e => setTemp(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    )
  ) : (
    <span
      className={className + " cursor-pointer hover:bg-gray-100 rounded px-1"}
      onClick={() => setEditing(true)}
      {...props}
    >
      {value || <span className="text-gray-400">ตั้งชื่อพอร์ต</span>}
    </span>
  );
}

const defaultGroups = [];

export default function Portfolio() {
  const location = useLocation();
  const goal = location.state?.goal || "";

  const [portName, setPortName] = useState(goal || "Your DCA Portfolio Name");
  const [groups, setGroups] = useState(defaultGroups);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Pie chart data
  const pieData = groups.map(g => ({
    name: g.name || "No name",
    value: g.value,
    color: ICONS[g.iconIndex]?.color ?? "#539bfc"
  }));

  const totalValue = groups.reduce((sum, g) => sum + Number(g.value || 0), 0);
  const totalInvested = groups.reduce((sum, g) => sum + Number(g.invested || 0), 0);
  const totalProfit = totalValue - totalInvested;
  const profitPercent = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
  const irr = profitPercent;
  const passive = groups.reduce((sum, g) => sum + (g.name?.toLowerCase().includes('dividend') ? Number(g.value) : 0), 0) / (totalValue || 1) * 100;
  const passiveYear = Math.round(passive * totalValue / 100);

  // --- Cell edit (รองรับ iconIndex) ---
  const handleCellEdit = (idx, key, val) => {
    setGroups(gs =>
      gs.map((g, i) =>
        i === idx
          ? {
            ...g,
            [key]: key === "name" ? val : key === "iconIndex" ? val : Number(val),
            ...(key === "value" || key === "invested"
              ? calcGain(val, g, key)
              : {}),
          }
          : g
      )
    );
  };

  function calcGain(val, g, key) {
    let value = key === "value" ? Number(val) : g.value;
    let invested = key === "invested" ? Number(val) : g.invested;
    const gain = value - invested;
    return {
      gain: gain,
      gainPercent: invested > 0 ? (gain / invested) * 100 : 0,
      gainUp: gain >= 0,
    };
  }

  React.useEffect(() => {
    const total = groups.reduce((sum, g) => sum + g.value, 0) || 1;
    setGroups(gs =>
      gs.map(g => ({
        ...g,
        allocation: (g.value / total) * 100
      }))
    );
  }, [groups.map(g => g.value).join(",")]);

  // เพิ่มพอร์ตใหม่ (Popup)
  const handleAddGroup = () => {
    setShowPopup(true);
  };

  // Popup เลือกลบพอร์ต (ฟีเจอร์ใหม่)
  const handleDeletePortfolio = (idx) => {
    setGroups(gs => gs.filter((_, i) => i !== idx));
    setShowDeletePopup(false);
  };

  // เปลี่ยน icon (popup เล็ก ๆ)
  const handleIconPopup = (rowIdx) => {
    const icons = ICONS.map((item, idx) => (
      <button
        key={idx}
        onClick={() => handleCellEdit(rowIdx, "iconIndex", idx)}
        className={`w-9 h-9 rounded-lg flex items-center justify-center border-2 m-1
          ${groups[rowIdx]?.iconIndex === idx ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent"}
        `}
        style={{ background: item.color + "22" }}
        type="button"
      >
        <span className="text-xl" style={{ color: item.color }}>{item.icon}</span>
      </button>
    ));
    return icons;
  };

  const [iconPopupIdx, setIconPopupIdx] = useState(null);

  return (
    <div className="min-h-screen bg-white py-4 px-1 sm:py-8 sm:px-2 md:px-6 flex flex-col items-center">
      {/* Popup เพิ่มพอร์ต */}
      {showPopup && (
        <AddPortfolioPopup
          onClose={() => setShowPopup(false)}
          onAdd={newPorts => {
            setGroups(gs => [...gs, ...newPorts]);
          }}
        />
      )}

      {/* Popup ลบพอร์ตแบบเลือก */}
      {showDeletePopup && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 min-w-[340px] w-full max-w-xs relative">
            <div className="font-bold text-xl mb-4">เลือกพอร์ตที่ต้องการลบ</div>
            <div className="flex flex-col gap-2 mb-4">
              {groups.map((g, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" style={{ color: ICONS[g.iconIndex]?.color }}>
                      {ICONS[g.iconIndex]?.icon}
                    </span>
                    <span className="font-semibold">{g.name || "(ไม่มีชื่อ)"}</span>
                  </div>
                  <button
                    onClick={() => handleDeletePortfolio(idx)}
                    className="text-red-500 hover:text-red-700 font-semibold px-2"
                  >
                    ลบ
                  </button>
                </div>
              ))}
            </div>
            <button
              className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-500"
              onClick={() => setShowDeletePopup(false)}
            >×</button>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 mb-4 md:mb-8 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            <div className="bg-gray-100 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl text-xl sm:text-2xl text-blue-600">
              <FaWallet />
            </div>
            <EditableText
              value={portName}
              onChange={setPortName}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900"
              inputClass="text-xl sm:text-2xl md:text-3xl"
            />
          </div>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8">
          {/* Value */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col border border-gray-200">
            <div className="flex items-center gap-2 text-sky-600 mb-1 font-semibold">
              Value
            </div>
            <div className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</div>
            <div className="text-sky-700 text-base">${totalInvested.toLocaleString()} invested</div>
          </div>
          {/* Total profit */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col border border-gray-200">
            <div className="flex items-center gap-2 text-green-600 mb-1 font-semibold">
              Total profit
            </div>
            <div className="text-2xl font-bold text-green-600">
              {totalProfit >= 0 ? "+" : "-"}${Math.abs(totalProfit).toLocaleString()}
            </div>
            <span className="text-green-600 font-semibold ml-2">
              ▲ {profitPercent.toFixed(2)}%
            </span>
            <div className="text-green-500 mt-2">
              +$0 <span className="text-green-500">▲ 0% daily</span>
            </div>
          </div>
          {/* IRR */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col border border-gray-200">
            <div className="flex items-center gap-2 text-purple-600 mb-1 font-semibold">
              IRR
            </div>
            <div className="text-2xl font-bold text-gray-900">{irr.toFixed(2)}%</div>
            <div className="text-purple-400 text-base">{irr.toFixed(2)}% current holdings</div>
          </div>
          {/* Passive income */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col border border-gray-200">
            <div className="flex items-center gap-2 text-lime-600 mb-1 font-semibold">
              Passive income
            </div>
            <div className="text-2xl font-bold text-lime-600">{passive.toFixed(2)}%</div>
            <span className="text-green-600 font-semibold ml-2">
              ▲ 0%
            </span>
            <div className="text-lime-600 text-base ml-1">${passiveYear.toLocaleString()} annually</div>
          </div>
        </div>
        {/* Chart + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow min-h-[390px] border border-gray-200">
            <div className="text-gray-900 font-semibold mb-4 text-lg">Portfolio</div>
            <div className="w-full h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={2}
                    stroke="#e5e7eb"
                    label={false}
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => `$${v.toLocaleString()}`}
                    contentStyle={{
                      background: "#fff",
                      border: "none",
                      color: "#111",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <div className="text-gray-900 font-semibold text-lg">Name</div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddGroup}
                  className="bg-sky-500 hover:bg-sky-600 px-4 py-1 rounded-md text-white font-semibold text-sm shadow transition"
                >
                  + เพิ่มพอร์ต
                </button>
                <button
                  onClick={() => setShowDeletePopup(true)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-white font-semibold text-sm shadow transition"
                  disabled={groups.length === 0}
                >
                  - ลบพอร์ต
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="text-gray-700 text-left text-sm">
                    <th className="pb-2">Icon</th>
                    <th className="pb-2">Name</th>
                    <th className="pb-2 text-right">Value/Invested</th>
                    <th className="pb-2 text-right">Gain</th>
                    <th className="pb-2 text-right">Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-gray-400 text-center py-6">ยังไม่มีพอร์ต</td>
                    </tr>
                  ) : (
                    groups.map((g, i) => (
                      <tr key={i} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition">
                        {/* Icon: show only selected */}
                        <td className="py-2 text-center">
                          <span
                            className="w-9 h-9 rounded-lg flex items-center justify-center border-2 border-blue-500 ring-2 ring-blue-200 mx-auto cursor-pointer"
                            style={{ background: ICONS[g.iconIndex]?.color + "22" }}
                            title="เปลี่ยนไอคอน"
                            onClick={() => setIconPopupIdx(i)}
                          >
                            <span className="text-xl" style={{ color: ICONS[g.iconIndex]?.color }}>{ICONS[g.iconIndex]?.icon}</span>
                          </span>
                          {/* Popup: เลือก icon */}
                          {iconPopupIdx === i && (
                            <div className="absolute z-50 bg-white rounded-lg shadow p-2 mt-2 flex" onMouseLeave={() => setIconPopupIdx(null)}>
                              {handleIconPopup(i)}
                            </div>
                          )}
                        </td>
                        {/* Name */}
                        <td>
                          <EditableText
                            value={g.name}
                            onChange={v => handleCellEdit(i, "name", v)}
                            className="font-semibold text-gray-900"
                            inputClass="font-semibold"
                          />
                        </td>
                        {/* Value/Invested */}
                        <td className="py-2 text-right align-top">
                          <EditableText
                            value={"$" + (g.value || 0).toLocaleString()}
                            onChange={v => handleCellEdit(i, "value", v.replace(/[^0-9.]/g, ""))}
                            className="font-semibold text-gray-900"
                            inputClass="font-semibold text-right"
                          />
                          <EditableText
                            value={"$" + (g.invested || 0).toLocaleString()}
                            onChange={v => handleCellEdit(i, "invested", v.replace(/[^0-9.]/g, ""))}
                            className="text-gray-400 text-xs"
                            inputClass="text-xs text-right"
                          />
                        </td>
                        {/* Gain */}
                        <td className="py-2 text-right align-top">
                          <span className={`font-semibold ${g.gainUp ? "text-green-600" : "text-red-400"}`}>
                            {(g.gainUp ? "+" : "") + "$" + (g.gain || 0).toLocaleString()}
                          </span>
                          <div className={`text-xs ${g.gainUp ? "text-green-600" : "text-red-400"}`}>
                            {g.gainUp ? "▲" : "▼"} {Math.abs(g.gainPercent || 0).toFixed(2)}%
                          </div>
                        </td>
                        {/* Allocation */}
                        <td className="py-2 text-right align-top">
                          <span className="font-semibold text-gray-900">{(g.allocation || 0).toFixed(2)}%</span>
                          <span className="text-gray-400 text-xs block">{g.allocation2}%</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl my-8">
        <DCAcalculator />
      </div>
    </div>
  );
}
