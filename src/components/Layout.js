import Head from "next/head";
import styles from "@/styles/Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { logOut } from "@/reducers/user";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { getVenueByToken } from "@/api/venues";
import { getArtist } from "@/api/artists";

export default function Layout({ children }) {

  const [profilImg, setProfilImg] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isVenue = user.isVenue;

  const handleLogOut = () => {
    dispatch(logOut());
    router.push('/')
  };

  const getImg = async () => {
    const data =  user.isVenue ? await getVenueByToken(user.token) : await getArtist(user.token);
    return data;
  }

  useEffect(() => {
    getImg().then(data => {
      setProfilImg(user.isVenue ? data.venue.picture : data.picture)
    });
  }, [])

  return (
    <>
      <Head>
        <title>Bartist</title>
        <meta name="description" content="mise en relation artiste & lieux de représentations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.blurBg}>
        <div className={styles.main}>
          <aside className={styles.sideMenu}>
            <div className={styles.logoContainer}>
              <Image
              className={styles.logo}
                alt="logo"
                src="/assets/logo.png"
                width={150}
                height={150}
              />
              <h2 className={styles.logoName}>
                <span>Bar</span>Tist
              </h2>
            </div>
            <nav className={styles.links}>
              <Link href="/Events" passHref>
                <span
                  className={
                    router.pathname === "/Events"
                      ? styles.selected
                      : styles.menuItem
                  }
                >
                  Mes évènements
                </span>
              </Link>
              {isVenue && (
                <Link href="/CreateEvent" passHref>
                  <span
                    className={
                      router.pathname === "/CreateEvent"
                        ? styles.selected
                        : styles.menuItem
                    }
                  >
                    Créer un évènement
                  </span>
                </Link>
              )}
              <Link href="/Search" passHref>
                <span
                  className={
                    router.pathname === "/Search"
                      ? styles.selected
                      : styles.menuItem
                  }
                >
                  {isVenue
                    ? "Rechercher un artiste"
                    : "Rechercher un évènement"}
                </span>
              </Link>
              <Link href="/Propositions" passHref>
                <span
                  className={
                    router.pathname === "/Propositions"
                      ? styles.selected
                      : styles.menuItem
                  }
                >
                  Mes propositions
                </span>
              </Link>
              <Link href="/Profile" passHref>
                <span
                  className={
                    router.pathname === "/Profile"
                      ? styles.selected
                      : styles.menuItem
                  }
                >
                  Mon Profil
                </span>
              </Link>
            </nav>
            <button onClick={handleLogOut} className={styles.logoutButton}>
              Se déconnecter
            </button>
          </aside>
          <div className={styles.center}>
            <header className={styles.header}>
              <>
                {isVenue  ? (
                  router.pathname != "/CreateEvent" ?<button
                    onClick={() => router.push("/CreateEvent")}
                    className={styles.button}
                  >
                    Créer un évènement
                  </button> : <></> 
                ) : (<>{router.pathname === "/Search" ? <></> : <button
                onClick={() => router.push("/Search")}
                className={styles.button}
              >
                Chercher un évènement
              </button> }</>
                  
                )}
              </>
              <div className={styles.rightContent}>
                <Image 
                    alt="logo"
                    className={styles.logo}
                    src= {profilImg ? profilImg : "/assets/noprofil.png"}
                    width={50}
                    height={50}
                  />                
                <div className={styles.userInfo}>
                  <p className={styles.name}>{user.pseudo}</p>
                </div>
              </div>
            </header>
            <main className={styles.content}>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
