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

const sendOrderConfirmation = async (order) => {
  const mailOptions = {
    from: '"Carnobon" <support@carnobon.com>',
    to: order?.order_info.email,
    subject: `Xác nhận đơn hàng #${order?._id}`,
    html: `
      <h3>Chào ${order?.order_info?.firstName} ${order?.order_info?.lastName},</h3>
      <p>Cảm ơn bạn đã đặt hàng tại Luna Decor!</p>
      <p><strong>Mã đơn hàng:</strong> ${order?._id}</p>
      <ul>
        ${order?.order_info?.items?.map(item => `<li>${item.product_name} - ${item.product_count} x $${item.product_price_eth}</li>`).join('')}
      </ul>
      <p><strong>Tổng cộng:</strong> $${order?.order_info?.subtotalEth}</p>
      <p>Chúng tôi sẽ sớm gửi hàng cho bạn!</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export default sendOrderConfirmation;