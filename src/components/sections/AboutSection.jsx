import { useModal } from '../../context/ModalContext';

export default function AboutSection() {
  const { openContactModal } = useModal();
  return (
    <section className="about" id="about">
      <div className="wrap">
        {/* Square AVM Logo Presentation Box */}
        <div
          className="sq flex items-center justify-center p-8 bg-white border border-[rgba(110,60,35,0.16)] rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.02]"
          role="img"
          aria-label="AVM Homes logo: Your Trust. Our Commitment."
        >
          <img
            src="/logo.png"
            alt="AVM Homes: Your Trust. Our Commitment."
            className="w-full max-h-[85%] object-contain drop-shadow-sm"
          />
        </div>

        {/* Content */}
        <div>
          <div className="eb">About AVM Homes</div>
          <h2>A property advisory partner, not just a broker.</h2>
          <p>
            AVM Homes helps buyers in Pune understand a property before they commit to it: the
            locality, the numbers, the paperwork and the trade-offs. For builders and developers,
            we bring local expertise, honest positioning and sales execution.
          </p>
          <div className="tags">
            <span>First-time buyers</span>
            <span>Upgrade buyers</span>
            <span>Investors</span>
            <span>NRI and outstation</span>
            <span>Builders and developers</span>
          </div>
          <button
            className="btn"
            onClick={() => openContactModal({ source: 'About Section CTA' })}
          >
            Talk to our team
          </button>
        </div>
      </div>
    </section>
  );
}
