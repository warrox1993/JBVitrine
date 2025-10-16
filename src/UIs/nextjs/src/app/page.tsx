export default function Page() {
  return (
    <>
      {/* Intro */}
      <section id="intro" className="wrapper style1 fullscreen fade-up">
        <div className="inner">
          <h1>Hyperspace</h1>
          <p>
            Just another fine responsive site template designed by{' '}
            <a href="http://html5up.net">HTML5 UP</a>
            <br />
            and released for free under the{' '}
            <a href="http://html5up.net/license">Creative Commons</a>.
          </p>
          <ul className="actions">
            <li>
              <a href="#one" className="button scrolly">
                Learn more
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* One (spotlights) */}
      <section id="one" className="wrapper style2 spotlights">
        <section>
          <a href="#" className="image">
            <img src="/images/pic01.jpg" alt="" data-position="center center" />
          </a>
          <div className="content">
            <div className="inner">
              <h2>Sed ipsum dolor</h2>
              <p>
                Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis
                mauris, eu ultricies erat malesuada quis. Aliquam dapibus.
              </p>
              <ul className="actions">
                <li>
                  <a href="/generic" className="button">
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <a href="#" className="image">
            <img src="/images/pic02.jpg" alt="" data-position="top center" />
          </a>
          <div className="content">
            <div className="inner">
              <h2>Feugiat consequat</h2>
              <p>
                Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis
                mauris, eu ultricies erat malesuada quis. Aliquam dapibus.
              </p>
              <ul className="actions">
                <li>
                  <a href="/generic" className="button">
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <a href="#" className="image">
            <img src="/images/pic03.jpg" alt="" data-position="25% 25%" />
          </a>
          <div className="content">
            <div className="inner">
              <h2>Ultricies aliquam</h2>
              <p>
                Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis
                mauris, eu ultricies erat malesuada quis. Aliquam dapibus.
              </p>
              <ul className="actions">
                <li>
                  <a href="/generic" className="button">
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </section>

      {/* Two (features) */}
      <section id="two" className="wrapper style3 fade-up">
        <div className="inner">
          <h2>What we do</h2>
          <p>
            Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis
            mauris, eu ultricies erat malesuada quis. Aliquam dapibus, lacus eget
            hendrerit bibendum, urna est aliquam sem, sit amet imperdiet est velit
            quis lorem.
          </p>
          <div className="features">
            <section>
              <span className="icon solid major fa-code"></span>
              <h3>Lorem ipsum amet</h3>
              <p>
                Phasellus convallis elit id ullam corper amet et pulvinar. Duis
                aliquam turpis mauris, sed ultricies erat dapibus.
              </p>
            </section>
            <section>
              <span className="icon solid major fa-lock"></span>
              <h3>Aliquam sed nullam</h3>
              <p>
                Phasellus convallis elit id ullam corper amet et pulvinar. Duis
                aliquam turpis mauris, sed ultricies erat dapibus.
              </p>
            </section>
            <section>
              <span className="icon solid major fa-cog"></span>
              <h3>Sed erat ullam corper</h3>
              <p>
                Phasellus convallis elit id ullam corper amet et pulvinar. Duis
                aliquam turpis mauris, sed ultricies erat dapibus.
              </p>
            </section>
            <section>
              <span className="icon solid major fa-desktop"></span>
              <h3>Veroeros quis lorem</h3>
              <p>
                Phasellus convallis elit id ullam corper amet et pulvinar. Duis
                aliquam turpis mauris, sed ultricies erat dapibus.
              </p>
            </section>
            <section>
              <span className="icon solid major fa-link"></span>
              <h3>Urna quis bibendum</h3>
              <p>
                Phasellus convallis elit id ullam corper amet et pulvinar. Duis
                aliquam turpis mauris, sed ultricies erat dapibus.
              </p>
            </section>
            <section>
              <span className="icon major fa-gem"></span>
              <h3>Aliquam urna dapibus</h3>
              <p>
                Phasellus convallis elit id ullam corper amet et pulvinar. Duis
                aliquam turpis mauris, sed ultricies erat dapibus.
              </p>
            </section>
          </div>
          <ul className="actions">
            <li>
              <a href="/generic" className="button">
                Learn more
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Three (contact) */}
      <section id="three" className="wrapper style1 fade-up">
        <div className="inner">
          <h2>Get in touch</h2>
          <p>
            Phasellus convallis elit id ullamcorper pulvinar. Duis aliquam turpis
            mauris, eu ultricies erat malesuada quis. Aliquam dapibus, lacus eget
            hendrerit bibendum, urna est aliquam sem, sit amet imperdiet est velit
            quis lorem.
          </p>
          <div className="split style1">
            <section>
              <form method="post" action="#">
                <div className="fields">
                  <div className="field half">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                  </div>
                  <div className="field half">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" />
                  </div>
                  <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea name="message" id="message" rows={5}></textarea>
                  </div>
                </div>
                <ul className="actions">
                  <li>
                    <a href="" className="button submit">
                      Send Message
                    </a>
                  </li>
                </ul>
              </form>
            </section>
            <section>
              <ul className="contact">
                <li>
                  <h3>Address</h3>
                  <span>
                    12345 Somewhere Road #654
                    <br />
                    Nashville, TN 00000-0000
                    <br />
                    USA
                  </span>
                </li>
                <li>
                  <h3>Email</h3>
                  <a href="#">user@untitled.tld</a>
                </li>
                <li>
                  <h3>Phone</h3>
                  <span>(000) 000-0000</span>
                </li>
                <li>
                  <h3>Social</h3>
                  <ul className="icons">
                    <li>
                      <a href="#" className="icon brands fa-twitter">
                        <span className="label">Twitter</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon brands fa-facebook-f">
                        <span className="label">Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon brands fa-github">
                        <span className="label">GitHub</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon brands fa-instagram">
                        <span className="label">Instagram</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="icon brands fa-linkedin-in">
                        <span className="label">LinkedIn</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
