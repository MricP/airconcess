import "../styles/GrayInput.css";

export default function GrayInput({ placeholder, value, onChange, required, className, type }) {
    return (
        <input
            type={type || "text"}
            className={`gray-input ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
}