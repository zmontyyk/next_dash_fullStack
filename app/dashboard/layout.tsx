import SideNav from "@/app/ui/dashboard/sidenav";
// import { SocketProvider } from "@/components/SocketContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div
                    style={{ background: "#FAF9F6" }}
                    className="sticky top-0 w-full flex-none bg-blend-darken md:w-64"
                >
                    <SideNav />
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    {children}
                </div>
                
            </div>
     
    );
}
