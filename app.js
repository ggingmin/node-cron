const { CronJob } = require('cron');
const db = require("./models");
const User = db.users;


const user = {
    username: "username",
    password: "12345",
};

new CronJob('*/5 * * * *', () => {
    (async () => {
        await db.sequelize.sync()
            .then(() => {
                console.log("Synced db.");
            })
            .catch((err) => {
                console.log("Failed to sync db: " + err.message);
            });
        await User.create(user);
    })();
}, null, true, 'Asia/Seoul');

