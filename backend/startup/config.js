const config = require("config");

module.exports = function() {
  /**set all jwtPrivateKey, ClientID, ClientSecret in terminal. Follow example below for all three keys
   * export jwtPrivateKey="optionalPrivateKeyString" */
  const jwtPrivateKey = config.get("jwtPrivateKey");
  const ClientID = config.get("ClientID");
  const ClientSecret = config.get("ClientSecret");
  try {
    if (!jwtPrivateKey || !ClientID || !ClientSecret) {
      throw new Error(
        "FATAL ERROR: jwtPrivateKey or ClientID or ClientSecret is not defined"
      );
    }
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }
};
