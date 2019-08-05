/**
 * Run an async function and take care of calling done() and catching any errors.
 *
 * @param {function} f - The function to run.
 * @returns {Promise}
 */
const runAsync = f => f().catch(e => logger.error(e.message || e.errors[0])).then(done);

module.exports = runAsync;
