"use client";
import { use, useEffect } from "react";
import { useGetFormQuery, useGetResponsesQuery } from "@/store/api/generated";
import Link from "next/link";

export default function ResponsesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: formData, isLoading: formLoading } = useGetFormQuery({ id });
  const {
    data: respData,
    isLoading: respLoading,
    refetch,
  } = useGetResponsesQuery({
    formId: id,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (formLoading || respLoading)
    return <div className="p-8">Завантаження відповідей...</div>;

  if (!formData || !formData.form)
    return <div className="p-8">Форму не знайдено</div>;

  return (
    <main className="flex flex-col pt-8 items-center">
      <div className="w-6/12 flex flex-col gap-4">
        <Link
          href="/"
          className="bg-fuchsia-700 w-2/12 text-center hover:bg-fuchsia-500 hover:text-black duration-300 text-white px-4 py-2 rounded-lg transition-colors"
        >
          На головну
        </Link>
        <h1 className="text-3xl font-bold">
          Відповіді на: {formData.form.title}
        </h1>
        <p className="text-gray-500">
          Всього отримано відповідей: {respData?.responses.length || 0}
        </p>

        {respData?.responses && respData.responses.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed rounded-xl text-gray-400">
            На цю форму ще ніхто не відповів
          </div>
        ) : (
          <div className="space-y-8">
            {respData?.responses.map((response, index) => (
              <div
                key={response.id}
                className="bg-white border border-l-8 border-l-indigo-500 rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-sm font-bold text-indigo-700 uppercase mb-4">
                  Відповідь №{index + 1}
                </h2>
                <div className="space-y-4">
                  {formData.form?.questions.map((q) => {
                    const answer = response.answers.find(
                      (a) => a.questionId === q.id,
                    );
                    return (
                      <div
                        key={q.id}
                        className="border-l-4 border-gray-100 pl-4"
                      >
                        <p className="text-sm text-gray-500">{q.title}</p>
                        <p className="font-medium text-gray-800">
                          {answer?.value || (
                            <span className="text-gray-300 italic">
                              Не заповнено
                            </span>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
