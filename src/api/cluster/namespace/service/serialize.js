const Complete = {
  serialize: ({ id, name, type, selector }) => ({
    id,
    name,
    type,
    selector
  }),
  deserialize: obj => obj
};

const List = {
  serialize: ({ id, name, type, selector }) =>
    JSON.stringify({
      id,
      name,
      type,
      selector
    }),
  deserialize: ostr => {
    return JSON.parse(ostr);
  }
};

export { Complete, List };
