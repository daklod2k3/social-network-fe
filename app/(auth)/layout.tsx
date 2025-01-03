import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen max-h-screen grid-cols-[auto,1fr] justify-center overflow-hidden bg-gradient-to-r  from-[#0062FF] to-[#61EFFF]">
      {children}
    </div>
  );
};

export default Layout;

// linear-gradient(90deg,hsla(217,100%,50%,1)0%,hsla(186,100%,69%,1)100%)
// lg:min-h-[600px] xl:min-h-[800px]
