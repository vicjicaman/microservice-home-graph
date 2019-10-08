
const schema = [
  `
  type PodsQueries {
    list: [Service]
  }

`
];

const resolvers = {
  PodsQueries: {
    list: async (service, args, cxt) => {
      return [];
    }
  }
};

export { schema, resolvers };
