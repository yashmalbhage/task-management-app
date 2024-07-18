module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class', // This enables dark mode
    theme: {
        extend: {
            colors: {
                dark: {
                    100: '#1E293B',
                    200: '#334155',
                    300: '#475569',
                }
            }
        },
    },
    plugins: [],
}