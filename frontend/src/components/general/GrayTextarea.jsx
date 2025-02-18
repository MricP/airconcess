import "../../styles/general/GrayInput.css";

export default function GrayTextarea({ placeholder, value, onChange, required, className, maxLength, rows, onKeyDown }) {
    return (
        <textarea
            className={`gray-text-area ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            maxLength={maxLength}
            rows={rows || 3}
            onKeyDown={onKeyDown}
        />
    );
}
