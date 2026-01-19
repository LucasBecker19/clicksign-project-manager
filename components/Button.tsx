"use client";

type ButtonProps = {
    icon?: React.ReactNode;
    title: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "regular" | "outline";
    size?: "large" | "medium";
    wfull?: boolean;
    width?: string;
    disabled?: boolean;
};

function Button({ icon: Icon, title, onClick, type = "button", variant = "regular", size = "medium", wfull = false, width, disabled = false }: ButtonProps) {
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
            type={type}
            disabled={disabled}
            className={`rounded-button flex items-center justify-center gap-4 ${sizes[size]} ${variants[variant]} ${wfull ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover-zoom'}`}
            style={width ? { width } : undefined}
            onClick={onClick}
        >
            {Icon}
            <span className="font-sans font-normal leading-22 tracking-normal text-center align-bottom">
                {title}
            </span>
        </button>
    );
}

export default Button;