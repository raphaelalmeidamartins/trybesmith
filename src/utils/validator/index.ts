import Joi from 'joi';

export default function validator(schema: Joi.Schema) {
  return (data: object) => {
    const { error, value } = schema.validate(data);
    if (error) {
      error.message = error.details[0].message.replace(/[[\]0-9]{3}/, '');
      throw error;
    }
    return value;
  };
}
