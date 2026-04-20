import { LottieScroll } from "../components/LottieScroll/LottieScroll";

export const Credenciales = () => {
  // const url = 'https://script.google.com/a/macros/apsis.com.ar/s/AKfycbywcGYU36qFV_hmJn3PnMH7nGvdQ5NUKTXqFugKWXzXl-AtQovItC48lFO9GPrhTB-D/exec'
  // const url = 'https://script.google.com/macros/s/AKfycbywcGYU36qFV_hmJn3PnMH7nGvdQ5NUKTXqFugKWXzXl-AtQovItC48lFO9GPrhTB-D/exec'
  const url =
    "https://docs.google.com/spreadsheets/d/1YUk6cmgyPyyBgK9ip6OAeEUe1NrlvqcjmPeKlJnK7f8/gviz/tq?tqx=out:json&gid=416464308";
  // const url = 'https://spreadsheets.google.com/feeds/cells/1YUk6cmgyPyyBgK9ip6OAeEUe1NrlvqcjmPeKlJnK7f8/1/public/full?alt=json'
  const acreditados = async (url) => {
<<<<<<< HEAD
    await fetch(url);
=======
    // console.log(url)
    await fetch(url);

    // console.log(resp)
>>>>>>> dev
  };

  acreditados(url);


  return (
    <>
      <div style={{ height: "1500px", marginTop: "800px" }}>
        credenciales
        <LottieScroll />
        <h1>Cred</h1>
      </div>
    </>
  );
};
