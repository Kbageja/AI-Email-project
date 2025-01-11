export const generateEmailTemplate = (text, imageUrl, buttonLink) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
      <img src="${imageUrl}" alt="Logo" style="width: 80px; height: auto; border-radius: 50%;" />
    </div>
    <div style="padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">${text}</p>
      <div style="text-align: center;">
        <a href="${buttonLink}" style="background-color: #008000; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;">
          Play now
        </a>
      </div>
    </div>
    <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
      If you have any questions, feel free to contact us.
    </p>
  </div>
`;
