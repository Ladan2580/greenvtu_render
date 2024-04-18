const nodemailer = require('nodemailer');
require('dotenv').config();
const axios= require("axios");
const dataHistory = require('../models/dataHistoryModel');
const airtimeHistory = require('../models/airtimeHistoryModel');
const walletHistory = require('../models/walletHistoryModel');
const billHistory = require('../models/billHistoryModel');
const cableHistory = require('../models/cableHistoryModel');
const smsHistory = require('../models/smsHistoryModel');
const bank = require('../models/bankModel');
const users = require('../models/users')
const exams = require('../models/resultCheckerHistoryModel')

class StoreHistory {
    async storeDataHistory(id, username, message, data_name, bundle, volume, phone, profit, amount, status, date) {
        const record = {
            id: id,
            username,
            message: message,
            data_name: data_name,
            bundle: bundle,
            volume: volume,
            phone: phone,
            profit: profit,
            amount: amount,
            status: status,
            date: date
        }

        try {
            const response = await dataHistory.create(record);
          //  console.log(response)

        } catch (err) {
            console.log(err.message)
        }

    }

    async storeAirtimeHistory(id, username, message, airtime_name, phone, amount, status, date) {

        const record = {
            id: id,
            username,
            message: message,
            airtime_name: airtime_name,
            phone: phone,
            amount: amount,
            status: status,
            date: date
        }

        try {
            const response = await airtimeHistory.create(record);
           // console.log(response)

        } catch (err) {
            console.log(err)
        }

    }

    async storeBanks(username, accountNumber, accountName, bankName) {

        const record = {
            username: username,
            accountNumber: accountNumber,
            accountName: accountName,
            bankName: bankName,

        }

        try {
            const response = await bank.create(record);
           // console.log(response)

        } catch (err) {
            console.log(err)
        }

    }
    async storeUsers(fullName, username,phone,email, pwd, reseller, wallet, pin, validator, webhook_url, date) {


        const record = {
            fullName, username, phone, email, pwd, reseller, wallet, pin, validator, webhook_url, date

        }

        try {
            const response = await users.create(record);
           // console.log(response)

        } catch (err) {
            console.log(err)
        }

    }
    async storeExam(id, username, message, exam_name, quantity, amount, code, status, date) {

        const record = {
            id, username, message, exam_name, quantity, amount, code, status, date
        }

        try {
            const response = await exams.create(record);
           // console.log(response)

        } catch (err) {
            console.log(err)
        }

    }

    async storeWalletHistory(id, username, message, amount, prev_bal, new_bal, status, date) {

        const record = {
            id: id,
            username,
            message: message,
            amount: amount,
            prev_bal: prev_bal,
            new_bal: new_bal,
            status: status,
            date: date
        }

        try {
            const response = await walletHistory.create(record);
           // console.log(response)

        } catch (err) {
            console.log(err)
        }

    }
    async storeCableHistory(id, username, message, cable_name, cable_plan, iuc, customer_name, amount, status, date) {

        const record = {
            id: id,
            username,
            message: message,
            cable_name: cable_name,
            cable_plan: cable_plan,
            iuc_number: iuc,
            customer_name: customer_name,
            amount: amount,
            status: status,
            date: date
        }

        try {
            const response = await cableHistory.create(record);
           // console.log(response)

        } catch (err) {
            console.log(err)
        }

    }
    async storeBillHistory(id, username, message, disco_name, meter_type, meter_number, customer_name, amount, purchase_code, status, date) {

        const record = {
            id: id,
            username:username,
            message: message,
            disco_name: disco_name,
            meter_type: meter_type,
            meter_number: meter_number,
            customer_name: customer_name,
            amount: amount,
            purchase_code: purchase_code,
            status: status,
            date: date
        }

        try {
            const response = await billHistory.create(record);
           // console.log(response)

        } catch (err) {
            console.log(err)
        }

    }
    async storeSmsHistory(id, username, message, sender_name, amount, total_number, correct_number, wrong_number, status, date) {

        const record = {
            id, username, message, sender_name, amount, total_number, correct_number, wrong_number, status, date
        }

        try {
            const response = await smsHistory.create(record);
           // console.log(response)

        } catch (err) {
            console.log(err)
        }

    }

    async sendEmail(to, subject, body) {

        const transporter = nodemailer.createTransport({
            host: `${process.env.MAIL_HOST}`,
            port: 465, // or the port provided by your email service provider
            secure: true, // true for 465, false for other ports
            auth: {
                user: `${process.env.NOTIFY_MAIL}`,
                pass: `${process.env.MAIL_PASS}`
            }
        });

        // Step 3: Compose your email
        const mailOptions = {
            from: `${process.env.NOTIFY_MAIL}`,
            to: to,
            subject: subject,
            text: body
        };

        // Step 4: Send the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error occurred:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }

    async getAccount(fname,lname,username,email,phone,bankName){
        
        const data = {
            "firstname": fname,
            "lastname": lname,
            "address": "Magajin Gari Road",
            "gender": "Male",
            "email": email,
            "phone": phone,
            "dob": "1993-08-03",
            "bvn": "",
            "provider": bankName
          }
          const headers = {
            Authorization: `Bearer ${process.env.PAYLONY_SK}`
          }
  
         axios.post('https://api.paylony.com/api/v1/create_account', data, { headers })
            .then(result=>{
                const data=result.data
                if(data.status){
                    const{account_name,account_number,provider}=data.data
                    this.storeBanks(username,account_number,account_name,provider)
                }
            
            }
            )
            .catch(error => console.error(error.message))  


    }



}
module.exports = StoreHistory

