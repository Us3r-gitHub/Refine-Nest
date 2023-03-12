import { GitHubBanner, Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import dataProviderNestJsx from "@pankod/refine-nestjsx-crud";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/reset.css";
import { CustomerList } from "./pages/customers";
import { CategoryList } from "./pages/categories";

const App: React.FC = () => {
  return (
    <>
      <GitHubBanner />
      <Refine
        routerProvider={routerProvider}
        dataProvider={{
          default: dataProvider(
            "https://my-json-server.typicode.com/Us3r-gitHub/Sample-JSON-Server"
          ),
          nestjsx: dataProviderNestJsx(import.meta.env.VITE_API_URL),
        }}
        notificationProvider={notificationProvider}
        Layout={Layout}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "CustomerMenu",
            options: { label: "Customer Menu", route: "customer" },
          },
          {
            parentName: "CustomerMenu",
            name: "customers",
            list: CustomerList,
            canDelete: true,
            options: { route: "data", dataProviderName: "nestjsx" },
          },
          {
            parentName: "CustomerMenu",
            name: "categories",
            list: CategoryList,
            canDelete: true,
            options: {
              label: "Customer Category",
              route: "category/data",
              dataProviderName: "nestjsx",
            },
          },
        ]}
      />
    </>
  );
};

export default App;
