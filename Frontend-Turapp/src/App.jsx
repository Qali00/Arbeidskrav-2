
import { useState } from "react";
import "./App.css";

const turer = [
  {
    id: 1,
    navn: "Gaustatoppen",
    sted: "Rjukan",
    type: "Fottur",
    vanskelighet: "Middels",
    varighet: 5,
    beskrivelse: "Opplev fantastisk utsikt fra en av Norges mest kjente fjelltopper.",
  },
  {
    id: 2,
    navn: "Besseggen",
    sted: "Jotunheimen",
    type: "Fottur",
    vanskelighet: "Krevende",
    varighet: 8,
    beskrivelse: "En spektakulær fjelltur mellom Gjende og Bessvatnet.",
  },
  {
    id: 3,
    navn: "Lifjell rundt",
    sted: "Bø i Telemark",
    type: "Fottur",
    vanskelighet: "Enkel",
    varighet: 3,
    beskrivelse: "En hyggelig tur gjennom vakker natur på Lifjell.",
  },
  {
    id: 4,
    navn: "Skitur på Hardangervidda",
    sted: "Hardangervidda",
    type: "Skitur",
    vanskelighet: "Middels",
    varighet: 6,
    beskrivelse: "Utforsk fjellområdene på ski.",
  },
  {
    id: 5,
    navn: "Sykkeltur langs Telemarkskanalen",
    sted: "Telemark",
    type: "Sykkeltur",
    vanskelighet: "Enkel",
    varighet: 4,
    beskrivelse: "En fin sykkelopplevelse langs kanalen.",
  },
];

const hytter = [
  {
    id: 1,
    navn: "Fjellhytta",
    sted: "Gausta",
    betjening: "Betjent",
    pris: "Middels",
    fasiliteter: "Kjøkken, dusj og WiFi",
  },
  {
    id: 2,
    navn: "Skogshytta",
    sted: "Notodden",
    betjening: "Ubetjent",
    pris: "Lav",
    fasiliteter: "Kjøkken og peis",
  },
  {
    id: 3,
    navn: "Fjellro",
    sted: "Jotunheimen",
    betjening: "Betjent",
    pris: "Høy",
    fasiliteter: "Matservering og dusj",
  },
];

const fellesturer = [
  {
    id: 1,
    navn: "Fellestur til Gaustatoppen",
    sted: "Rjukan",
    dato: "15. november 2026",
    fleksibel: false,
    plasser: 5,
    beskrivelse: "Bli med på en sosial fjelltur med turleder.",
  },
  {
    id: 2,
    navn: "Hytte til hytte på Hardangervidda",
    sted: "Hardangervidda",
    dato: "Flere mulige datoer i november",
    fleksibel: true,
    plasser: 8,
    beskrivelse: "Vis interesse for en tur med fleksibel startdato.",
  },
];

