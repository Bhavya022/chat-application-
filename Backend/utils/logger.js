const logInfo = (message) => {
  console.log(`[INFO]: ${message}`);
};

const logError = (message) => {
  console.error(`[ERROR]: ${message}`);
};

const logDebug = (message) => {
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[DEBUG]: ${message}`);
  }
};

const logWarning = (message) => {
  console.warn(`[WARNING]: ${message}`);
};

module.exports = { logInfo, logError, logDebug, logWarning };
