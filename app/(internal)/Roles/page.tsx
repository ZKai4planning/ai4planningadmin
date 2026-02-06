"use client"

import { useState } from "react"
import { FiEdit2, FiPlus, FiX } from "react-icons/fi"
import DataTable, { Column } from "@/components/datatable"

/* ---------------- TYPES ---------------- */

type Role = {
  id: string
  roleId: string
  roleName: string
  status: number // 0 = Active, 1 = Inactive
}

/* ---------------- STATIC DATA ---------------- */

const INITIAL_ROLES: Role[] = [
  {
    id: "1",
    roleId: "admin",
    roleName: "Admin",
    status: 0,
    isActive: true,
  },
  {
    id: "2",
    roleId: "manager",
    roleName: "Manager",
    status: 0,
    isActive: true,
  },
  {
    id: "3",
    roleId: "employee",
    roleName: "Employee",
    status: 0,
    isActive: true,
  },
]

/* ---------------- PAGE ---------------- */

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Role | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [form, setForm] = useState({
    roleName: "",
    status: 0,
  })

  /* ---------------- CRUD (LOCAL) ---------------- */

  const handleSubmit = () => {
    if (!form.roleName) {
      setErrors({ roleName: "Role name is required" })
      return
    }

    setLoading(true)

    if (editing) {
      setRoles((prev) =>
        prev.map((r) =>
          r.roleId === editing.roleId
            ? { ...r, roleName: form.roleName, status: form.status }
            : r
        )
      )
    } else {
      setRoles((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          roleId: form.roleName.toLowerCase().replace(/\s+/g, "_"),
          roleName: form.roleName,
          status: 0,
        },
      ])
    }

    handleClose()
    setLoading(false)
  }

  const handleEdit = (role: Role) => {
    setEditing(role)
    setForm({
      roleName: role.roleName,
      status: role.status,
    })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditing(null)
    setErrors({})
    setForm({ roleName: "", status: 0 })
  }

  /* ---------------- COLUMNS ---------------- */

  const columns: Column<Role>[] = [
    {
      key: "sno",
      label: "S.No",
      render: (_, __, index, startIndex) =>
        startIndex + index + 1,
    },
    {
      key: "roleName",
      label: "Role Name",
      className: "font-medium",
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`text-xs font-medium ${
            value === 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {value === 0 ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
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
        <h1 className="text-xl font-semibold">Roles</h1>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
        >
          <FiPlus /> Add Role
        </button>
      </div>

      <DataTable data={roles} columns={columns} />

      {/* MODAL */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white w-96 rounded-xl p-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <FiX />
              </button>

              <h2 className="text-lg font-semibold mb-5">
                {editing ? "Edit Role" : "Add Role"}
              </h2>

              <div className="space-y-4">
                {/* Role Name */}
                <div>
                  <label className="text-sm">Role Name</label>
                  <input
                    value={form.roleName}
                    onChange={(e) => {
                      setForm({ ...form, roleName: e.target.value })
                      if (errors.roleName)
                        setErrors({ ...errors, roleName: "" })
                    }}
                    className={`w-full border p-2 rounded mt-1 ${
                      errors.roleName ? "border-red-500" : ""
                    }`}
                    placeholder="Admin"
                  />
                  {errors.roleName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.roleName}
                    </p>
                  )}
                </div>

                {/* Status (only while editing) */}
                {editing && (
                  <div>
                    <label className="text-sm">Status</label>
                    <select
                      className="w-full border p-2 rounded bg-white mt-1"
                      value={form.status}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: Number(e.target.value),
                        })
                      }
                    >
                      <option value={0}>Active</option>
                      <option value={1}>Inactive</option>
                    </select>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !form.roleName}
                className="mt-6 w-full bg-black text-white py-2 rounded-lg
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Saving..."
                  : editing
                  ? "Update Role"
                  : "Create Role"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
