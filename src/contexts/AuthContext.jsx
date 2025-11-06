import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase/config";          // ⭐ 多帶 db
import { ref, set, update } from "firebase/database";   // ⭐ Realtime DB API

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========= Sign up：建立帳號 + 寫入 Realtime DB =========
  // extraProfile 可以放 name 之類的額外欄位（可選）
  function signup(email, password, extraProfile = {}) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (cred) => {
        const u = cred.user;

        // 如果有傳 displayName，就順便更新 Firebase Auth 的 profile
        if (extraProfile.displayName) {
          await updateProfile(u, { displayName: extraProfile.displayName });
        }

        // ⭐ 寫入 Realtime Database：/users/{uid}
        const userRef = ref(db, "users/" + u.uid);
        await set(userRef, {
          uid: u.uid,
          email: u.email,
          password: password, // 注意：實務上不建議這樣存密碼
          displayName:
            extraProfile.displayName || u.displayName || "",
          provider: "password",
          createdAt: Date.now(),
          ...extraProfile, // 其他自訂欄位（不含密碼）
        });

        return cred;
      }
    );
  }

  // ========= Login：登入 + 更新 lastLoginAt =========
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(
      async (cred) => {
        const u = cred.user;
        const userRef = ref(db, "users/" + u.uid);

        await update(userRef, {
          lastLoginAt: Date.now(),
        });

        return cred;
      }
    );
  }

  // ========= Logout =========
  function logout() {
    return signOut(auth);
  }

  // ========= Google Sign in：登入/註冊 + 寫入/更新 DB =========
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(async (result) => {
      const u = result.user;
      const userRef = ref(db, "users/" + u.uid);

      await update(userRef, {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName || "",
        photoURL: u.photoURL || null,
        provider: "google",
        lastLoginAt: Date.now(),
      });

      return result;
    });
  }

  // ========= Password reset =========
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // ========= Update user profile（同步 Auth 與 DB） =========
  async function updateUserProfile(displayName, photoURL) {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, { displayName, photoURL });

    const userRef = ref(db, "users/" + auth.currentUser.uid);
    await update(userRef, {
      displayName,
      photoURL,
    });
  }

  // ========= 監聽登入狀態，順便更新 lastSeenAt =========
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = ref(db, "users/" + currentUser.uid);
        await update(userRef, {
          email: currentUser.email,
          displayName: currentUser.displayName || "",
          photoURL: currentUser.photoURL || null,
          lastSeenAt: Date.now(),
        });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
