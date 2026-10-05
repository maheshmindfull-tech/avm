export default function ProblemSolution() {
  return (
    <section className="ps" id="solution">
      <div className="wrap">
        <div className="eb">Problem and solution</div>
        <h2>Real estate is complicated. It doesn't have to be.</h2>
        <div className="cmp">
          <div className="no">
            <h3>Without an advisor</h3>
            <ul>
              <li>Brochures that show only the best side</li>
              <li>Hidden costs and unclear agreements</li>
              <li>Many projects, no honest comparison</li>
              <li>Paperwork and loans handled alone</li>
            </ul>
          </div>

          <div className="arrow" aria-hidden="true">
            <svg viewBox="0 0 32 20">
              <path d="M5 10h22M20 4l7 6-7 6" />
            </svg>
          </div>

          <div className="yes">
            <h3>With AVM</h3>
            <ul>
              <li>Honest pros and cons, including who should not buy</li>
              <li>Costs, RERA and agreements in plain words</li>
              <li>Curated shortlists, compared side by side</li>
              <li>Support from the first call to possession</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
