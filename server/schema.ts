export const typeDefs = `#graphql
  enum QuestionType {
    TEXT
    RADIO
    CHECKBOX
    DATE
  }

  type Question {
    id: ID!
    type: QuestionType!
    title: String!
    options: [String]
  }

  input QuestionInput {
    type: QuestionType!
    title: String!
    options: [String]
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
  }

  type Answer {
    questionId: ID!
    value: String!
  }

  input AnswerInput {
    questionId: ID!
    value: String!
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer!]!
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(title: String!, description: String, questions: [QuestionInput]): Form
    
    deleteForm(id: ID!): ID
    
    submitResponse(formId: ID!, answers: [AnswerInput]): Response
  }
`;
