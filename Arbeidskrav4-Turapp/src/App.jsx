import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css";

const hytter = [
  {
    id: "1",
    navn: "Fjellhytta",
    sted: "Geilo",
    pris: 1200,
    personer: 8,
    beskrivelse:
      "En koselig hytte med flott utsikt over fjellene. Perfekt for familie og venner som ønsker en tur nær naturen.",
    fasiliteter: ["Kjøkken", "Bad", "WiFi", "Peis"],
    bilde: "/images/hytte1.webp",
  },
  {
    id: "2",
    navn: "Skogshytta",
    sted: "Telemark",
    pris: 900,
    personer: 5,
    beskrivelse:
      "En rolig hytte omgitt av skog. Her kan du nyte naturen, gå turer og slappe av.",
    fasiliteter: ["Kjøkken", "Peis", "Parkering"],
    bilde: "/images/hytte3.jpg",
  },
  {
    id: "3",
    navn: "Sjøhytta",
    sted: "Kragerø",
    pris: 1500,
    personer: 6,
    beskrivelse:
      "En hyggelig hytte nær sjøen. Perfekt for deg som liker bading, fiske og fine dager ved kysten.",
    fasiliteter: ["Kjøkken", "Bad", "WiFi", "Terrasse"],
    bilde: "/images/hytte2.webp",
  },
];

function Forside() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">OPPLEV NORSK NATUR</p>
          <h1>Finn din neste hyttetur</h1>
          <p>
            Utforsk koselige hytter og finn det perfekte stedet for ditt neste
            eventyr.
          </p>
          <a href="#hytter" className="hero-button">
            Se hyttene
          </a>
        </div>
      </section>

      <section className="hytteoversikt" id="hytter">
        <div className="section-heading">
          <p className="eyebrow">UTFORSK UTVALGET</p>
          <h2>Våre hytter</h2>
          <p>Finn en hytte som passer for deg og reisefølget ditt.</p>
        </div>

        <div className="hytte-grid">
          {hytter.map((hytte) => (
            <article className="hytte-kort" key={hytte.id}>
              
              <img
                src={hytte.bilde}
                alt={hytte.navn}
                className="hytte-bilde"
              />

              <div className="kort-innhold">
                <p className="hytte-sted">{hytte.sted}</p>

                <h3>{hytte.navn}</h3>

                <p>{hytte.personer} personer</p>

                <div className="kort-bunn">
                  <p className="pris">
          {hytte.pris} kr <span>/ natt</span>
                  </p>
     <Link
        to={`/hytte/${hytte.id}`}
    className="detalj-knapp"
                  >
        Se detaljer
         </Link>
      </div>
      </div>
   </article>
    ))}
 </div>
     </section>
    </>
  );
}

function HytteDetaljer() {
  const { id } = useParams();

  const hytte = hytter.find((hytte) => hytte.id === id);

  if (!hytte) {
    return (
      <main className="detaljside">
        <h2>Fant ikke hytta</h2>
        <Link to="/">Tilbake til forsiden</Link>
      </main>
    );
  }

  return (
    <main className="detaljside">
      <Link to="/" className="tilbake-link">
        ← Tilbake til alle hyttene
      </Link>

      <img
        src={hytte.bilde}
        alt={hytte.navn}
        className="detalj-bilde"
      />

      <div className="detalj-innhold">
        <p className="hytte-sted">{hytte.sted}</p>

        <h1>{hytte.navn}</h1>

        <p>{hytte.beskrivelse}</p>

        <div className="detalj-fakta">
          <div>
            <strong>{hytte.personer}</strong>
            <span>Personer</span>
          </div>

          <div>
            <strong>{hytte.pris} kr</strong>
            <span>Pris per natt</span>
          </div>
        </div>

        <h2>Fasiliteter</h2>

        <ul className="fasiliteter">
          {hytte.fasiliteter.map((fasilitet) => (
            <li key={fasilitet}>✓ {fasilitet}</li>
          ))}
        </ul>

        <p className="bestilling-info">
          Ta kontakt med oss dersom du ønsker mer informasjon om hytta.
        </p>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <Link to="/" className="logo">
          Tur<span>App</span>
        </Link>

        <nav>
          <Link to="/">Hjem</Link>
          <a href="/#hytter">Hytter</a>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Forside />} />
        <Route path="/hytte/:id" element={<HytteDetaljer />} />
        <Route path="*" element={<Forside />} />
      </Routes>

      <footer className="footer">
        <p>TurApp – Finn ditt neste eventyr i norsk natur.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;