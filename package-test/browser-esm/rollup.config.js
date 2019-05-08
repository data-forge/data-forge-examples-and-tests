import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import sizes from 'rollup-plugin-sizes';

export default {
    input: 'src.js',
    output: {
        file: 'bundle.js',
        format: 'esm',
        banner: 'window.arguments = [];',  // FIXME: workaround https://github.com/flexdinesh/typy/issues/21
    },
    plugins: [
        resolve(),
        commonjs(),
        serve({open: true, contentBase: ''}),
        livereload(),
        sizes({details: true}),
    ],
}
