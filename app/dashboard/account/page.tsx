import React from "react";
import HeroSection from "@/components/account/HeroSection";
import Cards from "@/Ui-resources/Cards";
import apiClient from "@/utils/apiClient";
import { DEFAULT_POSTS } from "@/utils/constants";
import { postsResponse } from "@/utils/definitions";

export default async function account() {
    const response: postsResponse = await apiClient.getUserPosts(DEFAULT_POSTS);
    
    return (
        <div>
            <div
                className="w-full profile-container "
                style={{ margin: "0px auto", maxWidth: "900px" }}
            >
                <HeroSection totalPostCount={response.totalPosts} />
                <Cards  initialPost={response} />
            </div>
        </div>
    );
}
