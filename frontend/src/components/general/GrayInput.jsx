import "../../styles/general/GrayInput.css";

export default function GrayInput({ placeholder, value, onChange, required, className = "", type, name, autocomplete }) {
    return (
        <input
            type={type || "text"}
            className={`gray-input ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            autoComplete={autocomplete || "off"}
        />
    );
}