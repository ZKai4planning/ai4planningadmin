// "use client";
// import { useState } from "react";
// import { Plus } from "lucide-react";

// import ServiceCard from "@/components/ServiceCard";
// import ServiceForm, { ServiceFormValues } from "@/components/ServicesForm";
// import { Service } from "@/lib/supabase";
// import ServiceViewModal from "@/components/serviceView";
// import { staticServices } from "@/lib/static-services";

// export default function ServicesPage() {
//   const [services, setServices] = useState<Service[]>(staticServices);
//   const [showForm, setShowForm] = useState(false);
//   const [editingService, setEditingService] = useState<Service | null>(null);
//   const [viewService, setViewService] = useState<Service | null>(null);

//   const handleCreateOrUpdate = (values: ServiceFormValues) => {
//     const now = new Date().toISOString();

//     if (editingService) {
//       setServices((prev) =>
//         prev.map((service) =>
//           service.id === editingService.id
//             ? {
//                 ...service,
//                 name: values.name,
//                 description: values.description,
//                 images: values.images,
//                 updated_at: now,
//               }
//             : service
//         )
//       );
//     } else {
//       const id = `srv-${Date.now()}`;
//       const newService: Service = {
//         id,
//         serviceId: id,
//         name: values.name,
//         description: values.description,
//         images: values.images,
//         created_at: now,
//         updated_at: now,
//       };
//       setServices((prev) => [newService, ...prev]);
//     }

//     setShowForm(false);
//     setEditingService(null);
//   };

//   const handleEdit = (service: Service) => {
//     setEditingService(service);
//     setShowForm(true);
//   };

//   const handleView = (serviceId: string) => {
//     const target = services.find(
//       (service) => service.serviceId === serviceId || service.id === serviceId
//     );
//     if (target) {
//       setViewService(target);
//     }
//   };

//   const handleDelete = (id: string) => {
//     if (!confirm("Are you sure?")) return;
//     setServices((prev) => prev.filter((service) => service.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="flex justify-between mb-8">
//           <h1 className="text-4xl font-bold">Services</h1>
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg flex gap-2"
//           >
//             <Plus /> Create Service
//           </button>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {services.map((service) => (
//             <ServiceCard
//               key={service.id}
//               service={service}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               onView={handleView}
//             />
//           ))}
//         </div>
//       </div>

//       {showForm && (
//         <ServiceForm
//           service={editingService}
//           onSubmit={handleCreateOrUpdate}
//           onCancel={() => {
//             setShowForm(false);
//             setEditingService(null);
//           }}
//         />
//       )}

//       {viewService && (
//         <ServiceViewModal
//           service={viewService}
//           onClose={() => setViewService(null)}
//         />
//       )}
//     </div>
//   );
// }


import React from 'react'

const page = () => {
  return (
    <div>
      services
    </div>
  )
}

export default page
