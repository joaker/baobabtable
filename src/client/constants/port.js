const defaultPort = 3001;
const envPort = process && process.env && process.env.PORT;
const port = envPort || defaultPort;

module.exports = port;
