"use client";

type ButtonProps = {
    icon: React.ReactNode;
    title: string;
    action: () => void;
    variant: "large" | "medium";
};

function Button({ icon: Icon, title, action, variant }: ButtonProps) {
    const variants = {
        large: "py-3.5 px-8 text-xl",
        medium: "py-2 px-6 text-base",
    };

    return (
        <button
            type="button"
            className={`hover-zoom bg-accent rounded-button flex items-center justify-center text-white gap-4 ${variants[variant]}`}
            onClick={action}
        >
            {Icon}
            <span className="font-sans font-normal leading-22 tracking-normal text-center align-bottom">
                {title}
            </span>
        </button>
    );
}

export default Button;