// "use client";
// import { Edit2, Trash2, Calendar } from 'lucide-react';
// import { Service } from '../lib/supabase';

// interface ServiceCardProps {
//   service: Service;
//   onEdit: (service: Service) => void;
//   onDelete: (id: string) => void;
// }

// export default function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
//       {service.images && (
//         <div className="h-48 overflow-hidden bg-gray-100">
//           <img
//             src={service.images}
//             alt={service.name}
//             className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//             onError={(e) => {
//               e.currentTarget.src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800';
//             }}
//           />
//         </div>
//       )}

//       <div className="p-6">
//         <div className="flex items-start justify-between mb-3">
//           <h3 className="text-xl font-bold text-gray-900 flex-1">
//             {service.name}
//           </h3>
//           <div className="flex gap-2 ml-2">
//             <button
//               onClick={() => onEdit(service)}
//               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//               title="Edit service"
//             >
//               <Edit2 className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => onDelete(service.id)}
//               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//               title="Delete service"
//             >
//               <Trash2 className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div
//           className="text-gray-600 mb-4 prose prose-sm max-w-none line-clamp-3 [&_*]:my-0 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-0"
//           dangerouslySetInnerHTML={{ __html: service.description }}
//         />

//         <div className="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
//           <Calendar className="w-4 h-4 mr-2" />
//           <span>Created {formatDate(service.created_at)}</span>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { Edit2, Trash2, Calendar, Eye } from "lucide-react";
import { Service } from "../lib/supabase";

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export default function ServiceCard({
  service,
  onEdit,
  onDelete,
  onView,
}: ServiceCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ✅ Take first image safely
  const coverImage =
    service.images?.length > 0
      ? service.images[0]
      : "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="h-48 overflow-hidden bg-gray-100">
        <img
          src={coverImage}
          alt={service.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 flex-1">
            {service.name}
          </h3>

          <div className="flex gap-2 ml-2">
            {/* View */}
            <button
              onClick={() => onView(service.serviceId)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="View service"
            >
              <Eye className="w-5 h-5" />
            </button>

            {/* Edit */}
            <button
              onClick={() => onEdit(service)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit service"
            >
              <Edit2 className="w-5 h-5" />
            </button>

            {/* Delete */}
            <button
              onClick={() => onDelete(service.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete service"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Description */}
        <div
          className="text-gray-600 mb-4 prose prose-sm max-w-none line-clamp-3
          [&_*]:my-0 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-0"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />

        {/* Date */}
        <div className="flex items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Created {formatDate(service.created_at)}</span>
        </div>
      </div>
    </div>
  );
}
