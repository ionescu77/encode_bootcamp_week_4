"use client";

import React from "react";
import styles from "./page.module.css";

const Home = () => {
  const categories = {
    "Basic chat": "basic-chat",
    "Function calling": "function-calling",
    "File search": "file-search",
    All: "all",
  };

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        Characters RAG
      </div>
      <div className={styles.container}>
        This application extract characters from your story. 
      </div>
      <div className={styles.container}>
        <a className={styles.category} href="/examples/file-search">
          Continue
        </a>
      </div>
      {/* <div className={styles.container}>
        {Object.entries(categories).map(([name, url]) => (
          <a key={name} className={styles.category} href={`/examples/${url}`}>
            {name}
          </a>
        ))}
      </div> */}
    </main>
  );
};

export default Home;
