import { useEffect } from "react";
import { Button, Col } from "react-bootstrap";

const GoogleSchedulingButton = () => {
  //   useEffect(() => {
  //     // Añadir el CSS al head del documento
  //     const link = document.createElement("link");
  //     link.href =
  //       "https://calendar.google.com/calendar/scheduling-button-script.css";
  //     link.rel = "stylesheet";
  //     document.head.appendChild(link);

  //     // Cargar el script de forma dinámica
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://calendar.google.com/calendar/scheduling-button-script.js";
  //     script.async = true;

  //     // Configuración del botón una vez que el script se carga
  //     script.onload = () => {
  //       window.calendar.schedulingButton.load({
  //         url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3TGOIprFK-czt9Cdx1C2D6bwEDp5LSjZueOyog3Qq2J8Gxa6kpB1Gsd5wsgiW947Kr1OIiDqVv?gv=true",
  //         color: "#039BE5",
  //         label: "Reservar una cita",
  //         target: document.getElementById("google-calendar-scheduling-button"),
  //       });
  //     };
  //   }, []);

  return (
    <Button
      id='google-calendar-scheduling-button'
      href='https://calendar.google.com/calendar/appointments/schedules/AcZssZ3TGOIprFK-czt9Cdx1C2D6bwEDp5LSjZueOyog3Qq2J8Gxa6kpB1Gsd5wsgiW947Kr1OIiDqVv?gv=true'
      target='_blank'>
      Reservar una cita
    </Button>
  );
};

export default GoogleSchedulingButton;
