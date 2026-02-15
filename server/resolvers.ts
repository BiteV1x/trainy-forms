import { forms, responses } from "./db";
import { v4 as uuidv4 } from "uuid";

export const resolvers = {
  Query: {
    forms: () => forms,
    form: (_: any, { id }: { id: string }) => forms.find((f) => f.id === id),

    responses: (_: any, { formId }: { formId: string }) =>
      responses.filter((r) => r.formId === formId),
  },
  Mutation: {
    createForm: (_: any, { title, description, questions }: any) => {
      const newForm = {
        id: uuidv4(),
        title,
        description,
        questions: questions.map((q: any) => ({
          ...q,
          id: uuidv4(),
        })),
      };
      forms.push(newForm);
      return newForm;
    },
    deleteForm: (_: any, { id }: { id: string }) => {
      const index = forms.findIndex((f) => f.id === id);
      if (index !== -1) {
        forms.splice(index, 1);
        const initialLength = responses.length;
        for (let i = responses.length - 1; i >= 0; i--) {
          if (responses[i].formId === id) responses.splice(i, 1);
        }
        return id;
      }
      return null;
    },
    submitResponse: (_: any, { formId, answers }: any) => {
      const newResponse = {
        id: uuidv4(),
        formId,
        answers,
      };
      responses.push(newResponse);
      return newResponse;
    },
  },
};
