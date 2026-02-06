

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { X, Plus } from "lucide-react";
// import RichTextEditor from "./RichTextEditor";
// import { Service } from "../lib/supabase";

// export interface ServiceFormValues {
//   name: string;
//   description: string;
//   images: string[];
// }

// interface ServiceFormProps {
//   service?: Service | null;
//   onSubmit: (values: ServiceFormValues) => Promise<void> | void;
//   onCancel: () => void;
// }

// export default function ServiceForm({
//   service,
//   onSubmit,
//   onCancel,
// }: ServiceFormProps) {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   // Existing images (URLs)
//   const [existingImages, setExistingImages] = useState<string[]>([]);

//   // New images (Files)
//   const [imageFiles, setImageFiles] = useState<File[]>([]);

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const isHydrating = useRef(false);

//   // ---------------------------
//   // Populate on edit
//   // ---------------------------
//   useEffect(() => {
//     isHydrating.current = true;

//     if (service) {
//       setName(service.name);
//       setDescription(service.description || "");
//       setExistingImages(service.images ?? []);
//       setImageFiles([]);
//     } else {
//       setName("");
//       setDescription("");
//       setExistingImages([]);
//       setImageFiles([]);
//     }

//     setTimeout(() => {
//       isHydrating.current = false;
//     }, 0);
//   }, [service]);

//   // ---------------------------
//   // Add image one by one
//   // ---------------------------
//   const handleAddImage = (file: File) => {
//     setImageFiles((prev) => [...prev, file]);
//   };

//   // ---------------------------
//   // Remove new image
//   // ---------------------------
//   const removeNewImage = (index: number) => {
//     setImageFiles((prev) => prev.filter((_, i) => i !== index));
//   };

//   // ---------------------------
//   // Remove existing image
//   // ---------------------------
//   const removeExistingImage = (index: number) => {
//     setExistingImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   // ---------------------------
//   // Submit
//   // ---------------------------
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const newImageUrls = imageFiles.map((file) =>
//         URL.createObjectURL(file)
//       );

//       await onSubmit({
//         name: name.trim(),
//         description,
//         images: [...existingImages, ...newImageUrls],
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between">
//           <h2 className="text-2xl font-bold">
//             {service ? "Edit Service" : "Create Service"}
//           </h2>
//           <button onClick={onCancel}>
//             <X className="w-6 h-6 text-gray-400" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Service Name
//             </label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Description
//             </label>
//             <RichTextEditor
//               value={description}
//               onChange={(val) => {
//                 if (!isHydrating.current) {
//                   setDescription(val);
//                 }
//               }}
//             />
//           </div>

//           {/* Image uploader */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Service Images
//             </label>

//             <label className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
//               <Plus size={16} />
//               Add Image
//               <input
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={(e) => {
//                   if (e.target.files?.[0]) {
//                     handleAddImage(e.target.files[0]);
//                     e.target.value = "";
//                   }
//                 }}
//               />
//             </label>

//             {/* Existing images */}
//             {existingImages.length > 0 && (
//               <>
//                 <p className="text-sm font-medium mt-4">Existing Images</p>
//                 <div className="flex gap-3 flex-wrap mt-2">
//                   {existingImages.map((img, index) => (
//                     <div key={index} className="relative">
//                       <img
//                         src={img}
//                         className="h-24 w-24 object-cover rounded border"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeExistingImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
//                       >
//                         <X size={12} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* New images */}
//             {imageFiles.length > 0 && (
//               <>
//                 <p className="text-sm font-medium mt-4">New Images</p>
//                 <div className="flex gap-3 flex-wrap mt-2">
//                   {imageFiles.map((file, index) => (
//                     <div key={index} className="relative">
//                       <img
//                         src={URL.createObjectURL(file)}
//                         className="h-24 w-24 object-cover rounded border"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeNewImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
//                       >
//                         <X size={12} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex gap-3 pt-4">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
//             >
//               {isSubmitting
//                 ? "Saving..."
//                 : service
//                 ? "Update Service"
//                 : "Create Service"}
//             </button>

//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-6 py-3 border rounded-lg"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
