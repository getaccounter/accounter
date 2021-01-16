import React, { ReactNode } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Media from "react-media";
import SecondaryColumn from "./components/SecondaryColumn";
import MainColumn from "./components/MainColumn";

type Props = {
  secondaryColumn: () => ReactNode;
  mainColumn: (id: string) => ReactNode;
};
const DetailLayout = ({ secondaryColumn, mainColumn }: Props) => {
  let { path } = useRouteMatch();
  return (
    <div className="flex-1 relative z-0 flex overflow-hidden">
      <Media query="(min-width: 1280px)">
        {(xlAndBigger) =>
          xlAndBigger ? (
            <>
              <Route path={`${path}/details/:id`}>
                {({ match }) => (
                  <MainColumn>
                    {match && mainColumn(match!.params.id)}
                  </MainColumn>
                )}
              </Route>
              <Route path={`${path}/`}>
                <SecondaryColumn>{secondaryColumn()}</SecondaryColumn>
              </Route>
            </>
          ) : (
            <Switch>
              <Route path={`${path}/details/:id`}>
                {({ match }) => (
                  <MainColumn>
                    {match && mainColumn(match!.params.id)}
                  </MainColumn>
                )}
              </Route>
              <Route path={`${path}/`}>
                <SecondaryColumn isMobile>{secondaryColumn()}</SecondaryColumn>
              </Route>
            </Switch>
          )
        }
      </Media>
    </div>
  );
};

export default DetailLayout;
