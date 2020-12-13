const generateFromSwaggerJson = require('../../codegen')
  .generateFromSwaggerJson;
const utilities = require('../../utilities').Utilities;
const basicV2Schema = require('../../../__tests__/schemas/v2-basic.json');

describe('Test generateFromSwaggerJson', () => {
  it('should throw if version is not supported', () => {
    const opts = {
      type: 'javascript',
      class: 'Api',
      tags: '*',
    };

    jest.spyOn(utilities, 'getVersion').mockReturnValue(null);

    expect(() => {
      generateFromSwaggerJson(basicV2Schema, opts);
    }).toThrow();
  });
});
