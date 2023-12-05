import { useRouter } from "next/router";

const systeminfo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <div className="mt-20 md:h-[880px]">
      <div className="flex items-center justify-center">
        <h1>System Info Website</h1>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <p>Welcome to the System Info Website</p>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <button className="button" onClick={handleClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default systeminfo;
