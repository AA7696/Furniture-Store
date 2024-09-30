module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel", 'react-native-reanimated/plugin',],

  };
};
// 3.10.1