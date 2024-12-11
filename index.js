const express = require("express");
const xlsx = require("xlsx");
const sendEmail = require("./sendEmail"); // Import your custom sendEmail function
const path = require("path"); // To handle file path
require("dotenv").config();

// {
//   "template": {
//     "subject": "Job Application",
//     "body": "<h1>Hello, {{name}}!</h1><p>Thank you for signing up for our service.</p>"
//   }
// }

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// A simple route to check server status
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Route to handle sending emails
app.post("/send-emails", (req, res) => {
  const { template } = req.body;

  // Define the path to the Excel file (located in the same folder as this script)
  const excelFilePath = path.join(__dirname, "email.xlsx"); // This resolves the file path

  // Read the Excel file to get recipient emails
  const workbook = xlsx.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const recipients = xlsx.utils.sheet_to_json(sheet);
  console.log("Recipients:", recipients);

  // Send emails to all recipients
  recipients.forEach(async (recipient) => {
    const email = recipient.email;
    
    try {
      await sendEmail({
        email: email,
        subject: template.subject,
        name: recipient.name, // Example dynamic content
      });
    } catch (error) {
      console.error(`Error sending to ${email}:`, error);
    }
  });

  res.send("Emails are being sent!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
