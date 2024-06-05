module.exports = {
    apps: [
        {
            name: 'katiehawkes',
            script: 'npm',
            args: 'start',
            cwd: '/var/www/katiehawkes.com/public_html/katiehawkes',
            env: {
                PORT: 3001,
                NODE_ENV: 'production'
            }
        }
    ]
};