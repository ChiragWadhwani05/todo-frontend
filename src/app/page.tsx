import Welcome from "./Welcome";
import SplashScreen from "./SplashScreen";
export default function Home() {
  let isLogin = false;
  let app: JSX.Element;
  if (isLogin) {
    app = (
      <main>
        <SplashScreen />
        <h1>Home Page</h1>
      </main>
    );
  } else {
    app = (
      <>
        <SplashScreen />
        <Welcome />;
      </>
    );
  }

  return app;
}
