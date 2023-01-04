import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { render } from "react-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const pin = useRef(null);
  const windowDimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    windowDimensions.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Only pin the image on wider screens.
    if (windowDimensions.current.width > 768) {
      ScrollTrigger.create({
        trigger: pin.current,
        start: "top top",
        endTrigger: "#section1",
        end: "bottom bottom",
        pinSpacing: false,
        pin: pin.current,
      });
    }

    gsap.to("#h1", {
      opacity: 0,
      scale: 1.2,
      scrollTrigger: {
        trigger: "#h1",
        scrub: true,
        start: "top top+=150",
        end: "bottom top",
      },
    });

    gsap.from("#h2", {
      opacity: 0,
      xPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: "#h2",
        scrub: true,
        start: "top bottom",
        end: "+=250",
      },
    });

    gsap.from('#img', {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: '#img',
        scrub: true,
        start: "top bottom",
        end: "+=250",
      },
    })

    gsap.utils.toArray(".li").forEach((li: HTMLLIElement) => {
      gsap.fromTo(
        li,
        {
          opacity: 0,
          y: 80,
        },
        {
          ease: "none",
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: li,
            scrub: true,
            start: "top bottom",
            end: "+=250",
          },
        }
      );
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

  }, []);

  return (
    <main>
      <section>
        <h1 id="h1">
          Your success depends on reaching the right conclusions, quickly and
          consistently.
        </h1>
      </section>
      <section id="section1">
        <header>
          <h2 id="h2">
            Traditional unstructured reasoning methods are holding you back
          </h2>
        </header>
        <div id="content">
          <div ref={pin} id="pin">
            <img id='img' />
          </div>
          <ul>
            <li className="li">
              Your reasoning has no single home where it can be developed
              methodically
            </li>
            <li className="li">
              Your team’s insights are scattered and inaccessible inside
              documents and people’s heads
            </li>
            <li className="li">Managing the process is stressful</li>
            <li className="li">Reasoning is often missing or unclear</li>
            <li className="li">
              Written guidance is hard to follow and live expert help is
              expensive
            </li>
          </ul>
        </div>
      </section>
      <footer>
        By Matthew Frawley for Associo
      </footer>
    </main>
  );
}

render(<App />, document.getElementById("root"));
