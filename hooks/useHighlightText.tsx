import { ReactNode } from 'react';

export const useHighlightText = () => {
    const renderHighlightedText = (text: string, query?: string): ReactNode => {
        if (!query || query.length === 0) {
            return text;
        }

        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (regex.test(part)) {
                return (
                    <span key={index} style={{ backgroundColor: 'var(--highlight)', fontWeight: 'bold', color: 'white' }}>
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    return { renderHighlightedText };
};
