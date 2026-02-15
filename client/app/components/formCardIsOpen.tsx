import React from "react";
import Link from "next/link";
import { Form } from "@/store/api/generated";

export default function FormCardIsOpen({
  isOpen,
  setIsOpen,
  form,
  isDeleting,
  handleDelete,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  form: Form;
  isDeleting: boolean;
  handleDelete: () => void;
}) {
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed bottom-0 top-0 left-0 right-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 bottom-full  mb-2 w-48 bg-white rounded-lg shadow-xl border z-20  flex flex-col">
            <Link
              href={`/forms/${form.id}/response`}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b text-left"
            >
              Подивитись відповіді
            </Link>

            <button
              disabled={isDeleting}
              onClick={handleDelete}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left font-medium"
            >
              {isDeleting ? "Видалення..." : "Видалити форму"}
            </button>
          </div>
        </>
      )}
    </>
  );
}
