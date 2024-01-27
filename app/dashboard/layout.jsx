import NavBarComponent from '../ui/components/NavBar.jsx';

export default function Layout({ children }) {
  return (
    <>
      <NavBarComponent />
      {children}
    </>
  );
}
