import * as ContentModel from "Model/content";

const schema = [
  `
  type ContentQueries {
    get (id: ID!): Content
  }

`
];

const resolvers = {
  ContentQueries: {
    get: async (viewer, { id }, cxt) => {
      const content = await ContentModel.get(id, cxt);
      return { id, content };
    }
  }
};

export { schema, resolvers };
