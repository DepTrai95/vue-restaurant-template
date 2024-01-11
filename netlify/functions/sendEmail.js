import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const handler = async (event, context) => {
  try {
   const { to, name, email, text, date } = JSON.parse(event.body);

    const msg = {
      to: to,
      from: 'info@aroi-dresden.de',
      subject: `Reservierung für den: ${date}`,
      text: text,
      replyTo: {
         email: email,
         name: name,
      },
    };

    await sgMail.send(msg);
    console.log('Email erfolgreich verschickt.');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email erfolgreich verschickt' }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Fehler beim verschicken der E-Mail!' }),
    };
  }
};
