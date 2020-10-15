
const Users = require("../models/users");
const Subscriptions = require("../models/subscriptions");
const uuidv4 = require("uuid/v4");

exports.seed = () => {
    const seeds = [
        seed_admins(),
        seed_subscriptions()
    ];

    Promise.all(seeds).catch((data)=>{
        console.log("error seeding", data);
    })
}

const seed_admins = () => {
    return new Promise((resolve,reject)=>{
        const randomKey = uuidv4();
        Users.find({email:"admin@asatera.com"}).exec().then((_users) => {
            if(_users.length === 0){
                const newUser = new Users({
                    name: "Mr Pinky Perez",
                    password: "Test.123",
                    email: "admin@asatera.com",
                    isAdmin: true,
                    apiKey: randomKey.replace(/-/g, ""),
                });
                newUser.save((err, _user) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(_user);
                    }
                });
            }
        });
    });
}

const seed_subscriptions = () => {
    const subscriptions = [
        {
            name : "free",
            requests_per_day : 250
        },
        {
            name : "developer",
            requests_per_day : 500
        },
        {
            name : "enterprise",
            requests_per_day : 1000
        },
    ]
    return new Promise((resolve, reject)=>{
        Promise.all(
            [
                seed_subscription(subscriptions[0]),
                seed_subscription(subscriptions[1]),
                seed_subscription(subscriptions[2]),
            ]).then((data) => {
                if(data.length === 3){
                    resolve(data);
                } else {
                    reject();
                }
            })
    })
}

const seed_subscription = (subscription)=>{
    return new Promise((resolve, reject) => {
        Subscriptions.find(subscription).exec().then((_subs)=>{
            if(_subs.length === 0){
                const _sub = new Subscriptions(subscription);
                return _sub.save((err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            }
        })
    })
}