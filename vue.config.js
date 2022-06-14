const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js" // 'vue/dist/vue.common.js' for webpack 1
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: "ru",
      fallbackLocale: "ru",
      localeDir: "src",
      enableInSFC: true
    },
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: "BDM shop",
        productName: "BDM shop",
        win: {
          target: ["nsis"],
          icon: "build/icon.ico",
        },
        nsis: {
          oneClick: false,
          installerIcon: "build/icon.ico",
          uninstallerIcon: "build/unicon.ico",
          uninstallDisplayName: "BDM shop Unistaller",
          license: "license.md",
          allowToChangeInstallationDirectory: true,
        },
      },
    },
  },
  devServer: {
    host: "localhost",
    port: 8080
  },
  chainWebpack: config => {
    config.module.rules.delete("eslint");
  }
};
