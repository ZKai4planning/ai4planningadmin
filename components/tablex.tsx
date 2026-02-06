"use client"

import { useState } from "react"
import {ConstructionDetails} from "../components/ConstructionDetailsModal"
export default function Table() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="space-y-8">
      {/* ===== TABLE ===== */}
      <div className="w-full overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <table className="w-full text-sm text-slate-700">
          <thead className="bg-slate-50 border-b">
            <tr>
              {[
                "#",
                "Cust-ID",
                "Cust-Name",
                "Date",
                "Service-ID",
                "Service",
                "Sub-Service-ID",
                "Sub-Service",
                "Reference No",
                "Status",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="px-4 py-3 text-left font-semibold text-slate-600 whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="border-b hover:bg-slate-50 transition">
              <td className="px-4 py-3">1</td>
              <td className="px-4 py-3 font-medium">CUST-001</td>
              <td className="px-4 py-3">Ajay c</td>
              <td className="px-4 py-3">01-01-2022</td>
              <td className="px-4 py-3 font-medium">SRV-001</td>
              <td className="px-4 py-3 underline cursor-pointer">
                Home Services
              </td>
              <td className="px-4 py-3 font-medium">SUB-014</td>
              <td className="px-4 py-3 underline cursor-pointer">
                Home Reconstruction
              </td>
              <td className="px-4 py-3 font-mono text-xs">
                asdasd123
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Approved
                </span>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => setShowDetails(true)}
                  className="rounded-lg border border-blue-600 px-4 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== DETAILS SECTION (NORMAL PAGE) ===== */}
      {showDetails && <ConstructionDetails />}
    </div>
  )
}
