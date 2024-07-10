import React, { useRef, useState, useEffect } from "react";
import { Row } from "react-bootstrap";

export const GoogleForm = ({
  src,
  height,
  title,
  marginheight,
  marginwidth,
}) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;
        setWidth(containerWidth);
      }
    };

    // Calcular el ancho inicialmente
    handleResize();

    // Añadir el event listener para recalcular en caso de que la ventana cambie de tamaño
    window.addEventListener("resize", handleResize);

    // Eliminar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // console.log("Width state updated:", width);
  }, [width]);

  return (
    <Row ref={containerRef}>
      <iframe
        src={src}
        width={width}
        height={height}
        title={title}
        style={{
          border: "none",
          margin: "0px",
          padding: "0px",
          maxWidth: "unset",
        }}
        allowFullScreen></iframe>
    </Row>
  );
};
