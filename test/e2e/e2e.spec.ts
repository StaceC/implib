import * as electronPath from 'electron';
import * as path from 'path';

const { Application } = require('spectron');

const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
  let app: any;
  beforeAll(async () => {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', '..', 'app')],
    });
    return app.start();
  });

  afterAll(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('should open window', async () => {
    const { client, browserWindow } = app;
    expect(client).toBeDefined();
    await client.waitUntilWindowLoaded();
    await delay(100);
    const title = await browserWindow.getTitle();
    expect(title).toBe('Sharknado Prototype');
  });

  it('should not have any logs in console of main window', async () => {
    const { client } = app;
    const logs = await client.getRenderProcessLogs();
    // Print renderer process logs
    logs.forEach((log: any) => {
      console.log(log.message);
      console.log(log.source);
      console.log(log.level);
    });
    expect(logs).toHaveLength(0);
  });

  it('should navigate to Prototype by "Prototype" link', async () => {

    const { client } = app;
    await client.click('[data-tid="prototype_link"] > a');
    await delay(100);

    expect(await client.isExisting('[data-tid="upload_tracks"]')).toBe(true);
    expect(await client.isExisting('[data-tid="staged_tracks"]')).toBe(true);
    expect(await client.isExisting('[data-tid="library_tracks"]')).toBe(true);

  });

});
