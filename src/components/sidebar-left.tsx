import Image from "next/image";

export default function SideBarLeft() {
    return (
        <aside className="fixed left-10 h-full py-6 w-32  ">
            <div className="h-full bg-muted rounded-2xl flex flex-col items-center ">
            <Image src="/images/logo.png" alt="logo" width={0} height={0} sizes="100vw" className="w-20 h-20" />
            </div>
           
            
        </aside>
    )
}