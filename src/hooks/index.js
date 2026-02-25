import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function useTypewriter(words = [], typingSpeed = 85, deletingSpeed = 38, pauseMs = 1900) {
  const [typed,   setTyped]   = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDel]    = useState(false);

  useEffect(() => {
    const cur = words[wordIdx];
    const t = setTimeout(() => {
      if (!deleting) {
        setTyped(cur.slice(0, charIdx + 1));
        if (charIdx + 1 === cur.length) setTimeout(() => setDel(true), pauseMs);
        else setCharIdx(c => c + 1);
      } else {
        setTyped(cur.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDel(false);
          setWordIdx(i => (i + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return typed;
}

export function useScrollLock(active) {
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);
}

let emailjsLoaded = false;
let emailjsLoading = false;
const emailjsCallbacks = [];

function loadEmailJS(publicKey, onReady) {
  if (emailjsLoaded) {
    onReady();
    return;
  }
  emailjsCallbacks.push(onReady);
  if (emailjsLoading) return;
  emailjsLoading = true;

  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  script.onload = () => {
    try {
      window.emailjs.init(publicKey);
    // eslint-disable-next-line no-unused-vars, no-empty
    } catch (_) {}
    emailjsLoaded = true;
    emailjsCallbacks.forEach(cb => cb());
    emailjsCallbacks.length = 0;
  };
  script.onerror = () => {
    emailjsLoading = false;
  };
  document.head.appendChild(script);
}

export function useEmailJS(publicKey) {
  const [ready, setReady] = useState(emailjsLoaded);

  useEffect(() => {
    if (!publicKey || publicKey === "ONpBbO3VRlE-JSyuI") return;
    loadEmailJS(publicKey, () => setReady(true));
  }, [publicKey]);

  return ready;
}

export function sendEmailNow(serviceId, templateId, publicKey, params) {
  return new Promise((resolve, reject) => {
    const doSend = () => {
      if (!window.emailjs) {
        reject(new Error("EmailJS not loaded"));
        return;
      }
      window.emailjs.send(serviceId, templateId, params)
        .then(resolve)
        .catch(reject);
    };

    if (emailjsLoaded && window.emailjs) {
      doSend();
    } else {
      loadEmailJS(publicKey, doSend);
    }
  });
}
