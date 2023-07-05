In order to test the application, it is adviced to make the following changes.

In `App.js`, line 18:
- comment out the `config.lastWorkspace` part (should become: `/*config.lastWorkspace*/`)
- uncomment the `/*process.cwd() + "\\testing\\ws.asum"*/` part (should become: `process.cwd() + "\\testing\\ws.asum"`)

In `electron.js`, line 24:
- comment out the `mainWindow.removeMenu();` part (should become: `//mainWindow.removeMenu();`)
