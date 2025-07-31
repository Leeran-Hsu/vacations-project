import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import LayoutRoutes from "../Routing/LayoutRoutes";

function Layout(): JSX.Element {

    return (
        <div className="Layout">
            
            <Menu />

			<Header />

            <LayoutRoutes />

        </div>
    );
}

export default Layout;
