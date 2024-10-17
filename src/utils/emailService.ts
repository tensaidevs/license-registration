import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

const transporter_CONTACT = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME_CONTACT, // Sender email address
    pass: process.env.MAIL_PASSWORD_CONTACT, // App password from Gmail account OR email password
  },
});

const transporter_HR = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME_HR,
    pass: process.env.MAIL_PASSWORD_HR,
  },
});

const transporter_INFO = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME_INFO,
    pass: process.env.MAIL_PASSWORD_INFO,
  },
});

const compileTemplate = async (
  templatePath: string,
  data: any,
): Promise<string> => {
  const fullPath = path.join(__dirname, "../templates", templatePath);

  // Check if the path exists and is a file
  if (!fs.existsSync(fullPath) || fs.lstatSync(fullPath).isDirectory()) {
    throw new Error(`Template not found or is a directory: ${fullPath}`);
  }

  const templateSource = fs.readFileSync(fullPath, "utf-8");
  const template = Handlebars.compile(templateSource);
  return template(data);
};

export const sendMail_CONTACT = async (emailContext: any) => {
  try {
    // Compile the content template first
    const contentHtml = await compileTemplate(
      emailContext.templateName,
      emailContext.data,
    );

    // Then compile the base template, including the content template result
    const baseTemplateContent = await compileTemplate("base.html", {
      ...emailContext.data,
      content: contentHtml,
      subject: emailContext.subject,
    });

    // Set the final HTML content to email context
    emailContext.html = baseTemplateContent;

    // Send the email
    await transporter_CONTACT.sendMail(emailContext);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email ->", error);
  }
};

export const sendMail_HR = async (emailContext: any) => {
  try {
    // Compile the content template first
    const contentHtml = await compileTemplate(
      emailContext.templateName,
      emailContext.data,
    );

    // Then compile the base template, including the content template result
    const baseTemplateContent = await compileTemplate("base.html", {
      ...emailContext.data,
      content: contentHtml,
      subject: emailContext.subject,
    });

    // Set the final HTML content to email context
    emailContext.html = baseTemplateContent;

    // Send the email
    await transporter_HR.sendMail(emailContext);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email ->", error);
  }
};

export const sendMail_INFO = async (emailContext: any) => {
  try {
    // Compile the content template first
    const contentHtml = await compileTemplate(
      emailContext.templateName,
      emailContext.data,
    );

    // Then compile the base template, including the content template result
    const baseTemplateContent = await compileTemplate("base_INFO.html", {
      ...emailContext.data,
      content: contentHtml,
      subject: emailContext.subject,
    });

    // Set the final HTML content to email context
    emailContext.html = baseTemplateContent;

    // Send the email
    await transporter_INFO.sendMail(emailContext);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email ->", error);
  }
};
