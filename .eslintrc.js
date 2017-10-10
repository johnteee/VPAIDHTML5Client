module.exports ={
    "env": {
        "browser": true,
        "es6": false
    },
    "globals": {
        "BAP": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-constant-condition": [
            "error",
            {
                "checkLoops": false
            }
        ],
        "no-console": [
            "error",
            {
                "allow": [
                    "log",
                    "warn",
                    "error"
                ]
            }
        ],
        "no-empty": [
            "error",
            {
                "allowEmptyCatch": true
            }
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "always"
        ],
        "eqeqeq": [
            "error",
            "always"
        ]
    }
};