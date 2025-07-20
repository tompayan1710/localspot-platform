// import React, { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import BrowserRouterAll from "./BrowserRouterAll";
import AuthProvider from "./components/Auth/authContext/authProvider";
import { LoadScript } from "@react-google-maps/api";
import { useEffect } from "react";



//Pour sauvegarder : pg_dump "postgresql://postgres:TomPayan-1710@localhost:5432/localspot" -f viarte_backup.sql
//Pour restaurer : psql "postgresql://postgres:TomPayan-1710@localhost:5432/localspot" < viarte_backup.sql


//Pour se connecter : psql "postgresql://localspot_db_user:L9F2Y94DgXgIJmseoNngbbo0Hajqidlr@dpg-d058idc9c44c738g2kt0-a.oregon-postgres.render.com/localspot_db"
/*
Pour tout supprimer : (pas les types personnalisé, les dommaines et autres)

DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT tablename FROM pg_tables
        WHERE schemaname = 'public'
    ) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;
*/
//Pour envoyer depuis cmd : psql "postgresql://localspot_db_user:L9F2Y94DgXgIJmseoNngbbo0Hajqidlr@dpg-d058idc9c44c738g2kt0-a.oregon-postgres.render.com/localspot_db" < viarte_backup.sql

const LIBRARIES = ["places"];


export default function App() {
  useEffect(() => {
    const meta = document.querySelector("meta[name='theme-color']");
    if (meta) {
      meta.setAttribute("content", "535353"); // vert
    }
  }, []);


  useEffect(() => {
    const meta = document.querySelector("meta[name='theme-color']");
    if (!meta) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.body.scrollHeight - window.innerHeight;
      const percent = Math.min(Math.max(scrollTop / windowHeight, 0), 1);

      // Interpolation linéaire entre deux couleurs
      const from = [83, 83, 83];    // gris foncé
      const to = [255, 255, 255];   // blanc (ou une autre couleur si tu veux)

      const r = Math.round(from[0] + percent * (to[0] - from[0]));
      const g = Math.round(from[1] + percent * (to[1] - from[1]));
      const b = Math.round(from[2] + percent * (to[2] - from[2]));

      meta.setAttribute("content", `rgb(${r},${g},${b})`);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="AppWrapper">
    {/* <button onClick={() =>{
      const meta = document.querySelector("meta[name='theme-color']");
      if (meta) {
        console.log("Meta ai chargé !!!")
        meta.setAttribute("content", "373838"); // vert
      } else{
        console.log("Non le meta n'ai pas chargé")
      }
    }}>
      Change big black...
    </button>
    <button onClick={() =>{
      const meta = document.querySelector("meta[name='theme-color']");
      if (meta) {
        console.log("Meta ai chargé !!!")
        meta.setAttribute("content", "535353"); // vert
      } else{
        console.log("Non le meta n'ai pas chargé")
      }
    }}>
      Change black...
    </button>
    <button onClick={() =>{
      const meta = document.querySelector("meta[name='theme-color']");
      if (meta) {
        console.log("Meta ai chargé !!!")
        meta.setAttribute("content", "ffffff"); // vert
      } else{
        console.log("Non le meta n'ai pas chargé")
      }
    }}>
      Change white...
    </button> */}
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}   
              loadingElement={<div className="skeleton" style={{ width: "100%", height: "100%" }}></div>}
              libraries={LIBRARIES}
              >
      <AuthProvider>
        <BrowserRouter>
          <BrowserRouterAll />
        </BrowserRouter>

      </AuthProvider>
    </LoadScript>
    </div>
  );
}

//export default App;
