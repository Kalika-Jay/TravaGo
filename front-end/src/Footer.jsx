import './styles/Footer.css'
export default function Footer(){
    return(
        <>
            <footer>
                <section className="footer_container">
                    <div className="logo_area"><img className='footer_logo' alt='footer_logo' src='src/assets/footer_logo.png'></img> </div>
                    <div className='contact'><h2>Contact Us</h2></div>
                    <div className="social"><h2>Socials</h2></div>
                </section>
            </footer>
        </>
    )
}