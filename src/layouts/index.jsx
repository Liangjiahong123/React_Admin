import { App } from "antd";
import { useLocation, useOutlet } from "@umijs/max";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./index.css";

const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <App>
      <SwitchTransition mode="out-in">
        <CSSTransition
          unmountOnExit
          appear
          classNames="route"
          timeout={500}
          key={location.pathname}
        >
          {outlet}
        </CSSTransition>
      </SwitchTransition>
    </App>
  );
};

export default Layout;
