export function MeterVisual() {
  return <div className="meter-visual project-art" role="img" aria-label="Illustrated water-meter recognition pipeline, from a photograph to a structured reading. Example reading: 001284.">
    <div className="art-labels"><span>VISION / RECOGNITION</span><span>FIG. 01</span></div>
    <div className="meter-layout"><div className="meter-capture"><span className="capture-label">INPUT_01.JPG</span><div className="meter"><div className="meter-rim"><div className="meter-face"><span className="meter-brand">VOLUMETRIC WATER METER</span><div className="meter-digits">{"00128".split("").map((n, i) => <span key={i}>{n}</span>)}<span className="red-digit">4</span></div><span className="meter-unit">m³</span><div className="meter-dials"><i /><i /><i /></div><span className="meter-spec">Q₃ 2.5 · R80</span></div></div></div><i className="scan-corner tl"/><i className="scan-corner tr"/><i className="scan-corner bl"/><i className="scan-corner br"/></div>
    <div className="vision-flow"><span className="flow-title">A new way to read.</span><div className="flow-row"><span>01</span><p>Capture<small>A meter photograph</small></p></div><div className="flow-row"><span>02</span><p>Recognize<small>Computer vision + OCR</small></p></div><div className="flow-row"><span>03</span><p>Structure<small>A readable result</small></p></div></div></div>
    <div className="art-labels"><span>FROM IMAGE TO INFORMATION</span><span>WORKFLOW ILLUSTRATION</span></div>
  </div>;
}

export function SchoolVisual() {
  return <div className="school-visual project-art" role="img" aria-label="Concept diagram showing a school management system connecting administrators, teachers, and students.">
    <div className="art-labels"><span>EDUCATION / CONNECTED</span><span>FIG. 02</span></div>
    <div className="school-layout"><div className="school-core"><svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="m6 24 26-14 26 14-26 14L6 24Zm11 7v16c10 8 20 8 30 0V31M58 24v21" stroke="currentColor" strokeWidth="1.4"/></svg><span>One school.<br/>Connected.</span></div><div className="school-roles"><span>Administration <b>↗</b></span><span>Teachers <b>↗</b></span><span>Students <b>↗</b></span></div></div>
    <div className="art-labels"><span>LESS FRICTION. MORE LEARNING.</span><span>CONCEPT DIAGRAM</span></div>
  </div>;
}

export function PCBVisual() {
  return <div className="pcb-visual project-art" role="img" aria-label="An illustrated circuit board representing web development work for Addis PCB."><div className="art-labels"><span>HARDWARE / DIGITAL</span><span>FIG. 03</span></div>
    <svg className="circuit-art" viewBox="0 0 600 350" aria-hidden="true"><g className="traces"><path d="M0 55h130l50 50h90M0 130h105l55 55h110M0 270h120l65-65h85M600 80H475l-50 50h-80M600 175H345M600 280H470l-65-65h-60M210 0v45l60 60M340 350v-85M95 350v-35l100-100M490 0v30l-105 105M40 0v30h80M570 350v-45H450M0 315h75l65-65M600 25H470l-65 65"/></g><g className="circuit-nodes"><circle cx="130" cy="55" r="5"/><circle cx="105" cy="130" r="5"/><circle cx="120" cy="270" r="5"/><circle cx="475" cy="80" r="5"/><circle cx="470" cy="280" r="5"/><circle cx="340" cy="275" r="5"/></g><rect className="chip" x="237" y="102" width="126" height="126" rx="8"/><rect className="chip-inner" x="250" y="115" width="100" height="100" rx="2"/><text x="300" y="157" textAnchor="middle">addis</text><text className="pcb-word" x="300" y="186" textAnchor="middle">PCB</text></svg><div className="art-labels"><span>HARDWARE MEETS THE WEB</span><span>PROJECT ILLUSTRATION</span></div></div>;
}
