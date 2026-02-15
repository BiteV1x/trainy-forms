import {
  setTitle,
  setDescription,
  addQuestion,
  removeQuestion,
  updateQuestion,
  resetForm,
  removeOption,
} from "@/store/api/formEditorSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { QuestionType, useCreateFormMutation } from "../store/api/generated";
import { useRouter } from "next/navigation";

export const useFormBuilder = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formState = useAppSelector((state) => state.formEditor);
  const [createForm, { isLoading }] = useCreateFormMutation();

  const handleSave = async () => {
    if (!formState.title) {
      alert("Будь ласка, вкажіть назву форми");
      return;
    }

    try {
      await createForm({
        title: formState.title,
        description: formState.description,
        questions: formState.questions.map((q) => ({
          type: q.type,
          title: q.title,
          options: q.options,
        })),
      }).unwrap();

      dispatch(resetForm());
      router.push("/");
    } catch (e) {
      console.error("Failed to save form:", e);
      alert("Помилка при збереженні");
    }
  };

  return {
    ...formState,
    setTitle: (val: string) => dispatch(setTitle(val)),
    setDescription: (val: string) => dispatch(setDescription(val)),
    addQuestion: (type: QuestionType) => dispatch(addQuestion(type)),
    removeQuestion: (id: string) => dispatch(removeQuestion(id)),
    removeOption: (id: string, index: number) =>
      dispatch(removeOption({ id, index })),
    updateQuestion: (
      id: string,
      data: { title?: string; options?: string[] },
    ) => dispatch(updateQuestion({ id, ...data })),
    handleSave,
    isSaving: isLoading,
  };
};
