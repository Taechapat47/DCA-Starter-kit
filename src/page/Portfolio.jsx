import React, { useState } from "react";
import {
  FaWallet, FaLayerGroup, FaCoins, FaLeaf, FaPiggyBank, FaChartLine, FaPercentage, FaQuestionCircle, FaEdit
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import DCAcalculator from "../component/DCAcalculate"; // <--- เพิ่ม import ตรงนี้

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
      {value}
      <FaEdit className="inline-block ml-2 mb-0.5 text-xs opacity-60" />
    </span>
  );
}

const defaultName = "Your DCA Portfolio Name";
const defaultDesc = `This is a sample portfolio to demonstrate the DCA concept.`;

const defaultGroups = [
  { icon: <FaLayerGroup />, color: "#539bfc", name: "Growth Stocks", items: 0, value: 0, invested: 0, gain: 0, gainPercent: 0, allocation: 0, allocation2: 0, gainUp: true },
  { icon: <FaCoins />, color: "#56e0ff", name: "Dividend Stocks", items: 0, value: 0, invested: 0, gain: 0, gainPercent: 0, allocation: 0, allocation2: 0, gainUp: true },
  { icon: <FaLeaf />, color: "#6067ef", name: "Mid Cap", items: 0, value: 0, invested: 0, gain: 0, gainPercent: 0, allocation: 0, allocation2: 0, gainUp: true },
  { icon: <FaWallet />, color: "#7c3aed", name: "🌟 Case Study บทเรียนเตือนใจ", items: 0, value: 0, invested: 0, gain: 0, gainPercent: 0, allocation: 0, allocation2: 0, gainUp: false },
  { icon: <FaWallet />, color: "#7ee2fc", name: "Small Cap", items: 0, value: 0, invested: 0, gain: 0, gainPercent: 0, allocation: 0, allocation2: 0, gainUp: false }
];

export default function Portfolio() {
  const [portName, setPortName] = useState(defaultName);
  const [portDesc, setPortDesc] = useState(defaultDesc);
  const [groups, setGroups] = useState(defaultGroups);

  const pieData = groups.map(g => ({
    name: g.name,
    value: g.value,
    color: g.color
  }));

  const totalValue = groups.reduce((sum, g) => sum + Number(g.value || 0), 0);
  const totalInvested = groups.reduce((sum, g) => sum + Number(g.invested || 0), 0);
  const totalProfit = totalValue - totalInvested;
  const profitPercent = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
  const irr = profitPercent;
  const passive = groups.reduce((sum, g) => sum + (g.name.toLowerCase().includes('dividend') ? Number(g.value) : 0), 0) / (totalValue || 1) * 100;
  const passiveYear = Math.round(passive * totalValue / 100);

  const handleCellEdit = (idx, key, val) => {
    setGroups(gs =>
      gs.map((g, i) =>
        i === idx
          ? {
              ...g,
              [key]: key === "name" ? val : Number(val),
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

  const handleAddGroup = () => {
    setGroups(groups => [
      ...groups,
      {
        icon: <FaLayerGroup />,
        color: "#539bfc",
        name: "New Group",
        items: 0,
        value: 0,
        invested: 0,
        gain: 0,
        gainPercent: 0,
        allocation: 0,
        allocation2: 0,
        gainUp: true,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-2 md:px-6 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-gray-200">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-xl text-2xl text-blue-600">
              <FaWallet />
            </div>
            <EditableText
              value={portName}
              onChange={setPortName}
              className="text-2xl md:text-3xl font-bold text-gray-900"
              inputClass="text-2xl md:text-3xl"
            />
          </div>
          <EditableText
            value={portDesc}
            onChange={setPortDesc}
            multiline
            className="text-gray-700 text-sm md:text-base mb-2 block max-w-5xl"
            inputClass="text-sm md:text-base w-full"
          />
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Value */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col border border-gray-200">
            <div className="flex items-center gap-2 text-sky-600 mb-1 font-semibold">
              <FaChartLine className="text-sky-600" />
              Value
              <FaQuestionCircle title="มูลค่าพอร์ตปัจจุบัน" className="ml-1 opacity-70" />
            </div>
            <div className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</div>
            <div className="text-sky-700 text-base">${totalInvested.toLocaleString()} invested</div>
          </div>
          {/* Total profit */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col border border-gray-200">
            <div className="flex items-center gap-2 text-green-600 mb-1 font-semibold">
              <FaPiggyBank className="text-green-600" />
              Total profit
              <FaQuestionCircle title="กำไร/ขาดทุนรวม" className="ml-1 opacity-70" />
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
              <FaPercentage className="text-purple-600" />
              IRR
              <FaQuestionCircle title="ผลตอบแทน IRR" className="ml-1 opacity-70" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{irr.toFixed(2)}%</div>
            <div className="text-purple-400 text-base">{irr.toFixed(2)}% current holdings</div>
          </div>
          {/* Passive income */}
          <div className="bg-white rounded-xl p-6 shadow flex flex-col border border-gray-200">
            <div className="flex items-center gap-2 text-lime-600 mb-1 font-semibold">
              <FaCoins className="text-lime-600" />
              Passive income
              <FaQuestionCircle title="เงินปันผลหรือดอกเบี้ยรายปี" className="ml-1 opacity-70" />
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
              <button
                onClick={handleAddGroup}
                className="bg-sky-500 hover:bg-sky-600 px-4 py-1 rounded-md text-white font-semibold text-sm shadow transition"
              >
                + เพิ่มกลุ่มพอร์ต
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="text-gray-700 text-left text-sm">
                    <th className="pb-2">Name</th>
                    <th className="pb-2 text-right">Value/Invested</th>
                    <th className="pb-2 text-right">Gain</th>
                    <th className="pb-2 text-right">Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((g, i) => (
                    <tr key={i} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition">
                      <td className="py-2">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: g.color + "22" }}>
                            <span className="text-xl" style={{ color: g.color }}>{g.icon}</span>
                          </span>
                          <div>
                            <EditableText
                              value={g.name}
                              onChange={v => handleCellEdit(i, "name", v)}
                              className="font-semibold text-gray-900"
                              inputClass="font-semibold"
                            />
                            <div className="text-gray-400 text-xs">{g.items} items</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-right align-top">
                        <EditableText
                          value={"$" + g.value.toLocaleString()}
                          onChange={v => handleCellEdit(i, "value", v.replace(/[^0-9.]/g, ""))}
                          className="font-semibold text-gray-900"
                          inputClass="font-semibold text-right"
                        />
                        <EditableText
                          value={"$" + g.invested.toLocaleString()}
                          onChange={v => handleCellEdit(i, "invested", v.replace(/[^0-9.]/g, ""))}
                          className="text-gray-400 text-xs"
                          inputClass="text-xs text-right"
                        />
                      </td>
                      <td className="py-2 text-right align-top">
                        <span className={`font-semibold ${g.gainUp ? "text-green-600" : "text-red-400"}`}>
                          {(g.gainUp ? "+" : "") + "$" + g.gain.toLocaleString()}
                        </span>
                        <div className={`text-xs ${g.gainUp ? "text-green-600" : "text-red-400"}`}>
                          {g.gainUp ? "▲" : "▼"} {Math.abs(g.gainPercent).toFixed(2)}%
                        </div>
                      </td>
                      <td className="py-2 text-right align-top">
                        <span className="font-semibold text-gray-900">{g.allocation.toFixed(2)}%</span>
                        <span className="text-gray-400 text-xs block">{g.allocation2}%</span>
                      </td>
                    </tr>
                  ))}
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
