import { useEffect } from "react";

// Link direto com âncora (ex.: /#productos, /adriano/#experiencia): o navegador tenta rolar
// antes do React renderizar a seção, não acha o alvo e fica no topo. Rola manualmente após
// montar e de novo quando as imagens terminam de carregar (elas empurram a posição da seção).
export function useScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    const raf = requestAnimationFrame(go);
    window.addEventListener("load", go, { once: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", go);
    };
  }, []);
}
