// sendEmail.js
const nodeMailer = require("nodemailer");
const path = require("path");

function generateHtmlContent(name) {
  const htmlContent = `
    <p>Dear ${name},</p>
    <p>I am applying for the Software Developer role. With hands-on experience in backend development, I have built scalable, microservices-driven applications using Golang, Node.js, and the MERN stack. In my recent position as a Full Stack Developer at Pixonix Ltd, I developed a Compensation Management System that streamlined HR operations and implemented a robust backend for CrowdSync using the Gin framework.</p>
    
    <p>I am skilled in RESTful APIs, Docker, and Kafka, and have a strong foundation in PostgreSQL, Redis, and AWS, enabling me to deliver high-performance solutions. I am eager to bring my skills and dedication to your team. Thank you for your consideration.</p>
    
    <p>I have attached my resume for your review, which provides further details about my skills and experience. I look forward to the opportunity to discuss how I can contribute to your team.</p>
  
    <p>Best regards,<br>
    Mohammad Hunain Siddiqui<br>
    hunainsiddiqui93@gmail.com | +91-7249320683 | <a href="https://github.com/HunainSiddiqui" target="_blank">https://github.com/HunainSiddiqui</a> | <a href="https://hunain.live" target="_blank">hunain.live</a></p>
  `;
  return htmlContent;
}

const sendEmail = async (options) => {
  console.log(process.env.SMPT_HOST);
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: false,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  let cnt = generateHtmlContent(options.name);

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: cnt,
    attachments: [
      {
        filename: "resume.pdf", // Name of the file to attach
        path: path.join(__dirname, "Resume_sde.pdf"), // Path to the file in the same folder
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.email}`);
  } catch (error) {
    console.error(`Failed to send email to ${options.email}:`, error);
  }
};

module.exports = sendEmail;
