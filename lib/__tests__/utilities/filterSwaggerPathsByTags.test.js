const filterSwaggerPathsByTags = require('../../utilities').Utilities
  .filterSwaggerPathsByTags;
const basicV2Schema = require('../../../__tests__/schemas/v2-basic.json');

describe('Test filterSwaggerPathsByTags utility', () => {
  it('should include all operations if no filter tags are provided', () => {
    const result = filterSwaggerPathsByTags(basicV2Schema, '*');
    expect(result).toEqual(basicV2Schema);
  });

  it('should include only operations with matched tags (single tag)', () => {
    const swagger = {
      paths: {
        '/todos': {
          get: {
            operationId: 'listTodos',
            tags: ['Todos'],
          },
        },
        '/items': {
          get: {
            operationId: 'listItems',
            tags: ['Items'],
          },
        },
      },
    };

    const result = filterSwaggerPathsByTags(swagger, 'Items');
    expect(Object.keys(result.paths)).toEqual(['/items']);
  });

  it('should include only operations with matched tags (multiple tags separated with comma)', () => {
    const swagger = {
      paths: {
        '/todos': {
          get: {
            operationId: 'listTodos',
            tags: ['Todos'],
          },
        },
        '/items': {
          get: {
            operationId: 'listItems',
            tags: ['Items'],
          },
        },
        '/users': {
          get: {
            operationId: 'listUsers',
            tags: ['Users'],
          },
        },
      },
    };

    const result = filterSwaggerPathsByTags(swagger, 'Todos,Users');
    expect(Object.keys(result.paths).sort()).toEqual(
      ['/todos', '/users'].sort(),
    );
  });

  it('should add "default" tag if operation tags are missing', () => {
    const swagger = {
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
          },
        },
      },
    };

    const result = filterSwaggerPathsByTags(swagger, 'default');
    expect(Object.keys(result.paths)).toEqual(['/items']);
  });

  it('should include operations with missing operationId', () => {
    const swagger = {
      paths: {
        '/items': {
          get: {
            tags: ['Items'],
          },
        },
      },
    };

    const result = filterSwaggerPathsByTags(swagger, 'default');
    expect(Object.keys(result.paths)).toEqual(['/items']);
  });
});
