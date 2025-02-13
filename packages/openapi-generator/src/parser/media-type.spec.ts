import { createTestRefs, emptyObjectSchema } from '../../test/test-util';
import { parseApplicationJsonMediaType, parseMediaType } from './media-type';

describe('parseApplicationJsonMediaType', () => {
  it('returns undefined if there is no application/json media type', async () => {
    expect(
      parseApplicationJsonMediaType(
        {
          content: { 'application/xml': { schema: { type: 'string' } } }
        },
        await createTestRefs()
      )
    ).toBeUndefined();
  });

  it('returns parsed media type for application/json', async () => {
    expect(
      parseApplicationJsonMediaType(
        {
          content: { 'application/json': { schema: { type: 'object' } } }
        },
        await createTestRefs()
      )
    ).toEqual(emptyObjectSchema);
  });
});

describe('parseMediaType', () => {
  it('returns undefined if there is no media type at all', async () => {
    expect(parseMediaType(undefined, await createTestRefs())).toBeUndefined();
  });

  it('returns any schema if there are other schemas', async () => {
    expect(
      parseMediaType(
        {
          content: { 'application/xml': { schema: { type: 'string' } } }
        },
        await createTestRefs()
      )
    ).toEqual({ type: 'any' });
  });

  it('returns parsed media type if there is only application/json', async () => {
    expect(
      parseMediaType(
        {
          content: { 'application/json': { schema: { type: 'object' } } }
        },
        await createTestRefs()
      )
    ).toEqual(emptyObjectSchema);
  });

  it('returns anyOf schema if there are other schemas and application/json', async () => {
    expect(
      parseMediaType(
        {
          content: {
            'application/json': { schema: { type: 'object' } },
            'application/xml': { schema: { type: 'string' } }
          }
        },
        await createTestRefs()
      )
    ).toEqual({ anyOf: [emptyObjectSchema, { type: 'any' }] });
  });
});
