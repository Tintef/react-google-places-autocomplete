module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    ['transform-react-remove-prop-types', { mode: 'wrap' }],
  ],
  presets: [
    ['@babel/preset-env', { loose: true }],
    '@babel/preset-react',
  ],
};
