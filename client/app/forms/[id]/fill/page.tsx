"use client";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  useGetFormQuery,
  useSubmitResponseMutation,
  QuestionType,
} from "@/store/api/generated";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading, error } = useGetFormQuery({ id });

  const [submitResponse, { isLoading: isSubmitting }] =
    useSubmitResponseMutation();

  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (isLoading)
    return <div className="p-8 text-center">Завантаження форми...</div>;
  if (error || !data?.form)
    return <div className="p-8 text-red-500">Помилка: форму не знайдено</div>;

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, value]) => ({
        questionId,
        value,
      }),
    );

    try {
      await submitResponse({
        formId: id,
        answers: formattedAnswers,
      }).unwrap();

      alert("Форму успішно відправлено!");
      router.push("/");
    } catch (err) {
      alert("Не вдалося відправити відповіді");
    }
  };
  const handleCheckboxChange = (questionId: string, option: string) => {
    setAnswers((prev) => {
      const currentVal = prev[questionId] || "";
      const selectedOptions = currentVal ? currentVal.split(", ") : [];

      let newOptions;
      if (selectedOptions.includes(option)) {
        newOptions = selectedOptions.filter((item) => item !== option);
      } else {
        newOptions = [...selectedOptions, option];
      }

      return { ...prev, [questionId]: newOptions.join(", ") };
    });
  };

  return (
    <main className="w-full pt-8 items-center flex flex-col">
      <div className="w-6/12">
        <div className="shadow-lg border border-t-8 border-t-fuchsia-700 rounded-xl p-6 ">
          <h1 className="text-3xl font-bold">{data.form.title}</h1>
          {data.form.description && (
            <p className="text-gray-600 mt-2">{data.form.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="pt-8 flex flex-col gap-4 ">
          {data.form.questions.map((q) => (
            <div
              key={q.id}
              className="border border-l-8 border-l-indigo-500 rounded-xl bg-gray-50 p-4 relative"
            >
              <label className="block text-lg font-medium">{q.title}</label>

              {q.type === QuestionType.Text && (
                <input
                  type="text"
                  className="w-full border-b  outline-none pb-1 transition-colors"
                  placeholder="Ваша відповідь"
                  required
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                />
              )}

              {q.type === QuestionType.Date && (
                <input
                  type="date"
                  className="border p-2 rounded outline-none focus:ring-1 "
                  required
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                />
              )}

              {(q.type === QuestionType.Radio ||
                q.type === QuestionType.Checkbox) && (
                <div className="space-y-2">
                  {q.options?.map((opt, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type={
                          q.type === QuestionType.Radio ? "radio" : "checkbox"
                        }
                        name={q.id}
                        required={q.type === QuestionType.Radio}
                        onChange={() => {
                          if (q.type === QuestionType.Checkbox) {
                            handleCheckboxChange(q.id, opt || "");
                          } else {
                            handleInputChange(q.id, opt || "");
                          }
                        }}
                        className="w-4 h-4 text-fuchsia-700"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end ">
            <button
              type="submit"
              disabled={isSubmitting}
              className=" bg-fuchsia-700 cursor-pointer  hover:bg-fuchsia-400 transition-all duration-300 hover:text-black text-white px-6 py-2 rounded-lg font-bold"
            >
              {isSubmitting ? "Відправка..." : "Надіслати"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
