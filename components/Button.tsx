import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  icon = null,
  disabled = false,
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants: Record<string, string> = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg border-none",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow",
    outline: "bg-transparent border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-900",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="mr-2 flex items-center">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};