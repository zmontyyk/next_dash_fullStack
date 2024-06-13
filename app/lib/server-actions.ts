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
const data = [
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=1",
        content: "Believe in the power of your dreams and make them real.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=2",
        content: "Embrace each day with joy and gratitude in your heart.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=3",
        content: "Create your own path and let your light shine brightly.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=4",
        content: "Explore new horizons and discover your inner strength.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=5",
        content: "Chase your dreams fearlessly and live without regrets.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=6",
        content: "Stay positive, even when faced with challenges in life.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=7",
        content: "Love deeply and cherish every moment with loved ones.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=8",
        content: "Inspire others with kindness and compassion every day.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=9",
        content: "Be bold and take risks to achieve your greatest dreams.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=10",
        content: "Find joy in the journey and celebrate every small victory.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=11",
        content: "Learn from your mistakes and grow stronger each day.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=12",
        content: "Stay curious and never stop exploring the world around you.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=13",
        content:
            "Believe in yourself and your ability to overcome any obstacle.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=14",
        content: "Dream big and work hard to turn your dreams into reality.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=15",
        content: "Live in the present moment and savor the beauty of life.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=16",
        content: "Be kind to yourself and others, for kindness is contagious.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=17",
        content: "Celebrate your uniqueness and embrace your true self.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=18",
        content: "Stay humble in your achievements and keep striving for more.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=19",
        content:
            "Spread positivity wherever you go and brighten someone's day.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=20",
        content: "Find happiness in simple pleasures and cherish every moment.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=21",
        content:
            "Strive for excellence and let your passion drive your success.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=22",
        content:
            "Appreciate the beauty of nature and find peace in its serenity.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=23",
        content:
            "Be resilient in the face of adversity and keep moving forward.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=24",
        content: "Learn to forgive and let go of negativity in your life.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=25",
        content: "Live with intention and create a life filled with purpose.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=26",
        content: "Trust in the process and believe in your own journey.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=27",
        content:
            "Stay committed to your goals and persevere through challenges.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=28",
        content: "Be present in every moment and live with mindfulness.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=29",
        content: "Nurture your relationships and cherish your loved ones.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=30",
        content: "Take care of your well-being and prioritize self-care.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=31",
        content:
            "Find strength in vulnerability and embrace your imperfections.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=32",
        content:
            "Learn from the past, live in the present, and plan for the future.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=33",
        content:
            "Choose positivity and radiate positivity in everything you do.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=34",
        content: "Be brave enough to follow your heart and intuition.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=35",
        content:
            "Keep learning and growing, for knowledge is the key to success.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=36",
        content:
            "Stay humble in your achievements and generous in your success.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=37",
        content: "Let your passion guide you and fuel your determination.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=38",
        content: "Dream big dreams and work tirelessly to achieve them.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=39",
        content: "Celebrate every small victory and be grateful for each day.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=40",
        content: "Live authentically and stay true to your values.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=41",
        content:
            "Find joy in the little things and appreciate the beauty around you.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=42",
        content: "Inspire others with your actions and kindness.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=43",
        content: "Be fearless in the pursuit of what sets your soul on fire.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=44",
        content: "Stay focused on your goals and ignore distractions.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=45",
        content:
            "Love yourself unconditionally and treat yourself with kindness.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=46",
        content: "Be grateful for each day and find joy in simple pleasures.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=47",
        content: "Trust the journey, even when you do not understand it.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=48",
        content: "Be patient with yourself as you grow and evolve.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=49",
        content: "See the good in others and encourage their success.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=50",
        content: "Live boldly and take risks to create a life you love.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=51",
        content: "Choose happiness every day, no matter the circumstances.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=52",
        content: "Believe in your dreams and work tirelessly to achieve them.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=53",
        content: "Be the change you wish to see in the world.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=54",
        content: "Live with gratitude and appreciate every blessing.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=55",
        content: "Stay curious and embrace lifelong learning.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=56",
        content: "Choose courage over comfort in every aspect of life.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=57",
        content: "Find peace in the midst of chaos and uncertainty.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=58",
        content: "Stay true to yourself and your values.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=59",
        content: "Dream big dreams and take small steps towards them.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=60",
        content: "Celebrate your progress and stay committed to growth.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=61",
        content: "Be kind to yourself and others on your journey.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=62",
        content: "Trust the process, even when it's challenging.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=63",
        content: "Be present in every moment and savor life's experiences.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=64",
        content: "Create meaningful connections with those around you.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=65",
        content: "Learn from your mistakes and grow stronger.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=66",
        content: "Stay positive and keep moving forward.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=67",
        content: "Be open to new experiences and opportunities.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=68",
        content: "Let go of what no longer serves you and embrace change.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=69",
        content: "Find strength in vulnerability and authenticity.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=70",
        content:
            "Celebrate your uniqueness and share your gifts with the world.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=71",
        content: "Be resilient in the face of challenges.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=72",
        content: "Live with purpose and passion.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=73",
        content: "Inspire others with your actions and words.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=74",
        content: "Embrace challenges as opportunities for growth.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=75",
        content: "Stay humble in your successes.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=76",
        content: "Cherish your relationships and invest in them.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=77",
        content: "Be mindful of the present moment.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=78",
        content: "Dream big and take action towards your goals.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=79",
        content: "Learn from criticism and use it to improve.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=80",
        content: "Stay curious and always seek to learn.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=81",
        content: "Trust your instincts and listen to your inner voice.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=82",
        content: "Celebrate your progress, no matter how small.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=83",
        content: "Be grateful for the present moment.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=84",
        content: "Practice gratitude daily.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=85",
        content: "Find joy in the simple things in life.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=86",
        content: "Stay humble in your achievements.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=87",
        content: "Learn from every experience.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=88",
        content: "Embrace change with open arms.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=89",
        content: "Live authentically.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=90",
        content: "Believe in yourself and your dreams.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=91",
        content: "Trust the process.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=92",
        content: "Be kind to yourself.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=93",
        content: "Practice self-care.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=94",
        content: "Follow your heart.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=95",
        content: "Stay focused on your goals.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=96",
        content: "Create your own path.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=97",
        content: "Let your light shine.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=98",
        content: "Be grateful for each day.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=99",
        content: "Celebrate every small victory.",
    },
    {
        id: "6667ee865f978186653712de",
        image: "https://picsum.photos/800/600?random=100",
        content: "Live life to the fullest.",
    },
];

export async function getUserPosts(limit?:number) {
    // const   DEFAULT_POST:number = 15
    interface PostInterface {
        _id: mongoose.Types.ObjectId;
    }
    await getMongoClient();
    const session: any = await auth();

    let response = {
        posts: [],
        totalPosts: 0,
    };

    const countPost = await Post.find({
        user: new ObjectId(session.user._id),
    }).countDocuments();
    const posts: any = await Post.find({ user: new ObjectId(session.user._id) })
        .populate("user")
        .select({ user: 0 })
        .lean()
        .limit(15)
        .then((posts) =>
            posts.map((post) => {
                const typedPost = post as PostInterface; // Type assertion
                return {
                    ...typedPost,
                    _id: typedPost._id.toString(),
                };
            })
        );
    response.posts = posts;
    response.totalPosts = countPost;
    return response;
}
