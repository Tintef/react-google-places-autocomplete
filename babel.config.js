module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['transform-react-remove-prop-types', { mode: 'wrap' }],
  ],
  presets: [
    ['@babel/preset-env', { loose: true }],
    '@babel/preset-react',
  ],
};
