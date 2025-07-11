import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  // Removed unused activeSection state to fix eslint warning
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Java Developer'];

  const certificates = [
    {
      id: 1,
      name: 'Cisco Cyber Security',
      image: '/Cisco Certificate.jpeg',
      description: 'In this course, I learned the fundamentals of cybersecurity, including network security, threat detection, and risk mitigation strategies. This certification enhances my ability to secure web applications and protect organizational data, making me a valuable asset in developing secure software solutions.'
    },
    {
      id: 2,
      name: 'Android App Development',
      image: '/Android_App_Development.jpg',
      description: 'This course covered Android app development using Java and Android Studio, focusing on building user interfaces, managing app lifecycles, and integrating APIs. These skills enable me to create robust mobile applications, expanding my expertise in cross-platform development.'
    },
    {
      id: 3,
      name: 'Frontend Development',
      image: '/IBM.jpg',
      description: 'Through IBM’s frontend development course, I gained proficiency in HTML, CSS, JavaScript, and React.js, mastering responsive web design and dynamic user interfaces. This certification strengthens my ability to build engaging and user-friendly web applications, critical for modern software development.'
    },
    {
      id: 4,
      name: 'Java',
      image: '/Java Certificate.png',
      description: 'This course deepened my knowledge of Java programming, covering core and advanced concepts like object-oriented programming, multithreading, and Spring Boot. These skills are essential for building scalable backend systems, enhancing my versatility as a full-stack developer.'
    },
    {
      id: 5,
      name: 'Full Stack Java Developer',
      image: '/Java Certificate.png',
      description: 'As a Full Stack Java Developer, I’ve learned to build complete web applications using technologies like React.js, Core Java, Spring Boot, and MySQL. I also gained hands-on experience with tools like Git, Maven, Docker, and Postman, and deployed projects on platforms like Heroku and Vercel.'
    }
  ];

  const projectImages = [
    '/Weather.webp',
    '/Employee.png',
    '/olivaclinic_logo.jpg',
    '/car.png',
    '/Realestate.jpg'
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/skills').then(res => setSkills(res.data));
    axios.get('http://localhost:5000/api/projects').then(res => setProjects(res.data));

    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(roleInterval);
    // eslint-disable-next-line
  }, []); // Removed roles.length from dependency array to fix warning

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', contactForm);
      setFormStatus('Message sent successfully!');
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus('Failed to send message.');
    }
  };

  const toggleResumeModal = () => {
    setIsResumeOpen(!isResumeOpen);
  };

  const openCertificateModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  const flipIn = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const roleTypewriter = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: 'auto',
      opacity: 1,
      transition: { duration: 1.5, ease: 'easeInOut', delay: 0.2 }
    },
    exit: { width: 0, opacity: 0, transition: { duration: 0.3 } }
  };

  const modalZoom = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: 'spring', bounce: 0.4 } }
  };

  const pulse = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3, yoyo: Infinity } }
  };

  const bounce = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, type: 'spring', bounce: 0.5 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const rotateScale = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.05, rotate: 3, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-inter">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-black bg-opacity-90 text-white-500 p-4 fixed w-full top-0 z-20 shadow-2xl "
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, textShadow: '0 0 10px rgba(255, 255, 255, 0.7)' }}
            className="text-3xl font-bold tracking-tight cursor-pointer hover:text-white transition-colors duration-300"
            onClick={toggleResumeModal}
          >
            Panga Syamsundar Rao
          </motion.div>
          <div className="flex items-center space-x-6">
            {['About', 'Skills', 'Projects', 'Certificates', 'Experience', 'Education', 'Contact'].map((item, idx) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-white border-b-2 border-white"
                // setActiveSection removed since state is removed
                className="cursor-pointer hover:text-white transition-colors duration-300 font-medium text-lg"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7)' }}
                >
                  {item}
                </motion.div>
              </Link>
            ))}
            <motion.i
              whileHover={{ scale: 1.2, rotate: 360, textShadow: '0 0 10px rgba(255, 255, 255, 0.7)' }}
              className="fas fa-user-circle text-3xl cursor-pointer hover:text-white"
              onClick={toggleResumeModal}
            />
          </div>
        </div>
      </motion.nav>

      {/* About */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black to-black-500 opacity-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1], x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 z-10"
        >
          <div className="md:w-2/3 text-center md:text-left mb-12 md:mb-0">
            <motion.h1
              variants={slideIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-6 text-red-500"
            >
              Welcome to My Portfolio
            </motion.h1>
            <motion.p
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed text-white"
            >
              I am a well-organized, energetic, and goal-oriented fresher, possessing a positive attitude, problem-solving,
              and leadership skills with a flair to explore suitable avenues in software development with good knowledge in
              Java, frontend development, C, and Oracle. To work in an organization that provides me with ample
              opportunities to enhance my skills and knowledge while contributing to the growth of the organization.
            </motion.p>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRole}
                variants={roleTypewriter}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-6 text-2xl font-semibold text-red-500 overflow-hidden whitespace-nowrap"
              >
                {roles[currentRole]}
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div
            className="md:w-1/3 flex justify-center"
            variants={bounce}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src="/syam.webp"
              alt="Panga Syamsundar Rao"
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 bg-black">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-10 text-white-500"
          >
            Skills
          </motion.h2>


          <motion.h6
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-left mb-10 text-white-500"
          >
            Skills represent the core strengths that define one’s ability to perform effectively in various roles. They encompass both technical knowledge and soft abilities such as communication, teamwork, and adaptability. Continuously developing and refining skills is essential for personal growth and staying competitive in an ever-evolving professional landscape
          </motion.h6>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                variants={flipIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
                className="p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-3xl text-center font-semibold text-lg text-white border border-red-500 shadow-lg"
              >
                {skill.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
     
      {/* Projects */}
      <section id="projects" className="py-20 bg-black">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-10 text-white-500"
          >
            Projects
          </motion.h2>


          <motion.h6
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-left mb-10 text-white-500"
          >
           Projects are a reflection of practical skills, creativity, and problem-solving ability. They provide hands-on experience and demonstrate how theoretical knowledge is applied to real-world challenges. Through projects, one can showcase technical expertise, innovation, and the ability to work independently or collaboratively to build meaningful solutions.
          </motion.h6>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                variants={flipIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
                className="p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-3xl border border-red-500 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-red-500 mb-2">{project.title}</h3>
                <img
                  src={projectImages[idx]}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4 border border-red-500"
                />
                <p className="text-white mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-white transition-colors duration-300 font-semibold"
                >
                  View Project
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Certificates */}
      <section id="certificates" className="py-20 bg-black">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-10 text-white-500"
          >
            Certificates
          </motion.h2>

          <motion.h6
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-left mb-10 text-white-500"
          >
            Certificates validate one’s commitment to learning and professional development. They demonstrate specialized knowledge, skills, and proficiency in specific areas, often reflecting industry standards. Earning certifications showcases dedication, enhances credibility, and adds value in a competitive job market.
          </motion.h6>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                variants={flipIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
                className="p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-3xl border border-red-500 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-red-500 mb-2">{cert.name}</h3>
                <p className="text-base text-white mb-4">{cert.description}</p>
                <motion.button
                  variants={pulse}
                  initial="rest"
                  whileHover="hover"
                  onClick={() => openCertificateModal(cert)}
                  className="bg-white text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold w-full shadow-lg"
                >
                  View Certificate
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Experience */}
      <section id="experience" className="py-20 bg-black">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-10 text-white-500"
          >
            Experience
          </motion.h2>

          <motion.h6
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-left mb-10 text-white-500"
          >
            Experience plays a vital role in transforming knowledge into practical skills. It allows individuals to apply what they've learned, adapt to real-world challenges, and grow through continuous learning and problem-solving. Professional experience not only enhances technical expertise but also develops teamwork, communication, and leadership abilities essential for success in any field.
          </motion.h6>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={flipIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
              className="p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-3xl border border-red-500 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-red-500 mb-2">Full Stack Developer</h3>
              <p className="text-white">
                <a
                  href="https://bluepal.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-white hover:underline"
                >
                  Bluepal
                </a> - Present
              </p>
              <p className="text-white">Working as a Full Stack Developer, contributing to web application development using Java, React, and other modern technologies.</p>
            </motion.div>
            <motion.div
              variants={flipIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
              className="p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-3xl border border-red-500 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-red-500 mb-2">Full Stack Java Developer Course</h3>
              <p className="text-white">Naresh I Technologies, Hyderabad</p>
              <p className="text-white">I have completed a Full-Stack Development course during which I gained hands-on experience in both frontend and backend technologies. On the backend, I learned C, Core Java, Advanced Java, Spring Boot, Microservices, and Oracle. On the frontend, I worked with HTML, CSS, JavaScript, and React.js.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* Education */}
      <section id="education" className="py-20 bg-black">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-10 text-white-500"
          >
            Education
          </motion.h2>

          <motion.h5
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className=" text-left mb-10 text-white-500"
          >
            Education is the cornerstone of personal and professional growth. It shapes critical thinking, nurtures creativity, and builds the foundation for lifelong learning. Through education, individuals gain the knowledge and skills necessary to adapt, innovate, and contribute meaningfully to the world.
          </motion.h5>
           
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'B.Tech in Computer Science & Engineering',
                details: 'CT University, Punjab : 2020 - 2024',
                description: 'Graduated with a CGPA of 7.2, specializing in software development and computer science principles.'
              },
              {
                title: 'Intermediate (M.P.C)',
                details: 'Sri Chaitanya Junior College, Visakhapatnam : 2018 - 2020',
                description: 'Completed with a CGPA of 8.7, with a focus on Mathematics, Physics, and Chemistry.'
              },
              {
                title: 'Secondary School Certificate (SSC)',
                details: 'Bradlaugh School - 2018',
                description: 'Achieved a CGPA of 9.2, with a strong foundation in core academic subjects.'
              }
            ].map((edu, idx) => (
              <motion.div
                key={idx}
                variants={flipIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3, boxShadow: '0 15px 25px rgba(255, 255, 255, 0.3)' }}
                className="p-6 bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl rounded-3xl border border-red-500 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-red-500 mb-2">{edu.title}</h3>
                <p className="text-white">{edu.details}</p>
                <p className="text-white">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Contact */}
      <section id="contact" className="py-20 bg-black">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <motion.h2
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-10 text-white-500"
          >
            Contact Me
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Left Side: Heading and description */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2 w-full mb-8 md:mb-0 flex flex-col items-center md:items-start"
            >
              <h3 className="text-3xl font-bold text-red-500 mb-4">Contact Form</h3>
              <p className="text-lg text-white-500 mb-2 text-center md:text-left">
                Feel free to reach out for any queries or opportunities.<br />
                I will get back to you as soon as possible!
              </p>
              <div className="w-24 h-1 bg-red-500 rounded-full mt-2 mb-2"></div>
            </motion.div>
            {/* Right Side: The Form */}
            <motion.div
              variants={flipIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:w-1/2 w-full bg-gradient-to-br from-white to-black-500 bg-opacity-80 backdrop-blur-xl p-6 rounded-3xl"
            >
              <form onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <label className="block text-lg mb-1 font-semibold text-gray-500">Name</label>
                  <motion.input
                    type="text"
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 bg-white-800 text-black"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-1 font-semibold text-gray-500">Email</label>
                  <motion.input
                    type="email"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 bg-white-800 text-black"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-1 font-semibold text-gray-500">Message</label>
                  <motion.textarea
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 bg-white-800 text-black"
                    rows="2"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <motion.button
                  variants={pulse}
                  initial="rest"
                  whileHover="hover"
                  type="submit"
                  className="bg-black text-white-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 w-full font-bold shadow-lg"
                >
                  Send Message
                </motion.button>
                {formStatus && (
                  <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="mt-4 text-center text-red-500"
                  >
                    {formStatus}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-black bg-opacity-90 backdrop-blur-xl text-white-500 p-4 fixed bottom-0 w-full z-20 "
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-8">
            {[
              { href: 'https://www.linkedin.com/in/panga-syamsundar-rao-39b192226/', icon: 'fab fa-linkedin', label: 'LinkedIn' },
              { href: 'https://www.instagram.com/syam_panga/', icon: 'fab fa-instagram', label: 'Instagram' },
              { href: 'https://wa.me/918919004890', icon: 'fab fa-whatsapp', label: 'WhatsApp' },
              { href: 'https://www.naukri.com/mnjuser/profile', icon: 'fas fa-briefcase', label: 'Naukri' }
            ].map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-all duration-300 text-lg font-semibold"
                variants={pulse}
                initial="rest"
                whileHover="hover"  
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </motion.a>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg font-semibold text-white-500"
          >
            Developed by Syam
          </motion.div>
        </div>
      </motion.footer>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          >
            <motion.div
              variants={modalZoom}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-gradient-to-br from-black to-black-500 bg-opacity-90 backdrop-blur-xl p-8 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-red-500"
            >
              <motion.h2
                variants={slideIn}
                initial="hidden"
                animate="visible"
                className="text-3xl font-bold text-red-500 mb-6"
              >
                Resume
              </motion.h2>
              <div className="text-white">
                <motion.h3
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-2xl font-semibold mb-2 text-red-500"
                >
                  Panga Syamsundar Rao
                </motion.h3>
                <motion.p variants={fadeUp} initial="hidden" animate="visible">
                  Phone: +91-8919004890 | Email: syampanga2003@gmail.com
                </motion.p>
                <motion.h4
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-xl font-semibold mt-4 mb-2 text-red-500"
                >
                  Career Objective
                </motion.h4>
                <motion.p variants={fadeUp} initial="hidden" animate="visible" className="mb-4">
                  I am a well-organized, energetic, and goal-oriented fresher, possessing a positive attitude, problem-solving, and leadership skills with a flair to explore suitable avenues in software development with good knowledge in Java, frontend development, C, and Oracle. To work in an organization that provides me with ample opportunities to enhance my skills and knowledge while contributing to the growth of the organization.
                </motion.p>
                <motion.h4
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-xl font-semibold mt-4 mb-2 text-red-500"
                >
                  Core Competencies
                </motion.h4>
                <ul className="grid grid-cols-2 gap-2 mb-4">
                  {['HTML and CSS', 'JavaScript', 'Core Java', 'Advance Java', 'Oracle SQL/PL', 'Spring Boot & Microservices', 'React', 'C Language', 'Cyber Security', 'Software Development Lifecycle', 'Waterfall & Agile Methodologies', 'Software Testing'].map((skill, idx) => (
                    <motion.li
                      key={skill}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.1 }}
                      className="list-disc ml-5"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
                <motion.h4
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-xl font-semibold mt-4 mb-2 text-red-500"
                >
                  Academic Qualification
                </motion.h4>
                <table className="w-full border-collapse mb-4 text-white">
                  <thead>
                    <motion.tr variants={fadeUp} initial="hidden" animate="visible" className="bg-gradient-to-br from-white to-red-500">
                      <th className="border border-red-500 p-2">Degree/Examination</th>
                      <th className="border border-red-500 p-2">School/Institute Name</th>
                      <th className="border border-red-500 p-2">Year of Passing</th>
                      <th className="border border-red-500 p-2">CGPA/Percentage</th>
                    </motion.tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        degree: 'B.Tech (Computer Science & Engineering)',
                        institute: 'CT University, Punjab',
                        year: '2020',
                        cgpa: '7.2'
                      },
                      {
                        degree: 'Intermediate (M.P.C)',
                        institute: 'Sri Chaitanya Junior College, Visakhapatnam',
                        year: '2018',
                        cgpa: '8.7'
                      },
                      {
                        degree: 'S.S.C',
                        institute: 'Bradlaugh School',
                        year: '2018',
                        cgpa: '9.2'
                      }
                    ].map((row, idx) => (
                      <motion.tr
                        key={idx}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.1 }}
                      >
                        <td className="border border-red-500 p-2">{row.degree}</td>
                        <td className="border border-red-500 p-2">{row.institute}</td>
                        <td className="border border-red-500 p-2">{row.year}</td>
                        <td className="border border-red-500 p-2">{row.cgpa}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                <motion.h4
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-xl font-semibold mt-4 mb-2 text-red-500"
                >
                  Internships
                </motion.h4>
                <ul className="list-disc pl-5 mb-4">
                  {[
                    'Successfully completed Cisco training on Cyber Security.',
                    'Successfully completed Internship on frontend development in IBM (Online Course).',
                    'Doing Full stack Java developer course in Naresh I Technologies in Hyderabad.'
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <motion.h4
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-xl font-semibold mt-4 mb-2 text-red-500"
                >
                  Trainings Attended
                </motion.h4>
                <ul className="list-disc pl-5 mb-4">
                  {[
                    'Successfully completed C/HTML/CSS/JavaScript training program at Naresh I Technologies, Hyderabad.',
                    'Successfully completed Cisco training on Cyber Security.',
                    'Successfully completed Java training in Internshala.'
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <motion.h4
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-xl font-semibold mt-4 mb-2 text-red-500"
                >
                  Projects
                </motion.h4>
                <ul className="list-disc pl-5 mb-4">
                  {[
                    <span><strong>Weather Report Application</strong>: Developed a full stack web application that provides real-time weather updates using Java Spring Boot for the backend and React for the frontend. Integrated with Open Weather Map API to fetch and display current weather conditions and forecasts.</span>,
                    <span><strong>Employee Leave Management System</strong>: Developed a comprehensive leave management system using Java for the backend and HTML, CSS, and JavaScript for the frontend, with Oracle as the database. Enabled efficient tracking, approval workflows, and reporting of employee leave data.</span>,
                    <span><strong>Oliva Skin & Care</strong>: A React-based app offering personalized skincare routines, a catalogue of olive-based products, and expert skincare tips. <a href="http://invroiceolivaclinic.com/" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-white hover:underline">Link</a></span>,
                    <span><strong>Carbia Motors</strong>: A frontend React app showcasing car listings, specifications, and dealer information. <a href="https://carbook-rho.vercel.app/main" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-white hover:underline">Link</a></span>,
                    <span><strong>Real Estate Explorer</strong>: A React-based front-end application for browsing and filtering property listings. <a href="https://frontend-virid-one-37.vercel.app/login" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-white hover:underline">Link</a></span>
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: idx * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <motion.h4
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-xl font-semibold mt-4 mb-2 text-red-500"
                >
                  Personal Details
                </motion.h4>
                <motion.p variants={fadeUp} initial="hidden" animate="visible">
                  Languages Known: English, Telugu, and Hindi
                </motion.p>
                <motion.h4
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-xl font-semibold mt-4 mb-2 text-red-500"
                >
                  Declaration
                </motion.h4>
                <motion.p variants={fadeUp} initial="hidden" animate="visible">
                  I hereby declare that the above written particulars are true to the best of my knowledge and belief.
                </motion.p>
                <motion.p variants={fadeUp} initial="hidden" animate="visible" className="mt-2">
                  Syamsundar
                </motion.p>
              </div>
              <motion.button
                variants={pulse}
                initial="rest"
                whileHover="hover"
                onClick={toggleResumeModal}
                className="mt-6 bg-white text-red-500 p-3 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 w-full font-bold shadow-lg"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          >
            <motion.div
              variants={modalZoom}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-gradient-to-br from-black to-black-500 bg-opacity-90 backdrop-blur-xl p-8 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-red-500"
            >
              <motion.h2
                variants={slideIn}
                initial="hidden"
                animate="visible"
                className="text-3xl font-bold text-red-500 mb-6"
              >
                {selectedCertificate.name}
              </motion.h2>
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.name}
                className="w-full h-auto object-contain rounded-lg mb-6 border border-red-500"
              />
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-white mb-6"
              >
                {selectedCertificate.description}
              </motion.p>
              <motion.button
                variants={pulse}
                initial="rest"
                whileHover="hover"
                onClick={closeCertificateModal}
                className="bg-black text-black-500 p-3 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 w-full font-bold shadow-lg"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default App;