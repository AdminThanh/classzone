import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.REACT_APP_BACKEND_API,
  documents: 'src/graphql/**/*.tsx',
  generates: {
    'src/gql': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
