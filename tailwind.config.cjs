const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const textFillStroke = require('tailwindcss-text-fill-stroke')();

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [forms, typography, textFillStroke]
};

module.exports = config;
