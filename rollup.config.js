import commonjs from '@rollup/plugin-commonjs';

// https://www.rollupjs.com/
export default {
    input: 'production.js',
    output: {
        file: 'output/node/myweb-task-assist.js',
        format: 'cjs',
    },
    plugins: [commonjs()]
};
