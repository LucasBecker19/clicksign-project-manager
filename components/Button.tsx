"use client"
export default function Button ({ icon: Icon, title, action }: { icon: React.ReactNode, title: string, action: () => void }) {
    return (
        <button type="button" className="hover-zoom cursor-pointer bg-accent rounded-button flex items-center justify-center py-3.5 px-8 text-white gap-4" onClick={action}>
            {Icon}
            <span className="font-sans font-normal text-xl leading-22 tracking-normal text-center align-bottom">
                {title}
            </span>
        </button>
    );
}