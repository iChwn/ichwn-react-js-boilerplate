const { when } = require("@craco/craco");

const dotenvCra = require("dotenv-cra");

dotenvCra.config();

module.exports = {
  babel: {
    plugins: [
      ...when(
        process.env.REACT_APP_ENV !== "develop",
        () => ["transform-remove-console"],
        []
      ),
    ],
  },
};