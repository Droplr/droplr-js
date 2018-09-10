const chai = require('chai');

const { expect } = chai;
const Droplr = require('../../index');
const Logger = require('./Logger');
const fs = require('fs');

describe('Drops', () => {
  let client;

  beforeEach(() => {
    const logger = new Logger();

    client = new Droplr.Client({
      auth: new Droplr.BasicAuth(process.env.USERNAME, process.env.PASSWORD),
      onResponse: logger.onResponse,
      onError: logger.onError,
    });
  });

  it('should go over full flow', async () => {
    const dropData = {
      type: 'LINK',
      content: 'https://droplr.com/',
    };

    const dropNote = await client.drops.create(dropData);
    expect(dropNote).to.have.property('code');

    const drops = await client.drops.list();
    expect(drops.results).to.have.lengthOf.above(1);

    const dropNoteGet = await client.drops.get(dropNote.code);
    expect(dropNoteGet).to.have.property('code');

    const dropNoteUpdated = await client.drops.update(dropNote.code, {
      tags: ['tag1', 'tag2'],
    });
    expect(dropNoteUpdated).to.have.property('code');

    await client.drops.delete(dropNote.code);

    try {
      await client.drops.get(dropNote.code);
      throw new Error('It should fail');
    } catch (error) {
      expect(error).includes({
        code: 'ReadDrop.NoSuchDrop',
        statusCode: 404,
      });
    }
  });

  describe('get', () => {
    it('should return not found error', async () => {
      try {
        await client.drops.get('this-drop-does-not-exist');
        throw new Error('It should fail');
      } catch (error) {
        expect(error).includes({
          code: 'ReadDrop.NoSuchDrop',
          statusCode: 404,
        });
      }
    });
  });

  describe('create', () => {
    it('should create file drop', async () => {
      const dropData = {
        type: 'FILE',
        variant: 'image/png',
        title: 'logo.png',
        content: fs.createReadStream(`${__dirname}/../fixtures/logo.png`),
      };

      const drop = await client.drops.create(dropData);

      expect(drop).includes({
        type: 'IMAGE',
        variant: dropData.variant,
        title: dropData.title,
      });
    });

    it('should create note drop', async () => {
      const dropData = {
        type: 'NOTE',
        variant: 'text/plain',
        content: 'Some cool note',
      };

      const drop = await client.drops.create(dropData);

      expect(drop).includes({
        type: dropData.type,
        variant: 'plain',
        content: dropData.content,
      });
    });

    it('should create link drop', async () => {
      const dropData = {
        type: 'LINK',
        content: 'https://droplr.com/',
      };

      const drop = await client.drops.create(dropData);

      expect(drop).includes({
        type: dropData.type,
        content: dropData.content,
      });
    });
  });
});
