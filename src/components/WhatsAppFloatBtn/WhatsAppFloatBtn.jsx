import { whatsAppFloatButton } from "../../assets";
import "./WhatsAppButton.scss";

export const WhatsAppButtonFloat = ({ message = "Quiero información sobre sus servicios" }) => {

  // Crear el mensaje con saltos de línea para WhatsApp
  const whatsAppMessage = message.replace(/\\n/g, '\n');
  const whatsAppData = `https://wa.me/${process.env.REACT_APP_WHATEL}/?text=${encodeURIComponent(whatsAppMessage)}`;

  const handleWhatsAppClick = () => {
    window.dataLayer.push({
      event: "WhatsApp",
      sent: true,
    });
  };

  return (
    <div>
      <a
        href={whatsAppData}
        className='whatsapp'
        target='_blank'
        rel='noreferrer'
        onClick={handleWhatsAppClick}>
        <img alt='WhatsApp' src={whatsAppFloatButton} />
      </a>
    </div>
  );
};
