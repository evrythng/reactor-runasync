const runAsync = require('../');

/**
 * Read the action's Thng and update the tags to show it has been activated.
 */
const onActionCreatedAsync = async (event) => {
  const { id, thng: thngId } = event.action;
  if (!thngId) {
    throw new Error('Action must be created on a Thng!');
  }

  const thng = await app.thng(thngId).read();
  logger.info(`Action ${id} created on Thng ${thngId} (${thng.name})`);

  await app.thng(thngId).update({ tags: ['activated'] });
  logger.info(`Tags updated on Thng ${thngId}`);
};

// @filter(onActionCreated) action.type=_ItemProduced
const onActionCreated = event => runAsync(() => onActionCreatedAsync(event));

module.exports = { onActionCreated };
