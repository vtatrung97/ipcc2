const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const mfConfig = withModuleFederationPlugin({
  remotes: {
    processX: 'http://localhost:4201/remoteEntry.js',
  },
  shared: share({
    '@angular/core': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/common/http': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/animations': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/forms': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    'rxjs': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
  }),
});

module.exports = {
  ...mfConfig,
  resolve: {
    ...mfConfig.resolve,
    fallback: {
      url: false
    }
  },
  output: {
    ...mfConfig.output,
    scriptType: 'text/javascript'
  },
  devServer: {
    port: 4200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*'
    }
  },
  watchOptions: {
    ignored: [
      '**/.angular/**',
      '**/node_modules/**',
      '**/.git/**'
    ]
  }
};
