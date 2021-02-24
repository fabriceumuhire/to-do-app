/* eslint-disable import/extensions */
import List from '../../models/list.model.js';

const cleanAllTables = async () => {
  await List.deleteMany({});
};

export default cleanAllTables;
