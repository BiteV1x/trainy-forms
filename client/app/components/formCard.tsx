"use client";
import { useState } from "react";
import Link from "next/link";
import { Form, useDeleteFormMutation } from "@/store/api/generated";
import FormCardIsOpen from "./formCardIsOpen";

export default function FormCard({
  form,
  refetch,
}: {
  form: Form;
  refetch: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();
  const handleDelete = async () => {
    if (confirm("Ви впевнені, що хочете видалити цю форму?")) {
      try {
        await deleteForm({ id: form.id }).unwrap();
        setIsOpen(false);
        refetch();
        alert("Форма успішно видалена");
      } catch (error) {
        alert("Помилка при видаленні форми");
      }
    }
  };

  return (
    <div className="rounded-xl bg-indigo-100 px-4 flex flex-col gap-4 justify-center min-h-52 border-2 border-dashed relative">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          {form.title
            ? form.title.length > 20
              ? form.title.slice(0, 20) + "…"
              : form.title
            : ""}
        </h2>
        <p className="text-sm text-gray-600">
          {form.description
            ? form.description.length > 60
              ? form.description.slice(0, 60) + "…"
              : form.description
            : ""}
        </p>
      </div>

      <div className="h-px w-full bg-gray-600" />

      <div className="flex flex-row items-center justify-between gap-3 relative">
        <Link
          href={`/forms/${form.id}/fill`}
          className="bg-fuchsia-700 text-white hover:bg-fuchsia-400 transition-all duration-300 px-3 rounded-lg py-1 hover:text-black text-sm"
        >
          Відкрити форму
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-6 h-6 cursor-pointer flex flex-col gap-1 justify-center items-center group"
          >
            <div className="bg-black h-0.5 w-5 transition-all group-hover:bg-gray-600" />
            <div className="bg-black h-0.5 w-5 transition-all group-hover:bg-gray-600" />
            <div className="bg-black h-0.5 w-5 transition-all group-hover:bg-gray-600" />
          </button>
          <FormCardIsOpen
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            form={form}
            isDeleting={isDeleting}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
