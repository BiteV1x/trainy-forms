import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/",
  documents: "app/**/*.graphql",
  generates: {
    "app/store/api/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-rtk-query"],
      config: {
        importBaseApiFrom: "@/store/api/baseApi",
        exportHooks: true,
      },
    },
  },
};

export default config;
