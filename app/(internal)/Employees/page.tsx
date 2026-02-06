"use client"

import { useState } from "react"
import { FiEdit2, FiPlus, FiX, FiUsers } from "react-icons/fi"
import { MdPublic, MdOutlineCheckCircle, MdOutlineCancel } from "react-icons/md"
import DataTable, { Column } from "@/components/datatable"

/* ---------------- TYPES ---------------- */

type Employee = {
  id: string
  name: string
  email: string
  roleId: string
  roleName: string
  region: string
  isActive: boolean
}

type Role = {
  roleId: string
  roleName: string
}

type UserAnalytics = {
  totalEmployees: number
  regions: {
    india: number
    uk: number
  }
  status: {
    active: number
    inactive: number
  }
}

/* ---------------- STATIC DATA ---------------- */

const ROLES: Role[] = [
  { roleId: "admin", roleName: "Admin" },
  { roleId: "manager", roleName: "Manager" },
  { roleId: "employee", roleName: "Employee" },
]

const REGIONS = ["in", "uk"]

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Sai Krishna",
    email: "sai@ai4planning.com",
    roleId: "admin",
    roleName: "Employee",
    region: "in",
    isActive: true,
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@ai4planning.com",
    roleId: "employee",
    roleName: "Employee",
    region: "uk",
    isActive: false,
  },
]

/* ---------------- COMPONENTS ---------------- */

const StatusSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition ${
      checked ? "bg-green-500" : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform ${
        checked ? "translate-x-5" : ""
      }`}
    />
  </button>
)

/* ---------------- PAGE ---------------- */

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Employee | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    roleId: "",
    region: "",
  })

  /* ---------------- ANALYTICS (DERIVED) ---------------- */

  const analytics: UserAnalytics = {
    totalEmployees: employees.length,
    regions: {
      india: employees.filter((e) => e.region === "in").length,
      uk: employees.filter((e) => e.region === "uk").length,
    },
    status: {
      active: employees.filter((e) => e.isActive).length,
      inactive: employees.filter((e) => !e.isActive).length,
    },
  }

  /* ---------------- HANDLERS ---------------- */

  const handleSubmit = () => {
    if (editing) {
      setEmployees((prev) =>
        prev.map((e) =>
          e.id === editing.id
            ? {
                ...e,
                ...form,
                roleName:
                  ROLES.find((r) => r.roleId === form.roleId)?.roleName || "",
              }
            : e
        )
      )
    } else {
      setEmployees((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...form,
          roleName:
            ROLES.find((r) => r.roleId === form.roleId)?.roleName || "",
          isActive: true,
        },
      ])
    }

    setOpen(false)
    setEditing(null)
    setForm({ name: "", email: "", roleId: "", region: "" })
  }

  const handleEdit = (emp: Employee) => {
    setEditing(emp)
    setForm({
      name: emp.name,
      email: emp.email,
      roleId: emp.roleId,
      region: emp.region,
    })
    setOpen(true)
  }

  const toggleEmployeeStatus = (emp: Employee, value: boolean) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === emp.id ? { ...e, isActive: value } : e))
    )
  }

  /* ---------------- TABLE COLUMNS ---------------- */

  const columns: Column<Employee>[] = [
    {
      key: "sno",
      label: "S.No",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "roleName", label: "Role" },
    {
      key: "region",
      label: "Region",
      render: (v) => v.toUpperCase(),
    },
    {
      key: "isActive",
      label: "Status",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <StatusSwitch
            checked={value}
            onChange={(v) => toggleEmployeeStatus(row, v)}
          />
          <span className="text-xs">{value ? "Active" : "Inactive"}</span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (_, row) => (
        <button
          onClick={() => handleEdit(row)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <FiEdit2 />
        </button>
      ),
    },
  ]

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Employees</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
        >
          <FiPlus /> Add Employee
        </button>
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <FiUsers />
          <p className="text-sm mt-2">Total Employees</p>
          <h2 className="text-2xl font-semibold">
            {analytics.totalEmployees}
          </h2>
        </div>

        <div className="bg-white border rounded-lg p-4 text-center">
          <MdOutlineCheckCircle className="text-green-600 text-xl mx-auto" />
          <p className="text-sm">Active</p>
          <p className="text-lg font-semibold text-green-600">
            {analytics.status.active}
          </p>
        </div>

        <div className="bg-white border rounded-lg p-4 text-center">
          <MdOutlineCancel className="text-red-600 text-xl mx-auto" />
          <p className="text-sm">Inactive</p>
          <p className="text-lg font-semibold text-red-600">
            {analytics.status.inactive}
          </p>
        </div>
      </div>

      <DataTable data={employees} columns={columns} />

      {/* MODAL */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white w-96 rounded-xl p-6 relative">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4"
              >
                <FiX />
              </button>

              <h2 className="text-lg font-semibold mb-4">
                {editing ? "Edit Employee" : "Add Employee"}
              </h2>

              <div className="space-y-4">
                <input
                  placeholder="Name"
                  className="w-full border p-2 rounded"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
                <input
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
                <select
                  className="w-full border p-2 rounded"
                  value={form.roleId}
                  onChange={(e) =>
                    setForm({ ...form, roleId: e.target.value })
                  }
                >
                  <option value="">Select Role</option>
                  {ROLES.map((r) => (
                    <option key={r.roleId} value={r.roleId}>
                      {r.roleName}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full border p-2 rounded"
                  value={form.region}
                  onChange={(e) =>
                    setForm({ ...form, region: e.target.value })
                  }
                >
                  <option value="">Select Region</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-black text-white py-2 rounded-lg"
              >
                {editing ? "Update Employee" : "Create Employee"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
