import { Card } from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/server-actions';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/Ui-resources/skeletons';
import { auth } from '@/auth';
import { Feeds } from '@/components/latestFeeds/Feeds';

export default async function Page() {
    const latestInvoices = await fetchLatestInvoices();
    const session = await auth();    

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Latest feeds
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <Feeds />
                </Suspense>
                {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
            </div>
        </main>
    );
}
