"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../styles/splashScreen.css";

const SplashScreen = () => {
  const [isV, setisV] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setisV(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return isV ? (
    <main id="splash-screen-container">
      <div id="splash-screen-content">
        <Image
          src="/todo-logo-frontend-tp.png"
          alt="logo"
          width={200}
          height={100}
        />
        <h1 id="splash-screen-heading">ToDo List</h1>
      </div>
    </main>
  ) : null;
};

export default SplashScreen;
