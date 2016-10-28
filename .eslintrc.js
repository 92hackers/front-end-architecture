module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "parserOptions": {
      "ecmaVersion": 6,
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "parser": "babel-eslint",
    "rules": {
      "semi": 0,
      "indent": ["error", 2],
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}],
      "react/no-unused-prop-types": [0],
      "react/prop-types": [0],
      "class-methods-use-this": [0],
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "jsx-a11y/href-no-hash": [0],
      "react/no-string-refs": 0,
      "no-class-assign": 0,
    },
    "env": {
      "browser": true
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ]
};
