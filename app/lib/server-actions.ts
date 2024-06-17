import Revenue from "../models/Revenue";
import { mailHandler } from "./utils";
import getMongoClient from "./dbClient";
import Users from "../models/Users";
import { unstable_noStore as noStore } from "next/cache";
import Otp from "../models/Otp";
import Post from "../models/Post";
import moment from "moment";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import apiClient from "@/utils/apiClient";

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
        console.error("Database Error:", error);
        throw new Error("Failed to fetch revenue data.");
    }
}

export async function fetchLatestInvoices() {
    noStore();
    try {
        await getMongoClient();
        const data = await Users.find({});
        return data;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the latest invoices.");
    }
}

export async function resetPassword(email: string, password?: string) {
    noStore();
    type responseType = {
        status: number;
        error: string | null;
        success: string | null;
        id: string | null;
    };

    const responseData: responseType = {
        status: 500,
        success: null,
        error: null,
        id: null,
    };
    try {
        await getMongoClient();
        if (!email) {
            return {
                status: 400,
                success: "No user found!",
            };
        }
        const otp = (1000 + Math.random() * 9000).toFixed(0);
        const user = await Users.findOne({ email: email });

        if (user) {
            // sendind otp vaild for 5 mint
            const isSend = await mailHandler(email, otp);

            if (isSend.accepted) {
                // checking for email alreday exist in collection
                const otpRecord = await Otp.findOneAndUpdate(
                    { email },
                    { otp, createdAt: moment().unix() },
                    { new: true, upsert: true }
                );

                if (!otpRecord) {
                    const newOTp: any = new Otp({
                        email: email,
                        otp: otp,
                        createdAt: moment().unix(),
                    });
                    await newOTp.save();
                }
            }
            if (!isSend.accepted) {
                responseData.success = "Unable to send otp please try again";
                responseData.status = 500;
            }

            responseData.success = "OTP Send To Your email";
            responseData.status = 201;
            responseData.id = user._id.toString();
        }
        if (!user) {
            responseData.error = "No user found!";
            responseData.status = 500;
        }

        return responseData;
    } catch (error) {
        console.log(error);

        return error;
    }
}

export async function verifyOtpHandler(otp: string, email: string) {
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
    if (!email || !otp) {
        responseData.error = "Email and OTP are required";
        return responseData;
    }

    try {
        const storedOtp: any = await Otp.findOne({ email, otp });
        if (!storedOtp) {
            responseData.error = "Invalid OTP";
            return responseData;
        }

        const otpExpiryTime = storedOtp.createdAt + 5 * 60; // 5 minutes in seconds
        const currentTime = moment().unix(); // Current time in seconds
        if (currentTime > otpExpiryTime) {
            responseData.error = "OTP has expired";
            return responseData;
        }
        // await Otp.findByIdAndDelete({ email });

        responseData.success = "OTP verified successfully";
        responseData.status = 201;
        return responseData;
    } catch (error) {}
}

export async function getMorePosts(limit: number) {
    try {
        const response = await apiClient.getUserPosts(limit);
        return response;
    } catch (error) {
        return error;
    }
}
