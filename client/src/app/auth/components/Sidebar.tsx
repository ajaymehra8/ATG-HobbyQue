"use client";

const Sidebar = () => {
  return (
    <div
className="hidden lg:flex h-screen w-full lg:w-[70%] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/12/79/14/02/360_F_1279140248_iSXyrgYTAK2657Mz5rYIdC8gawS7VA03.jpg')",
        borderRadius: "100px 0 100px 0",
        imageRendering: "auto", // Optional for modern browsers
      }}
    ></div>
  );
};

export default Sidebar;
