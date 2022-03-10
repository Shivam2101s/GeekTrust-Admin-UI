import "./Navbar.css";

export const Navbar = () => {
  const handleClick = () => {
    window.location.reload();
  };
  return (
    <div id="navbar">
      <img
        id="logo"
        src="https://assets.jobsforher.com/uploads/v3/companies/employer/3117/geektrust-in-logo-1505202311.png"
        alt=""
      />
      <div id="nav_link_div">
        <a
          className="link"
          href={"https://www.geektrust.in/coding-problem/frontend/adminui"}
        >
          Problem
        </a>
        <button id="homeBtn" onClick={handleClick}>
          Solution
        </button>
      </div>
    </div>
  );
};
