"use client"
import React from 'react'

import Table from '@/components/tablex'
import Tablez from '@/components/tablez'
import { useAuthStore } from '@/lib/zustand'
const page = () => {
    const userName = useAuthStore((state) => state.userName)
    console.log("User Name from Zustand Store:", userName);
  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl text-blue-700 font-bold mb-4">My dashboard</h1>
      </div>
      {
        userName==="agentX" ? (
            <Table onView={() => alert("View clicked")} />
        ) : userName==="agentZ" ? ( 
           <Tablez />
        ) : (
          <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h1>
        )
      }
   
    </div>
  )
}

export default page