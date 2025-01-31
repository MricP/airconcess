import { useNavigate } from "react-router-dom";

function useRedirect() {
    const navigate = useNavigate();

    function redirectTo(location) {
        window.scrollTo({
            top: 0,
        });
        navigate(location)
    }

    return redirectTo;
}

export default useRedirect;