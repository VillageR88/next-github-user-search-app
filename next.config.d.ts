declare module 'next/config' {
  type ConfigTypes = () => {
    publicRuntimeConfig: {
      staticFolder: string;
    };
    // serverRuntimeConfig: {};
  };

  declare const getConfig: ConfigTypes;

  export default getConfig;
}
