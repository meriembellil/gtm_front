import { useHistory } from "react-router-dom";

const history = useHistory();

export const verifySession = async () => {
    const res = dispatch(await getUserProfile(jwtDecode(token).sub))
    setTimeout(async () => {
        if (res.payload.user) {
            setUser(res.payload.user)
        } else {
            alert('your session has expired please log in again')
            dispatch(await logout());
            history.push('/login')
            window.location.reload();
        }
    }, 200);
}