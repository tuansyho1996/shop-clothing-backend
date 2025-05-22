import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // dùng SSL
  auth: {
    user: 'support@carnobon.com',
    pass: process.env.ZOHO_MAIL_PASSWORD,
  },
});

const sendOrderConfirmation = async (infoCustomer, orderInfo) => {
  const mailOptions = {
    from: '"Carnobon" <support@carnobon.com>',
    to: infoCustomer?.emailAddress,
    subject: `Xác nhận đơn hàng #${orderInfo?.id}`,
    html: `
      <h3>Chào ${infoCustomer?.giveName} ${infoCustomer?.surname},</h3>
      <p>Cảm ơn bạn đã đặt hàng tại Luna Decor!</p>
      <p><strong>Mã đơn hàng:</strong> ${orderInfo?.id}</p>
      <ul>
        ${infoCustomer?.items.map(item => `<li>${item.product_name} - ${item.product_count} x $${item.prouduct_price}</li>`).join('')}
      </ul>
      <p><strong>Tổng cộng:</strong> $${infoCustomer.itemTotal}</p>
      <p>Chúng tôi sẽ sớm gửi hàng cho bạn!</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export default sendOrderConfirmation;