import { useCallback } from "react";
import { setLoading, setUser } from "../state/auth.slice";
import { register, login, getMe } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = useCallback(async ({
    email,
    contact,
    password,
    fullname,
    isSeller = false,
  }) => {
    const data = await register({
      email,
      contact,
      password,
      fullname,
      isSeller,
    });

    dispatch(setUser(data.user));

    return data.user;
  }, [dispatch]);

  const handleLogin = useCallback(async ({ email, password }) => {
    const data = await login({ email, password });
    dispatch(setUser(data.user));
    return data.user;
  }, [dispatch]);

  const handleGetMe = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return { handleRegister, handleLogin, handleGetMe };
};
