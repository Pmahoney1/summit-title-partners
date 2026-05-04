import { Link } from 'react-router-dom'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, background: 'var(--navy)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontSize: 14 }}>▲</div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 17, color: 'var(--cream)', fontWeight: 600 }}>Summit Title Partners</span>
          </div>
          <p style={{ marginTop: 12 }}>Oklahoma's Title Problem Solvers</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/oklahoma-city">Oklahoma City</Link></li>
            <li><Link to="/tulsa">Tulsa</Link></li>
            <li><Link to="/norman">Norman</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <p><a href="mailto:trent@summittitlepartners.com">trent@summittitlepartners.com</a></p>
          <p style={{ marginTop: 4 }}>summittitlepartners.com</p>
        </div>
      </div>

      <div className="footer__bottom">
        © 2026 Summit Title Partners · All rights reserved
      </div>
    </footer>
  )
}
