const nodemailer = require('nodemailer');
const sequelize = require('../utils/database');
const User = require('../Models/user');


exports.getUser = async (req, res) => {
    res.render('index');
};

exports.postUser = async (req, res) => {
    try {
        const email = req.body.email || req.query.email;
        console.log(req.body.email);

        const user = await User.findOne({ where: { email: email } });


        // verification
        var verify = Math.floor((Math.random() * 10000000) + 1);

        // email connection
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tjeet769@gmail.com',
                pass: 'Taran@123'
            }
        });

        const mailOption = {
            from: 'tjeet769@gmail.com', // sender this is your email here
            to: email, // receiver email2
            subject: "Account Verification",
            html: `Your Otp Code for activate your account is : ${verify}`
        }

        transporter.sendMail(mailOption, async (err, info) => {
            if (err) {
                throw new Error(err.message);
            }
            else if (!user) {
                await User.create({ email: email, verification: verify });
                return res.redirect(`/verification/?email=${email}`)
            }
            await User.update({ verification: verify }, { where: { email: email } });
            return res.redirect(`/verification/?email=${email}`)
        })
        return sequelize.query(`
        CREATE EVENT expiryotp
        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL  1 MINUTE  
        DO
        DELETE FROM verifies WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 MINUTE);
        `).then(() => { console.log('expireToken event created') });
    }
    catch (error) {
        res.end(error.message);
    }
}

exports.getVerify = (req, res) => {
    const email = req.query.email;
    console.log(email);
    res.render('dashboard', {
        email: email
    });
}

exports.postVerify = async (req, res) => {
    try {
        const { verify } = req.body;
        const email = req.query.email;
        const user = await User.findOne({ where: { email: email } });
        const time = customer.dataValues.createdAt;
        let date = new Date(time);
        const expiryTime = 60*1000;
        
        if (verify == user.verification) {
            res.end("<h1>OTP successfully verified</h1>")
        }
        else if(Date.now()-date.getTime()>=expiryTime){
            throw new Error("OTP expired");
        }
        else {
            res.end("<h1>Invalid OTP please TRY again</h1>")
        }
    }
    catch (error) {
        res.end(error.message);
    }
}