import type { LogoutPopupProps } from "../types/types";

export default function LogoutPopup({onCancel, onLogout} : LogoutPopupProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg w-80 overflow-hidden">
      <div className="border-b py-3 bg-gray-100">
        <h3 className="text-center text-red-600 font-semibold">
          Are you sure?
        </h3>
      </div>
      <div className="p-6">
        <p className="text-center text-gray-600 mb-6">
          Do you want to log out?
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onLogout}
            className="px-8 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Log out
          </button>
          <button
            onClick={onCancel}
            className="px-8 py-2 border border-gray-300 text-gray-500 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
