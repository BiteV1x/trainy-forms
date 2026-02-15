import { api } from '@/store/api/baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Answer = {
  __typename?: 'Answer';
  questionId: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type AnswerInput = {
  questionId: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};

export type Form = {
  __typename?: 'Form';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  questions: Array<Question>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm?: Maybe<Form>;
  deleteForm?: Maybe<Scalars['ID']['output']>;
  submitResponse?: Maybe<Response>;
};


export type MutationCreateFormArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<InputMaybe<QuestionInput>>>;
  title: Scalars['String']['input'];
};


export type MutationDeleteFormArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSubmitResponseArgs = {
  answers?: InputMaybe<Array<InputMaybe<AnswerInput>>>;
  formId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  form?: Maybe<Form>;
  forms: Array<Form>;
  responses: Array<Response>;
};


export type QueryFormArgs = {
  id: Scalars['ID']['input'];
};


export type QueryResponsesArgs = {
  formId: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID']['output'];
  options?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  type: QuestionType;
};

export type QuestionInput = {
  options?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
  type: QuestionType;
};

export enum QuestionType {
  Checkbox = 'CHECKBOX',
  Date = 'DATE',
  Radio = 'RADIO',
  Text = 'TEXT'
}

export type Response = {
  __typename?: 'Response';
  answers: Array<Answer>;
  formId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
};

export type GetFormsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormsQuery = { __typename?: 'Query', forms: Array<{ __typename?: 'Form', id: string, title: string, description?: string | null, questions: Array<{ __typename?: 'Question', id: string, title: string, type: QuestionType }> }> };

export type CreateFormMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<InputMaybe<QuestionInput>> | InputMaybe<QuestionInput>>;
}>;


export type CreateFormMutation = { __typename?: 'Mutation', createForm?: { __typename?: 'Form', id: string, title: string } | null };

export type GetFormQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFormQuery = { __typename?: 'Query', form?: { __typename?: 'Form', id: string, title: string, description?: string | null, questions: Array<{ __typename?: 'Question', id: string, type: QuestionType, title: string, options?: Array<string | null> | null }> } | null };

export type SubmitResponseMutationVariables = Exact<{
  formId: Scalars['ID']['input'];
  answers?: InputMaybe<Array<InputMaybe<AnswerInput>> | InputMaybe<AnswerInput>>;
}>;


export type SubmitResponseMutation = { __typename?: 'Mutation', submitResponse?: { __typename?: 'Response', id: string } | null };

export type GetResponsesQueryVariables = Exact<{
  formId: Scalars['ID']['input'];
}>;


export type GetResponsesQuery = { __typename?: 'Query', responses: Array<{ __typename?: 'Response', id: string, answers: Array<{ __typename?: 'Answer', questionId: string, value: string }> }> };

export type DeleteFormMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteFormMutation = { __typename?: 'Mutation', deleteForm?: string | null };


export const GetFormsDocument = `
    query GetForms {
  forms {
    id
    title
    description
    questions {
      id
      title
      type
    }
  }
}
    `;
export const CreateFormDocument = `
    mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput]) {
  createForm(title: $title, description: $description, questions: $questions) {
    id
    title
  }
}
    `;
export const GetFormDocument = `
    query GetForm($id: ID!) {
  form(id: $id) {
    id
    title
    description
    questions {
      id
      type
      title
      options
    }
  }
}
    `;
export const SubmitResponseDocument = `
    mutation SubmitResponse($formId: ID!, $answers: [AnswerInput]) {
  submitResponse(formId: $formId, answers: $answers) {
    id
  }
}
    `;
export const GetResponsesDocument = `
    query GetResponses($formId: ID!) {
  responses(formId: $formId) {
    id
    answers {
      questionId
      value
    }
  }
}
    `;
export const DeleteFormDocument = `
    mutation DeleteForm($id: ID!) {
  deleteForm(id: $id)
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetForms: build.query<GetFormsQuery, GetFormsQueryVariables | void>({
      query: (variables) => ({ document: GetFormsDocument, variables })
    }),
    CreateForm: build.mutation<CreateFormMutation, CreateFormMutationVariables>({
      query: (variables) => ({ document: CreateFormDocument, variables })
    }),
    GetForm: build.query<GetFormQuery, GetFormQueryVariables>({
      query: (variables) => ({ document: GetFormDocument, variables })
    }),
    SubmitResponse: build.mutation<SubmitResponseMutation, SubmitResponseMutationVariables>({
      query: (variables) => ({ document: SubmitResponseDocument, variables })
    }),
    GetResponses: build.query<GetResponsesQuery, GetResponsesQueryVariables>({
      query: (variables) => ({ document: GetResponsesDocument, variables })
    }),
    DeleteForm: build.mutation<DeleteFormMutation, DeleteFormMutationVariables>({
      query: (variables) => ({ document: DeleteFormDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetFormsQuery, useLazyGetFormsQuery, useCreateFormMutation, useGetFormQuery, useLazyGetFormQuery, useSubmitResponseMutation, useGetResponsesQuery, useLazyGetResponsesQuery, useDeleteFormMutation } = injectedRtkApi;

