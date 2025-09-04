import Cookies from "js-cookie";

export const handleLogout = async () => {
    Cookies.remove("cpnx_t");
    // localStorage.removeItem("");
    window.location.reload();
    window.location.href = "/";
};
