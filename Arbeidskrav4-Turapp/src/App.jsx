
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

import fjellBilde from "./assets/fjellhytta.jpg";
import skogBilde from "./assets/skoghytta.jpg";
import sjoBilde from "./assets/sjøhytta.jpg";
import "./App.css";

const hytter = [
  {
    id: 1,
    navn: "Fjellhytta",
    sted: "Geilo",
    pris: 1200,
    bilde: fjellBilde
  },
  {
    id: 2,
    navn: "Skogshytta",
    sted: "Telemark",
    pris: 900,
    bilde: skogBilde
  },
  {
    id: 3,
    navn: "Sjøhytta",
    sted: "Kragerø",
    pris: 1500,
    bilde: sjoBilde
  }
];

function Forside() {
  return (
    <div>
      <h1>Velkommen til Turappen</h1>
      <p>Finn en hytte til din neste tur!</p>
      <h2>Våre hytter</h2>

      {hytter.map((hytte) => (
        <div key={hytte.id} style={{ marginBottom: "30px" }}>
          <h3>{hytte.navn}</h3>

          <img
            src={hytte.bilde}
            alt={hytte.navn}
            style={{
              width: "350px",
              maxWidth: "100%",
              borderRadius: "10px"
            }}
          />

          <p>Sted: {hytte.sted}</p>
          <p>Pris: {hytte.pris} kr per natt</p>

          <Link to={`/hytte/${hytte.id}`}>
            Se detaljer
          </Link>
        </div>
      ))}
    </div>
  );
}

function HytteDetaljer() {
  const { id } = useParams();

  const hytte = hytter.find(
    (h) => h.id === Number(id)
  );

  if (!hytte) {
    return <h1>Hytta finnes ikke</h1>;
  }

  return (
    <div>
      <h1>{hytte.navn}</h1>

      <img
        src={hytte.bilde}
        alt={hytte.navn}
        style={{
          width: "450px",
          maxWidth: "100%",
          borderRadius: "10px"
        }}
      />

      <p>Sted: {hytte.sted}</p>
      <p>Pris: {hytte.pris} kr per natt</p>

      <Link to="/">Tilbake til forsiden</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forside />} />
        <Route
          path="/hytte/:id"
          element={<HytteDetaljer />}
        />
        <Route
          path="*"
          element={<h1>Siden finnes ikke</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
