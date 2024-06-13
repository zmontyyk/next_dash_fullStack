import React from 'react';
import HeroSection from '@/components/account/HeroSection';
import PostsSection from '@/components/account/PostsSection';

function page() {
    return (
        <div>
            <HeroSection />
            <PostsSection />
        </div>
    );
}

export default page;