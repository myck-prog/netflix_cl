import Head from "next/head";
import Image from "next/image";
function Login() {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Home - Ntllix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        className="relative mt-24 space-y-8 bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        action=""
      >
        <h1>Sign In</h1>
        <div className="space-y-4">
          <label>
            <input type="email" placeholder="Email" className="input" />
          </label>
          <label>
            <input type="password" placeholder="Password"className="input" />
          </label>
        </div>
        <button className="w-full rounded bg-[#e50914] py-3 font-semibold">Sign In</button>
      </form>
    </div>
  );
}
export default Login;
// 19.15