// console.log(process.env.REACT_APP_URL_SERVER);
const config = {
  UrlServer: process.env.REACT_APP_URL_SERVER,
  UrlAsset: process.env.REACT_APP_URL_ASSET,
  DevMode: process.env.REACT_APP_DEV_MODE === "true",
  DevToken: process.env.REACT_APP_DEV_TOKEN,
  AppVersion: process.env.REACT_APP_VERSION,
};
export default config;
