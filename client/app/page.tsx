"use client";
import Link from "next/link";
import { useGetFormsQuery } from "./store/api/generated";
import FormCard from "./components/formCard";
import { useEffect } from "react";

export default function Page() {
  const { data, isLoading, error, refetch } = useGetFormsQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <div className="p-8">Завантаження...</div>;
  if (error)
    return (
      <div className="p-8 text-red-500">Помилка при завантаженні даних</div>
    );

  return (
    <main className="px-6 py-8">
      <h1 className="flex items-center justify-center text-5xl pb-8 font-bold">
        Форми для заповнення
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data?.forms.map((form) => (
          <FormCard key={form.id} form={form} refetch={refetch} />
        ))}

        <Link
          href="/forms/new"
          className="text-center bg-fuchsia-700 text-white rounded-xl min-h-52 flex items-center justify-center hover:bg-fuchsia-400 transition-all duration-300 text-xl hover:text-black px-4"
        >
          Створити нову форму
        </Link>
      </div>
    </main>
  );
}