function App() {
  const [side, setSide] = useState("Hjem");
  const [sok, setSok] = useState("");
  const [type, setType] = useState("Alle");
  const [vanskelighet, setVanskelighet] = useState("Alle");
  const [interesserte, setInteresserte] = useState([]);
  const [favoritter, setFavoritter] = useState([]);
  const [valgtHyttefilter, setValgtHyttefilter] = useState("Alle");

  const filtrerteTurer = turer.filter((tur) => {
    const soketekst =
      tur.navn.toLowerCase().includes(sok.toLowerCase()) ||
      tur.sted.toLowerCase().includes(sok.toLowerCase());

    const riktigType = type === "Alle" || tur.type === type;
    const riktigVanskelighet =
      vanskelighet === "Alle" || tur.vanskelighet === vanskelighet;

    return soketekst && riktigType && riktigVanskelighet;
  });

  const filtrerteHytter = hytter.filter((hytte) => {
    return (
      valgtHyttefilter === "Alle" ||
      hytte.betjening === valgtHyttefilter
    );
  });

  function meldInteresse(id) {
    if (interesserte.includes(id)) {
      setInteresserte(interesserte.filter((turId) => turId !== id));
    } else {
      setInteresserte([...interesserte, id]);
    }
  }

  function lagreFavoritt(id) {
    if (favoritter.includes(id)) {
      setFavoritter(favoritter.filter((turId) => turId !== id));
    } else {
      setFavoritter([...favoritter, id]);
    }
  }

  return (
    <div>
      <div className="student-banner">
        Studentoppgave ved Universitetet i Sørøst-Norge (USN)
      </div>

      <header>
        <h1>TurApp</h1>
        <p>Finn turen. Opplev naturen. Møt andre.</p>
      </header>

      <nav>
        {["Hjem", "Turer", "Hytter", "Fellesturer", "Favoritter", "Annonsører"].map(
          (navn) => (
            <button
              key={navn}
              className={side === navn ? "aktiv" : ""}
              onClick={() => {
                setSide(navn);
                setSok("");
              }}
            >
              {navn}
            </button>
          )
        )}
      </nav>

      <main>
        {side === "Hjem" && (
          <section className="velkommen">
            <h2>Velkommen til TurApp!</h2>
            <p>
              Finn nye turmål, utforsk hytter og planlegg turer
              sammen med andre friluftsinteresserte.
            </p>
            <button onClick={() => setSide("Turer")}>
              Utforsk turer
            </button>

            <div className="info-grid">
              <div className="info-card">
                <h3>Finn turer</h3>
                <p>Søk etter turer og filtrer etter type og vanskelighetsgrad.</p>
              </div>
              <div className="info-card">
                <h3>Utforsk hytter</h3>
                <p>Finn overnattingssteder og se hvilke fasiliteter de tilbyr.</p>
              </div>
              <div className="info-card">
                <h3>Gå sammen</h3>
                <p>Finn fellesturer og vis interesse for å delta.</p>
              </div>
            </div>
          </section>
        )}

        {side === "Turer" && (
          <section>
            <h2>Utforsk turer</h2>
            <p>Søk etter turer og bruk filtrene for å finne riktig tur.</p>

            <div className="filter">
              <input
                type="text"
                placeholder="Søk etter tur eller sted..."
                value={sok}
                onChange={(e) => setSok(e.target.value)}
              />

              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option>Alle</option>
                <option>Fottur</option>
                <option>Skitur</option>
                <option>Sykkeltur</option>
              </select>

              <select
                value={vanskelighet}
                onChange={(e) => setVanskelighet(e.target.value)}
              >
                <option>Alle</option>
                <option>Enkel</option>
                <option>Middels</option>
                <option>Krevende</option>
              </select>
            </div>

            <div className="kort-grid">
              {filtrerteTurer.map((tur) => (
                <article className="kort" key={tur.id}>
                  <h3>{tur.navn}</h3>
                  <p>{tur.beskrivelse}</p>
                  <p><strong>Sted:</strong> {tur.sted}</p>
                  <p><strong>Type:</strong> {tur.type}</p>
                  <p><strong>Vanskelighet:</strong> {tur.vanskelighet}</p>
                  <p><strong>Varighet:</strong> {tur.varighet} timer</p>
                  <button onClick={() => lagreFavoritt(tur.id)}>
                    {favoritter.includes(tur.id) ? "Fjern favoritt" : "Lagre favoritt"}
                  </button>
                </article>
              ))}
              {filtrerteTurer.length === 0 && <p>Ingen turer funnet.</p>}
            </div>
          </section>
        )}

        {side === "Hytter" && (
          <section>
            <h2>Hytter og overnattingssteder</h2>
            <p>Finn et sted å overnatte på turen.</p>

            <div className="filter">
              <select
                value={valgtHyttefilter}
                onChange={(e) => setValgtHyttefilter(e.target.value)}
              >
                <option>Alle</option>
                <option>Betjent</option>
                <option>Ubetjent</option>
              </select>
            </div>

            <div className="kort-grid">
              {filtrerteHytter.map((hytte) => (
                <article className="kort" key={hytte.id}>
                  <h3>{hytte.navn}</h3>
                  <p><strong>Sted:</strong> {hytte.sted}</p>
                  <p><strong>Type:</strong> {hytte.betjening}</p>
                  <p><strong>Prisnivå:</strong> {hytte.pris}</p>
                  <p><strong>Fasiliteter:</strong> {hytte.fasiliteter}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {side === "Fellesturer" && (
          <section>
            <h2>Fellesturer</h2>
            <p>Finn andre å gå på tur med. Noen turer har fleksible datoer.</p>

            <div className="kort-grid">
              {fellesturer.map((tur) => (
                <article className="kort" key={tur.id}>
                  <h3>{tur.navn}</h3>
                  <p>{tur.beskrivelse}</p>
                  <p><strong>Sted:</strong> {tur.sted}</p>
                  <p><strong>Startdato:</strong> {tur.dato}</p>
                  <p>
                    <strong>Dato:</strong>{" "}
                    {tur.fleksibel ? "Fleksibel" : "Fast"}
                  </p>
                  <p><strong>Ledige plasser:</strong> {tur.plasser}</p>
                  <button onClick={() => meldInteresse(tur.id)}>
                    {interesserte.includes(tur.id)
                      ? "Trekk tilbake interesse"
                      : "Vis interesse"}
                  </button>
                  {interesserte.includes(tur.id) && (
                    <p className="bekreftelse">
                      Du har vist interesse for turen!
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {side === "Favoritter" && (
          <section>
            <h2>Mine favoritter</h2>
            <p>Her finner du turene du har lagret.</p>
            <div className="kort-grid">
              {turer
                .filter((tur) => favoritter.includes(tur.id))
                .map((tur) => (
                  <article className="kort" key={tur.id}>
                    <h3>{tur.navn}</h3>
                    <p>{tur.sted}</p>
                    <button onClick={() => lagreFavoritt(tur.id)}>
                      Fjern favoritt
                    </button>
                  </article>
                ))}
            </div>
            {favoritter.length === 0 && <p>Du har ingen lagrede favoritter ennå.</p>}
          </section>
        )}

        {side === "Annonsører" && (
          <section>
            <h2>Annonsørportal</h2>
            <p>
              TurApp gir bedrifter mulighet til å vise relevante produkter
              og tjenester til friluftsinteresserte.
            </p>

            <form className="annonse-form" onSubmit={(e) => {
              e.preventDefault();
              alert("Takk! Dette er en demonstrasjon av annonsørportalen.");
            }}>
              <label>Bedriftsnavn</label>
              <input required placeholder="Skriv bedriftsnavn" />

              <label>E-post</label>
              <input required type="email" placeholder="navn@bedrift.no" />

              <label>Beskrivelse av annonsen</label>
              <textarea required placeholder="Beskriv produktet eller tjenesten" />

              <button type="submit">Send annonseforespørsel</button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>TurApp – for alle som er glade i å gå på tur.</p>
        <p>Studentprosjekt ved USN</p>
      </footer>
    </div>
  );
}

export default App;
