import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`https://krishilink-server-three.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch user error:", err);
        setLoading(false);
      });
  }, [user?.email]);

  return { users, loading };
};

export default useAuth;
