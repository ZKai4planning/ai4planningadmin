// 'use client'

// import { useMemo, useState } from 'react'
// import DataTable, { Column } from '@/components/datatable'
// import { FiUsers } from 'react-icons/fi'
// import { MdOutlineCheckCircle, MdOutlineCancel } from 'react-icons/md'

// /* ---------------- TYPES ---------------- */

// type User = {
//   _id: string
//   userId: string
//   email: string
//   status: number // 0 = active, 1 = inactive
//   createdAt: string
//   isActive?: boolean
//   profile?: {
//     profilePicture?: string
//     fullName?: string
//   }
// }

// /* ---------------- STATIC DATA ---------------- */

// const MOCK_USERS: User[] = [
//   {
//     _id: '1',
//     userId: 'USR001',
//     email: 'sai@gmail.com',
//     isActive: true,
//     status: 0,
//     createdAt: '2024-12-01',
//     profile: {
//       fullName: 'Sai Krishna',
//       profilePicture: 'https://placehold.co/40x40',
//     },
//   },
//   {
//     _id: '2',
//     userId: 'USR002',
//     email: 'john@gmail.com',
//     isActive: false,
//     status: 1,
//     createdAt: '2024-11-15',
//     profile: {
//       fullName: 'John Doe',
//     },
//   },
//   {
//     _id: '3',
//     userId: 'USR003',
//     email: 'emma@gmail.com',
//     status: 0,
//     isActive: true,
//     createdAt: '2024-10-20',
//     profile: {
//       fullName: 'Emma Watson',
//     },
//   },
// ]

// /* ---------------- PAGE ---------------- */

// export default function UsersPage() {
//   const [users, setUsers] = useState<User[]>(MOCK_USERS)
//   const [page, setPage] = useState(1)
//   const [limit, setLimit] = useState(10)

//   /* ---------------- DERIVED DATA ---------------- */

//   const total = users.length

//   const paginatedUsers = useMemo(() => {
//     const start = (page - 1) * limit
//     return users.slice(start, start + limit)
//   }, [users, page, limit])

//   const analytics = {
//     activeUsers: users.filter((u) => u.status === 0).length,
//     inactiveUsers: users.filter((u) => u.status === 1).length,
//   }

//   /* ---------------- ACTIONS ---------------- */

//   const toggleUserStatus = (user: User) => {
//     setUsers((prev) =>
//       prev.map((u) =>
//         u._id === user._id
//           ? { ...u, status: u.status === 0 ? 1 : 0 }
//           : u
//       )
//     )
//   }

//   /* ---------------- TABLE COLUMNS ---------------- */

//   const columns: Column<User>[] = [
//     {
//       key: 'sno',
//       label: 'S.No',
//       className: 'text-center font-medium',
//       render: (_, __, index, startIndex) => startIndex + index + 1,
//     },
//     {
//       key: 'profilePicture',
//       label: 'Profile',
//       render: (_, row) => {
//         const image = row.profile?.profilePicture

//         return (
//           <img
//             src={image || 'https://placehold.co/40x40'}
//             alt={row.profile?.fullName || 'User Avatar'}
//             className="w-8 h-8 rounded-full object-cover border"
//           />
//         )
//       },
//     },
//     {
//       key: 'userId',
//       label: 'User ID',
//     },
//     {
//       key: 'email',
//       label: 'Email',
//     },
//     {
//       key: 'status',
//       label: 'Status',
//       render: (_, row) => (
//         <div className="flex items-center gap-2">
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={row.status === 0}
//               onChange={() => toggleUserStatus(row)}
//               className="sr-only peer"
//             />
//             <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 transition" />
//             <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5" />
//           </label>

//           <span className="text-xs">
//             {row.status === 0 ? 'Active' : 'Inactive'}
//           </span>
//         </div>
//       ),
//     },
//     {
//       key: 'createdAt',
//       label: 'Created At',
//       render: (value) => new Date(value).toLocaleDateString(),
//     },
//   ]

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-semibold">Users</h1>

//       {/* ANALYTICS */}
//       <div className="grid grid-cols-5">
//         <div className="bg-white border rounded-lg p-4">
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <FiUsers className="text-gray-600 text-lg" />
//             <p className="text-sm text-gray-600 font-medium">
//               Total Users
//             </p>
//           </div>

//           <div className="flex justify-around">
//             <div className="flex flex-col items-center">
//               <div className="flex items-center gap-1 text-green-600">
//                 <MdOutlineCheckCircle className="text-lg" />
//                 <p className="text-xs">Active</p>
//               </div>
//               <p className="text-lg font-semibold text-green-600">
//                 {analytics.activeUsers}
//               </p>
//             </div>

//             <div className="flex flex-col items-center">
//               <div className="flex items-center gap-1 text-red-600">
//                 <MdOutlineCancel className="text-lg" />
//                 <p className="text-xs">Inactive</p>
//               </div>
//               <p className="text-lg font-semibold text-red-600">
//                 {analytics.inactiveUsers}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* TABLE */}
//       <DataTable
//         data={paginatedUsers}
//         columns={columns}
//         serverPage={page}
//         serverLimit={limit}
//         total={total}
//         onServerPageChange={setPage}
//         onServerLimitChange={(l) => {
//           setLimit(l)
//           setPage(1)
//         }}
//       />
//     </div>
//   )
// }
import React from 'react'

const page = () => {
  return (
    <div>
      users
    </div>
  )
}

export default page

