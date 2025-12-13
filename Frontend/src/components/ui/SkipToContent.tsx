import React from 'react';
import Link from 'next/link';

export const SkipToContent: React.FC = () => {
    return (
        <Link
            href="#main-content"
            className="skip-to-content"
            aria-label="Skip to main content"
        >
            Skip to content
        </Link>
    );
};

export default SkipToContent;
