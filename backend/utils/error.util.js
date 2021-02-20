/* eslint-disable import/extensions */
import pkg from 'http-status';
import ResponseUtil from './response.util.js';

const { BAD_REQUEST } = pkg;

/**
 * Function to handle errors
 * @param  {object} schema validation schema
 * @param  {object} body body of the validation
 * @param  {object} res response
 * @param  {object} next continue to the next middleware when there is no error
 */
const handleErrorsUtil = (schema, body, res, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const errors = error.details.map((err) => err.message);
    ResponseUtil.setError(BAD_REQUEST, errors);
    return ResponseUtil.send(res);
  }
  next();
};

export default handleErrorsUtil;
