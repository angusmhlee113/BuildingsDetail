import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const [isChart, setIsChart] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/login") {
      setIsChart(false);
    } else if (pathname === "/chart") {
      setIsChart(true);
    }
  }, [pathname]);

  return (
    <div className="">
      <div className="flex justify-center">
        <h1 className="mt-3 text-3xl">Seattle Building Data Visualization</h1>
        <button
          onClick={() => {
            router.push("/overview");
          }}
          className={`${isChart ? "headerbutton" : "headerbuttonselected"}`}
        >
          Overview
        </button>
        <button
          onClick={() => {
            router.push("/chart");
          }}
          className={`${isChart ? "headerbuttonselected" : "headerbutton"}`}
        >
          Chart
        </button>
      </div>
    </div>
  );
};

export default Header;
