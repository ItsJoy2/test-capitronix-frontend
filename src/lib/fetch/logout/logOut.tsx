import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();

  const signOut = () => {
    Cookies.remove("biznode_token");
    router.push("/");
  };

  return signOut;
};
