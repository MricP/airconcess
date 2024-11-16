import "../styles/GrayInput.css";

export default function GrayInput({ placeholder, value, onChange, className }) {
    return (
        <input
            type="text"
            className={`gray-input ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}