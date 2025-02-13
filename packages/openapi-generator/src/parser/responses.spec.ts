import { createTestRefs } from '../../test/test-util';
import { parseResponses } from './responses';

describe('parseResponses', () => {
  it('parses response schema without content', async () => {
    expect(
      parseResponses(
        { 200: { description: 'A response' } },
        await createTestRefs()
      )
    ).toEqual({
      type: 'any'
    });
  });

  it('parses response schema from content', async () => {
    expect(
      parseResponses(
        {
          200: {
            description: 'A response',
            content: {
              'application/json': { schema: { type: 'string' } }
            }
          }
        },
        await createTestRefs()
      )
    ).toEqual({
      type: 'string'
    });
  });

  it('parses response schema from multiple success codes', async () => {
    const schemaNaming = {
      schemaName: 'RefType',
      fileName: 'ref-type'
    };
    expect(
      parseResponses(
        {
          200: {
            description: 'A response',
            content: {
              'application/json': { schema: { type: 'string' } }
            }
          },
          201: {
            description: 'Another response',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RefType' }
              }
            }
          }
        },
        await createTestRefs({
          schemas: {
            RefType: { type: 'string' }
          }
        })
      )
    ).toEqual({
      anyOf: [
        { type: 'string' },
        { $ref: '#/components/schemas/RefType', ...schemaNaming }
      ]
    });
  });
});
