import nodemailer from 'nodemailer';
import type { ContactMessage, JobApplication } from '@shared/schema';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password'
  }
});

export async function sendContactEmail(message: ContactMessage): Promise<void> {
  const mailOptions = {
    from: process.env.SMTP_USER || 'noreply@solorico.com.br',
    to: 'contato@solorico.com.br',
    subject: `Novo contato - ${message.subject || 'Contato geral'}`,
    html: `
      <h2>Nova mensagem de contato</h2>
      <p><strong>Nome:</strong> ${message.name}</p>
      <p><strong>Email:</strong> ${message.email}</p>
      ${message.phone ? `<p><strong>Telefone:</strong> ${message.phone}</p>` : ''}
      ${message.subject ? `<p><strong>Assunto:</strong> ${message.subject}</p>` : ''}
      <p><strong>Mensagem:</strong></p>
      <p>${message.message}</p>
      ${message.productId ? `<p><strong>Produto de interesse:</strong> ID ${message.productId}</p>` : ''}
      <p><em>Enviado em: ${new Date().toLocaleString('pt-BR')}</em></p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de contato enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar email de contato:', error);
    throw error;
  }
}

export async function sendJobApplicationEmail(application: JobApplication): Promise<void> {
  const mailOptions = {
    from: process.env.SMTP_USER || 'noreply@solorico.com.br',
    to: 'contato@solorico.com.br',
    subject: `Nova candidatura - ${application.areaOfInterest}`,
    html: `
      <h2>Nova candidatura - Trabalhe Conosco</h2>
      <p><strong>Nome:</strong> ${application.name}</p>
      <p><strong>Email:</strong> ${application.email}</p>
      <p><strong>Área de interesse:</strong> ${application.areaOfInterest}</p>
      ${application.message ? `<p><strong>Mensagem:</strong></p><p>${application.message}</p>` : ''}
      ${application.resumeUrl ? `<p><strong>Currículo:</strong> <a href="${application.resumeUrl}">Download</a></p>` : ''}
      <p><em>Enviado em: ${new Date().toLocaleString('pt-BR')}</em></p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de candidatura enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar email de candidatura:', error);
    throw error;
  }
}
