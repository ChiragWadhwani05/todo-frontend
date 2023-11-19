import Welcome from "./Welcome";

export default function Home() {
  let isLogin = false;
  let app: JSX.Element;

  if (isLogin) {
    app = (
      <main>
        <h1>Home Page</h1>
      </main>
    );
  } else {
    app = <Welcome />;
  }

  return app;
}
