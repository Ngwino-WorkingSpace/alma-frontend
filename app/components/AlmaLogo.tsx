export default function AlmaLogo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
            </defs>
            
            {/* Background Shape - Gentle Organic Shape */}
            <path 
                d="M 50 5 C 25 5, 5 25, 5 50 C 5 75, 25 95, 50 95 C 75 95, 95 75, 95 50 C 95 25, 75 5, 50 5 Z" 
                fill="#f0fdf4"
            />

            {/* Main Leaf Body */}
            <path 
                d="M 50 20 C 50 20, 25 35, 25 60 C 25 85, 50 85, 50 85 C 50 85, 75 85, 75 60 C 75 35, 50 20, 50 20 Z" 
                fill="url(#leafGradient)" 
            />

            {/* Leaf Vein */}
            <path 
                d="M 50 20 V 85" 
                stroke="#f0fdf4" 
                strokeWidth="2" 
                strokeLinecap="round"
                opacity="0.4"
            />

            {/* Small accent leaf */}
            <path 
                d="M 50 45 C 50 45, 65 50, 65 65 C 65 75, 50 75, 50 75" 
                fill="#ffffff" 
                opacity="0.2"
            />
            
            {/* Seed/Growth points */}
            <circle cx="50" cy="85" r="4" fill="#15803d" />
        </svg>
    );
}
