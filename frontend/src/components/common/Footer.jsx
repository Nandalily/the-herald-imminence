import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Mail, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
    ],
    Legal: [
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Code of Conduct', path: '/conduct' },
    ],
    Resources: [
      { name: 'Help Center', path: '/help' },
      { name: 'Blog', path: '/blog' },
      { name: 'Newsletter', path: '/newsletter' },
      { name: 'API', path: '/api' },
    ],
  };

  const socialLinks = [
    { icon: <Twitter size={20} />, name: 'Twitter', url: '#' },
    { icon: <Facebook size={20} />, name: 'Facebook', url: '#' },
    { icon: <Linkedin size={20} />, name: 'LinkedIn', url: '#' },
    { icon: <Mail size={20} />, name: 'Email', url: 'mailto:contact@herald-imminence.com' },
  ];

  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Newspaper className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">The Herald Imminence</h2>
                <p className="text-gray-300">Trusted News Source Since 2024</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Delivering accurate, timely, and insightful news coverage. 
              Stay informed with our in-depth analysis and breaking news updates.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-lg font-semibold mb-4">{section}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-300">
                &copy; {currentYear} The Herald Imminence. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <select className="bg-white/10 border-none rounded px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-white/30">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
              <div className="text-gray-300 text-sm">
                Version 1.0.0
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              This website uses cookies to enhance user experience. 
              <Link to="/cookies" className="underline ml-1">Learn more</Link>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              The Herald Imminence is committed to journalistic integrity and accuracy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
