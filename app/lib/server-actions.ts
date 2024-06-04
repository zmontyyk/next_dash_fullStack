import Revenue from '../models/Revenue';
import { sql } from '@vercel/postgres';
import {
    CustomerField,
    CustomersTableType,
    InvoiceForm,
    InvoicesTable,
    LatestInvoiceRaw,
    User,
} from './definitions';
import { mailHandler } from './utils';
import getMongoClient from './dbClient';
import Users from '../models/Users';
import { unstable_noStore as noStore } from 'next/cache';
import Otp from '../models/Otp';

function delay(time: number) {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

export async function fetchRevenue() {
    delay(5000);
    noStore();
    try {
        await getMongoClient();
        const data = await Revenue.find({});
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchLatestInvoices() {
    noStore();
    try {
        await getMongoClient();
        const data = await Users.find({});
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}

export async function resetPassword(email?: string, password?: number) {
    noStore();
    type responseType = {
        status: number;
        error: string | null;
        success: string | null;
    };

    const responseData: responseType = {
        status: 500,
        success: null,
        error: null,
    };
    try {
        await getMongoClient();
        if (!email) {
            return {
                status: 400,
                success: 'No user found!',
            };
        }
        const otp = (1000 + Math.random() * 9000).toFixed(0);
        const user = await Users.findOne({ email: email });

        if (user) {
            (responseData.success = 'OTP Send To Your email'),
            (responseData.status = 201);
            
        // sendind otp vaild for 5 mint
          const isSend = await mailHandler(email,otp)
          if (isSend.accepted) {
            const newOTp: any = new Otp({email:email,otp:otp});
            await newOTp.save();
          }

        }
        if (!user) {
            (responseData.error = 'No user found!'),
                (responseData.status = 500);
        }

        return responseData;
    } catch (error) {
        console.log(error);

        return error;
    }
}
