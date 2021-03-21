import React, { Suspense } from "react";
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
  PreloadedQuery,
} from "react-relay";
import { AppRepositoryNameQuery } from "__generated__/AppRepositoryNameQuery.graphql";
import graphql from "babel-plugin-relay/macro";
import RelayEnvironment from "./RelayEnvironment";

const query = graphql`
  query AppRepositoryNameQuery {
    repository(owner: "facebook", name: "relay") {
      name
    }
  }
`;

interface Props {
  preloadedQuery: PreloadedQuery<AppRepositoryNameQuery>;
}

const preloadedQuery: PreloadedQuery<AppRepositoryNameQuery> = loadQuery(
  RelayEnvironment,
  query,
  {
    /* query variables */
  }
);

const App: React.FC<Props> = ({ preloadedQuery }) => {
  const data = usePreloadedQuery<AppRepositoryNameQuery>(query, preloadedQuery);

  return (
    <div>
      <header>
        <p>{data?.repository?.name}</p>
      </header>
    </div>
  );
};

const AppRoot = (): JSX.Element => {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={"Loading..."}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default AppRoot;
