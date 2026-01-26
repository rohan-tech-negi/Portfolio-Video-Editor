import "./ToolBox.css";


export default function ToolBox() {
  return (
    <section className="toolbox-wrapper bg-black">

      {/* LEFT TEXT */}
      <div className="toolbox-text">
        <span className="toolbox-label text-white">{`{02} – Tools & Skills`}</span>
        <h1 className="toolbox-title text-white">My Creative Toolbox</h1>
      </div>

      {/* RIGHT CARDS */}
      <div className="container ">
        <ul id="cards">

          <li className="card" id="card1">
            <div className="card-body skill-card">
              <img src="/pr.png" alt="Premiere Pro" height={100} width={100}/>
              <div className="skill-content">
                <h3>Adobe Premiere Pro</h3>
                <p>
                 Premiere Pro is my go-to for professional video editing—combining precision, speed, and seamless integration. It lets me craft cinematic stories with powerful tools for editing, color grading, and audio—all in one fluid workflow.
                </p>
                {/* <div className="progress">
                  <div className="progress-bar" style={{ width: "85%" }}>
                    <span>85%</span>
                  </div>
                </div> */}
              </div>
            </div>
          </li>

          <li className="card" id="card2">
            <div className="card-body skill-card">
              <img src="/ae1.png" alt="Premiere Pro" />
              <div className="skill-content">
                <h3>Adobe After Effects</h3>
                <p>
                  After Effects is where motion comes alive—my essential tool for dynamic animations, visual effects, and compositing. Its deep integration with Adobe apps streamlines everything from kinetic typography to complex VFX.
                </p>
                {/* <div className="progress">
                  <div className="progress-bar" style={{ width: "80%" }}>
                    <span>80%</span>
                  </div>
                </div> */}
              </div>
            </div>
          </li>

          <li className="card" id="card3">
            <div className="card-body skill-card">
              <img src="/ai.png" alt="Premiere Pro" />
              <div className="skill-content">
                <h3>Adobe Illustrator</h3>
                <p>
                 Illustrator powers my vector creativity—perfect for designing logos, icons, and graphics with crisp precision.Its clean, scalable output ensures every visual element shines across any medium.
                </p>
                {/* <div className="progress">
                  <div className="progress-bar" style={{ width: "70%" }}>
                    <span>70%</span>
                  </div>
                </div> */}
              </div>
            </div>
          </li>

          <li className="card" id="card4">
            <div className="card-body skill-card">
             <img src="/dr.png" alt="Premiere Pro" />
              <div className="skill-content">
                <h3>DaVinci Resolve</h3>
                <p>
                  DaVinci Resolve is my color grading powerhouse—offering Hollywood-grade correction, editing, and finishing in one suite. Its node-based workflow gives me unmatched control over mood, tone, and cinematic look.
                </p>
                {/* <div className="progress">
                  <div className="progress-bar" style={{ width: "75%" }}>
                    <span>75%</span>
                  </div>
                </div> */}
              </div>
            </div>
          </li>

        </ul>
      </div>
    </section>
  );
}
