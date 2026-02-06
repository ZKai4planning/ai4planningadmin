"use client"

import { CheckCircle2 } from "lucide-react"

/* ================= FIELD COMPONENT ================= */
function Field({
  label,
  value,
  verified = false,
}: {
  label: string
  value: string
  verified?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">
        {label}
      </label>

      <div className="relative">
        <input
          readOnly
          value={value}
          className="w-full rounded-lg border bg-white px-3 py-2 pr-10 text-sm"
        />

        {verified && (
          <CheckCircle2
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600"
          />
        )}
      </div>
    </div>
  )
}

/* ================= CONSTRUCTION DETAILS ================= */
export function ConstructionDetails() {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Construction Details
        </h2>
        <p className="text-sm text-slate-500">
          View detailed information about the construction request
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Field label="Customer Name" value="Ajay C" />
        <Field label="Customer ID" value="CUST-001" />
        <Field label="Service Selected" value="Home Services" />
        <Field label="Sub Service" value="Home Reconstruction" />
        <Field label="Site Location" value="Hyderabad" />
        <Field label="Start Date" value="01-01-2022" />

        {/* ✅ STATUS WITH VERIFIED ICON */}
        <Field label="Status" value="Approved" verified />

        {/* ===== CONTACT DETAILS ===== */}
        <div className="md:col-span-2 rounded-xl border bg-slate-50 p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-700">
            Contact Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Phone Number" value="+91 98765 43210" />
            <Field label="Email Address" value="ajay@example.com" />
          </div>
        </div>

        {/* ===== PAYMENT DETAILS ===== */}
        <div className="md:col-span-2 rounded-xl border bg-slate-50 p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-700">
            Payment Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Field label="Amount" value="₹39.99" />
            <Field label="Payment Date" value="12-01-2022" />
            <Field label="Payment Method" value="STRIPE" />
            <Field label="Payment Reference No" value="AB12-34CD-56" />
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Description
          </label>
          <textarea
            readOnly
            rows={3}
            className="w-full rounded-lg border bg-slate-50 px-3 py-2 text-sm"
            value="Complete home reconstruction including flooring, wiring, interiors."
          />
        </div>
      </div>
    </div>
  )
}
