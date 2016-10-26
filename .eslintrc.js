module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "parserOptions": {
      "ecmaVersion": 6,
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "semi": 0,
      "indent": ["error", 2],
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}]
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
