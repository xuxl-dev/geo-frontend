import { dict } from '@fast-crud/fast-crud';

export const replaceDictValues = (inputObject: any): any => {
  const columns = inputObject;

  Object.keys(columns).forEach((key) => {
    const column = columns[key];
    if (column.dict) {
      column.dict = dict(column.dict);
    }
  });

  return inputObject;
};
