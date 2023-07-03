In order to test the application, it is adviced to make the following changes
to `line 18` of the `index.js`-file:

- comment out the `config.lastWorkspace` part (should become: `/*config.lastWorkspace*/`)
- uncomment the `/*process.cwd() + "\\testing\\ws.asum"*/` part (should become: `process.cwd() + "\\testing\\ws.asum"`)
