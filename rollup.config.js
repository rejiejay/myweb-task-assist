import commonjs from '@rollup/plugin-commonjs';

// https://www.rollupjs.com/
export default {
    input: 'production.js',
    output: {
        file: 'output/node/task-assist-system-v6.js',
        format: 'cjs',
    },
    plugins: [commonjs()]
};