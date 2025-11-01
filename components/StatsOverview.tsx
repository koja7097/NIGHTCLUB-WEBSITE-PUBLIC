"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Stat {
  label: string;
  value: string | number;
}

interface ChartPoint {
  name: string;
  value: number;
}

interface Props {
  stats: Stat[];
  chartData: ChartPoint[];
}

export default function StatsOverview({ stats, chartData }: Props) {
  return (
    <div className="bg-gray-600 text-white p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Club Overview</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-700 transition-all duration-200"
          >
            <p className="text-gray-400 text-sm">{s.label}</p>
            <h3 className="text-2xl font-bold">{s.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-xl">
        <h3 className="text-lg mb-3 font-medium">Weekly Ticket Sales</h3>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}