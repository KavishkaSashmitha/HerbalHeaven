import logoImage from '../assets/logo-1.png'; // Adjust the path to your logo image

function Spinner() {
  return (
    <div className="flex items-center justify-center gap-8 ">
      <img
        src={logoImage}
        alt="Logo"
        className="h-16 w-16 opacity-0 transition-opacity duration-1000 ease-in-out"
      />
      <Spinner className="h-16 w-16 text-green-900/50" />
    </div>
  );
}

export default Spinner();
