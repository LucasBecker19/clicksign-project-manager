"use client";

type ButtonProps = {
    icon?: React.ReactNode;
    title: string;
    action: () => void;
    variant?: "regular" | "outline";
    size?: "large" | "medium";
};

function Button({ icon: Icon, title, action, variant = "regular", size = "medium" }: ButtonProps) {
    const sizes = {
        large: "py-3.5 px-8 text-xl",
        medium: "py-2 px-6 text-base",
    };

    const variants = {
        regular: "bg-accent text-white",
        outline: "bg-transparent text-accent border border-accent",
    };

    return (
        <button
            type="button"
            className={`hover-zoom rounded-button flex items-center justify-center gap-4 ${sizes[size]} ${variants[variant]}`}
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