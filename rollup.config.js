import babel from 'rollup-plugin-babel';
import minify from "rollup-plugin-babel-minify";
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
	input: './index.js',
	output: {
		file: './dist/cart-localstorage.min.js',
		name: 'cartLS',
		format: 'iife',
		compact: true,
		sourcemap: true,
	},
	plugins: [
		babel({
			runtimeHelpers: true,
			externalHelpers: true,
		}),
		resolve(),
		commonjs(),
		minify({
			comments: false
		})
	]
}