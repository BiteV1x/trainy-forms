"use client";

import { QuestionType } from "@/store/api/generated";
import ButtonType from "./components/buttonType";
import { useFormBuilder } from "@/hooks/useFormBuilder";

const ButtonData = [
  { type: QuestionType.Text, label: "+ Текст" },
  { type: QuestionType.Radio, label: "+ Вибір (один)" },
  { type: QuestionType.Checkbox, label: "+ Вибір (кілька)" },
  { type: QuestionType.Date, label: "+ Дата" },
];

export default function Page() {
  const {
    title,
    description,
    questions,
    setTitle,
    setDescription,
    addQuestion,
    removeQuestion,
    removeOption,
    updateQuestion,
    handleSave,
    isSaving,
  } = useFormBuilder();
  return (
    <main className="w-full pt-8 items-center flex flex-col">
      <div className="w-6/12">
        <h1 className="text-4xl pb-8 text-center font-bold">
          Створення нової форми
        </h1>

        <section className="p-6  shadow-lg border border-t-8 border-t-fuchsia-700 rounded-xl flex flex-col gap-4 ">
          <input
            className="w-full text-3xl font-semibold border-b outline-none"
            placeholder="Назва форми"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full text-gray-500 border-b outline-none"
            placeholder="Опис (необов'язково)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </section>

        <section className=" pt-8 flex flex-col gap-4">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="p-4 border border-l-8 border-l-indigo-500 rounded-xl bg-gray-50 relative"
            >
              <div className="flex justify-between mb-2">
                <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">
                  Запитання {index + 1} ({q.type})
                </span>
                <button
                  onClick={() => removeQuestion(q.id)}
                  className="text-red-500 text-sm hover:text-red-700 transition-all duration-300 cursor-pointer"
                >
                  Видалити
                </button>
              </div>

              <input
                className="w-full p-2 border rounded mb-2 outline-none"
                placeholder="Текст запитання"
                value={q.title}
                onChange={(e) =>
                  updateQuestion(q.id, { title: e.target.value })
                }
              />

              {(q.type === QuestionType.Radio ||
                q.type === QuestionType.Checkbox) && (
                <div className="flex pt-4 flex-col gap-4">
                  {q.options?.map((opt, optIdx) => (
                    <div
                      className="flex flex-row items-center gap-2 "
                      key={optIdx}
                    >
                      <input
                        type={
                          q.type === QuestionType.Radio ? "radio" : "checkbox"
                        }
                        disabled
                        className="w-4 h-4 accent-fuchsia-700"
                      />

                      <input
                        className="block w-full text-sm border-b outline-none focus:border-indigo-500 transition-colors"
                        value={opt}
                        placeholder={`Варіант ${optIdx + 1}`}
                        onChange={(e) => {
                          const newOpts = [...(q.options || [])];
                          newOpts[optIdx] = e.target.value;

                          updateQuestion(q.id, { options: newOpts });
                        }}
                      />

                      <button
                        onClick={() => removeOption(q.id, optIdx)}
                        className=" text-gray-400 hover:text-red-500 transition-all cursor-pointer text-xs"
                        title="Видалити варіант"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button
                    className="text-indigo-500 text-sm hover:text-indigo-800 transition-all cursor-pointer mt-2 w-fit font-medium"
                    onClick={() =>
                      updateQuestion(q.id, {
                        options: [...(q.options || []), ""],
                      })
                    }
                  >
                    + Додати варіант
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>

        <div className="flex flex-row justify-between mt-4">
          <div className="flex flex-row gap-4">
            {ButtonData.map((btn, idx) => (
              <ButtonType key={idx} onClick={() => addQuestion(btn.type)}>
                {btn.label}
              </ButtonType>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className=" bg-fuchsia-700 cursor-pointer  hover:bg-fuchsia-400 transition-all duration-300 hover:text-black text-white px-6 py-2 rounded-lg font-bold"
          >
            {isSaving ? "Збереження..." : "Зберегти форму"}
          </button>
        </div>
      </div>
      <div className="h-8" />
    </main>
  );
}
