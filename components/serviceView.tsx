"use client";
import { X } from "lucide-react";
import { Service } from "@/lib/supabase";

export default function ServiceViewModal({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-4">{service.name}</h2>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />

        {service.images?.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-6">
            {service.images.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                className="h-32 w-full object-cover rounded"
              />
            ))}
          </div>
        )}

        <p className="text-sm text-gray-500 mt-4">
          Created: {new Date(service.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
