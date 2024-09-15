"use client";
import React from "react";
import styles from "../shared/page.module.css";

import Chat from "../../components/chat";
import CharacterDisplay from "../../components/CharacterDisplay";
import FileViewer from "../../components/file-viewer";

const FileSearchPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
          <FileViewer />

        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <CharacterDisplay />
          </div>
        </div>
        
      </div>
    </main>
  );
};

export default FileSearchPage;
