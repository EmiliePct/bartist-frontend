import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Login from "./Login";
import Events from "./Events";
const inter = Inter({ subsets: ["latin"] });


export default function Index() {
  const user = useSelector(state => state.user.value)

  if (user.isConnected) {
    return <Events />
  } else {
    return <Login />
  }
}
