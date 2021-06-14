'use strict';

module.exports = {
	extends: 'airbnb-base',
	env: {
		node: true,
		es6: true
	},
	globals: {
		__rootpath: true,
		coreRequire: true,
		mainRequire: true
	},
	parserOptions: {
		sourceType: 'script'
	},
	rules: {
		strict: 0,
		'operator-linebreak': 0,
		'prefer-spread': 0,
		'prefer-rest-params': 0,
		'class-methods-use-this': 0,
		'consistent-return': 0,
		'prefer-template': 0,
		'func-names': 0,
		'function-paren-newline': 0,
		'import/no-unresolved': 0,
		'import/no-extraneous-dependencies': ['error'],
		'no-new': 0,
		'no-tabs': 0,
		'no-bitwise': 0,
		'no-console': 0,
		'no-continue': 0,
		'no-plusplus': 0,
		'no-await-in-loop': 0,
		'no-param-reassign': 0,
		'no-prototype-builtins': 0,
		'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
		'nonblock-statement-body-position': ['error', 'below', { overrides: { else: 'any' } }],
		curly: ['error', 'multi-or-nest'],
		'arrow-parens': ['error', 'as-needed'],
		'comma-dangle': ['error', 'never'],
		'padded-blocks': 0,
		'arrow-body-style': 0,
		'no-underscore-dangle': 0,
		'space-before-function-paren': ['error', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always'
		}],
		indent: ['error', 'tab', {
			SwitchCase: 1
		}],
		'max-len': ['error', {
			code: 200,
			tabWidth: 1,
			comments: 200
		}],
		'spaced-comment': ['error', 'always', {
			exceptions: ['*']
		}],
		'newline-per-chained-call': ['error', {
			ignoreChainWithDepth: 2
		}],
		'keyword-spacing': ['error', {
			overrides: {
				if: { after: false },
				for: { after: false },
				while: { after: false },
				switch: { after: false },
				catch: { after: false }
			}
		}],
		'object-curly-newline': ['error', {
			ObjectExpression: { minProperties: 5, multiline: true, consistent: true },
			ObjectPattern: { minProperties: 5, multiline: true, consistent: true }
		}]
	}
};
