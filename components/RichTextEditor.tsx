


// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import {
//   Bold,
//   Italic,
//   Heading1,
//   Heading2,
//   List,
//   ListOrdered,
//   Undo2,
//   Redo2,
// } from "lucide-react";
// import { useRef } from "react";

// interface RichTextEditorProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// export default function RichTextEditor({
//   value,
//   onChange,
// }: RichTextEditorProps) {
//   const isInitialRender = useRef(true);

//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: value,
//     immediatelyRender: false,
//     onUpdate: ({ editor }) => {
//       // 🔒 Prevent update on initial mount
//       if (isInitialRender.current) {
//         isInitialRender.current = false;
//         return;
//       }
//       onChange(editor.getHTML());
//     },
//   });

//   if (!editor) return null;

//   const buttonClass = (isActive: boolean) =>
//     `p-2 rounded-lg transition-colors ${
//       isActive
//         ? "bg-blue-100 text-blue-600"
//         : "text-gray-600 hover:bg-gray-100"
//     }`;

//   return (
//     <div className="border border-gray-300 rounded-lg overflow-hidden">
//       {/* Toolbar */}
//       <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={buttonClass(editor.isActive("bold"))}
//         >
//           <Bold className="w-4 h-4" />
//         </button>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={buttonClass(editor.isActive("italic"))}
//         >
//           <Italic className="w-4 h-4" />
//         </button>

//         <div className="w-px bg-gray-300 mx-1" />

//         <button
//           type="button"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 1 }).run()
//           }
//           className={buttonClass(editor.isActive("heading", { level: 1 }))}
//         >
//           <Heading1 className="w-4 h-4" />
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 2 }).run()
//           }
//           className={buttonClass(editor.isActive("heading", { level: 2 }))}
//         >
//           <Heading2 className="w-4 h-4" />
//         </button>

//         <div className="w-px bg-gray-300 mx-1" />

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={buttonClass(editor.isActive("bulletList"))}
//         >
//           <List className="w-4 h-4" />
//         </button>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={buttonClass(editor.isActive("orderedList"))}
//         >
//           <ListOrdered className="w-4 h-4" />
//         </button>

//         <div className="w-px bg-gray-300 mx-1" />

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().undo().run()}
//           className={buttonClass(false)}
//         >
//           <Undo2 className="w-4 h-4" />
//         </button>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().redo().run()}
//           className={buttonClass(false)}
//         >
//           <Redo2 className="w-4 h-4" />
//         </button>
//       </div>

//       {/* Editor */}
//       <EditorContent
//         editor={editor}
//         className="
//           px-4 py-3 min-h-64 focus:outline-none
//           [&_ul]:list-disc [&_ul]:ml-6
//           [&_ol]:list-decimal [&_ol]:ml-6
//           [&_li]:my-1
//           [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-3
//           [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:my-2
//           [&_p]:my-2
//         "
//       />
//     </div>
//   );
// }


"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Undo2,
  Redo2,
} from "lucide-react";
import { useEffect, useRef } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const isUpdatingFromOutside = useRef(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (isUpdatingFromOutside.current) return;
      onChange(editor.getHTML());
    },
  });

  // 🔥 SYNC editor when value changes (EDIT MODE FIX)
  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();

    if (value !== currentContent) {
      isUpdatingFromOutside.current = true;
      editor.commands.setContent(value || "", false);
      isUpdatingFromOutside.current = false;
    }
  }, [value, editor]);

  if (!editor) return null;

  const buttonClass = (isActive: boolean) =>
    `p-2 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-100 text-blue-600"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={buttonClass(editor.isActive("heading", { level: 1 }))}
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive("bulletList"))}
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive("orderedList"))}
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={buttonClass(false)}
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className={buttonClass(false)}
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="
          px-4 py-3 min-h-64 focus:outline-none
          [&_ul]:list-disc [&_ul]:ml-6
          [&_ol]:list-decimal [&_ol]:ml-6
          [&_li]:my-1
          [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-3
          [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:my-2
          [&_p]:my-2
        "
      />
    </div>
  );
}
