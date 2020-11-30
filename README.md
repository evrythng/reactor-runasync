# reactor-runasync

Helper function to enable easy use of async/await in Reactor scripts, removing
the need to ensure `done()` is called in all good and bad code paths.


## Setup

Add to a Reactor script's dependency list, then use `require()`:

```js
const runAsync = require('reactor-runasync');
```


## Usage

Use `runAsync()` to run an `async` function which returns a Promise. The
function will automatically handle catching and logging any errors thrown,
and calling `done()` in all cases.

```js
/**
 * Read the action's Thng and update the tags to show it has been activated.
 */
const onActionCreatedAsync = async (event) => {
  const { id, thng: thngId } = event.action;
  if (!thngId) throw new Error('Action must be created on a Thng!');

  const thng = await app.thng(thngId).read();
  logger.info(`Action ${id} created on Thng ${thngId} (${thng.name})`);

  await app.thng(thngId).update({ tags: [...thng.tags, 'activated'] });
  logger.info(`Tags updated on Thng ${thngId}`);
};

// @filter(onActionCreated) action.type=_ItemProduced
const onActionCreated = event => runAsync(() => onActionCreatedAsync(event));
```
