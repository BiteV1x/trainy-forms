Quick Start

This project uses npm workspaces to manage both the client and server from the root directory. After cloning the repository, run `npm install` to set up dependencies for the entire monorepo. 

You must then execute `npm run codegen` to generate the necessary TypeScript types and hooks from the GraphQL schema. 

Once the generation is complete, start the fullstack environment by running `npm run dev`, which concurrently launches the server on port 4000 and the client on port 3000.
