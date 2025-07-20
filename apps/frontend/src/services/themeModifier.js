
function linearTheme(from, to){
    const meta = document.querySelector("meta[name='theme-color']");
    if (!meta) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.body.scrollHeight - window.innerHeight;
      const percent = Math.min(Math.max(scrollTop / windowHeight, 0), 1);

      // Interpolation linéaire entre deux couleurs
    //   const from = [83, 83, 83];    // gris foncé
    //   const to = [38, 38, 38];   // blanc (ou une autre couleur si tu veux)

      const r = Math.round(from[0] + percent * (to[0] - from[0]));
      const g = Math.round(from[1] + percent * (to[1] - from[1]));
      const b = Math.round(from[2] + percent * (to[2] - from[2]));

      meta.setAttribute("content", `rgb(${r},${g},${b})`);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
}


export {
    linearTheme
}