import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bottom">
          <div className="copyright centered">
            &copy; {currentYear} <span className="highlights">Mohammad Kaif</span>. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;