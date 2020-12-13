const filterSwaggerPathsByTags = require('../../utilities').Utilities
  .filterSwaggerPathsByTags;
const basicV2Schema = require('../../../__tests__/schemas/v2-basic.json');
const perf = require('execution-time')(console.log);

perf.start();

for (let index = 0; index < 10000; index++) {
  const a = filterSwaggerPathsByTags(basicV2Schema, 'Upload');
}

perf.stop();
