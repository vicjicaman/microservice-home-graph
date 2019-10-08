const Complete = {
  serialize: ({ id, name, type }) => ({
    id,
    name,
    type
  }),
  deserialize: obj => obj
};

const List = {
  serialize: ({ name, type }) =>
    JSON.stringify({
      name,
      type
    }),
  deserialize: ostr => {
    return JSON.parse(ostr);
  }
};

export { Complete, List };
