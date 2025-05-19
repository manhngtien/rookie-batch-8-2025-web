import type { LogoutPopupProps } from "../types/types";

export default function LogoutPopup({ onCancel, onLogout }: LogoutPopupProps) {
  return (
    <div className="w-80 overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="border-b bg-gray-100 py-3">
        <h3 className="text-center font-semibold text-red-600">
          Are you sure?
        </h3>
      </div>
      <div className="p-6">
        <p className="mb-6 text-center text-gray-600">
          Do you want to log out?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onLogout}
            className="rounded bg-red-600 px-8 py-2 text-white hover:bg-red-700"
          >
            Log out
          </button>
          <button
            onClick={onCancel}
            className="rounded border border-gray-300 px-8 py-2 text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
