import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import logo from '../assets/logo.svg';

const Footer = () => {
    return (
        <div className="bg-base-200 text-base-content">
            <footer className="footer p-10 max-w-7xl mx-auto">
                <aside>
                    <img src={logo} alt="Micro Earn" className="w-12 h-12" />
                    <p className="font-bold text-xl">
                        Micro Earn Ltd.
                    </p>
                    <p>Providing reliable tech since 2024</p>
                </aside>
                <nav>
                    <header className="footer-title">Services</header>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300 max-w-7xl mx-auto">
                <aside className="items-center grid-flow-col">
                    <p>Copyright © 2024 - All right reserved by Micro Earn Ltd</p>
                </aside>
                <nav className="md:place-self-center justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <a href="https://github.com/fardin-sojon" target="_blank" rel="noopener noreferrer"><FaGithub className="text-2xl" /></a>
                        <a href="https://www.linkedin.com/in/fardin-sojon/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-2xl" /></a>
                        <a href="https://facebook.com/fardinsojon" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-2xl" /></a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
