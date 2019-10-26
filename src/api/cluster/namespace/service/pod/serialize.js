const Complete = {
  serialize: ({ id, name, labels, status }) => ({
    id,
    name,
    labels,
    status
  }),
  deserialize: obj => obj
};

const List = {
  serialize: ({ id, name, labels, status }) =>
    JSON.stringify({
      id,
      name,
      labels,
      status
    }),
  deserialize: ostr => {
    return JSON.parse(ostr);
  }
};

export { Complete, List };
