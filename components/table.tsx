"use client";

export default function Table({
  onView,
}: {
  onView: () => void;
}) {
  return (
    <div className="w-full rounded-2xl border bg-white p-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-slate-700">
          <thead>
            <tr className="bg-slate-50">
              {[
                "#",
                "Date",
                "Service",
                "Sub-service",
                "Reference no",
                "Status",
                "Action",
              ].map(head => (
                <th
                  key={head}
                  className="border-b px-4 py-3 text-left font-semibold text-slate-600"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="hover:bg-slate-50">
              <td className="border-b px-4 py-3">1</td>
              <td className="border-b px-4 py-3">01-01-2022</td>
              <td className="border-b px-4 py-3 text-blue-600">Xyz</td>
              <td className="border-b px-4 py-3 text-blue-600">Abc</td>
              <td className="border-b px-4 py-3">asdasd123</td>
              <td className="border-b px-4 py-3">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Approved
                </span>
              </td>
              <td className="border-b px-4 py-3">
                <button
                  onClick={onView}
                  className="rounded-lg border px-4 py-1.5 text-sm hover:bg-slate-100"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
