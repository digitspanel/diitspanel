import React from "react";
import { Route, Redirect, useLocation, Switch } from "react-router-dom";
import AdminSignIn from '../adminpages/auth/SignIn';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Home from '../userpages/Home/Home';
import Survey from '../userpages/Survey/Survey';
import ProfileQuestions from '../userpages/ProfileQuestions/ProfileQuestions';
import Account from '../userpages/Account/Account';
import Dashboard from '../adminpages/dashboard';
import ManageHome from '../adminpages/manageHome';
import ManageSurveys from '../adminpages/manageSurveys/manageSurveys';
import ManageAccounts from '../adminpages/manageAccounts';
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, userIsAuthenticated, ...rest }) => {

    let location = useLocation();
    
    return (
        <Route
            {...rest}
            render={(props) => {
                return userIsAuthenticated ?
                    <Component {...props} />
                    :
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location },
                        }}
                    />
            }}
        />
    );
};

const AdminPrivateRoute = ({ component: Component, adminIsAuthenticated, ...rest }) => {

    let location = useLocation();
    
    return (
        <Route
            {...rest}
            render={(props) => {
                return adminIsAuthenticated ?
                    <Component {...props} />
                    :
                    <Redirect
                        to={{
                            pathname: "/admin/signin",
                            state: { from: location },
                        }}
                    />
            }}
        />
    );
};

const Routes = (props) => {

    const adminIsAuthenticated = useSelector(({ auth }) => auth.adminLogedIn);

    const userIsAuthenticated = useSelector(({ auth }) => auth.logedIn);
    
    return (
        <>
            <Switch>
                <AdminPrivateRoute
                    exact
                    adminIsAuthenticated={adminIsAuthenticated}
                    path={"/admin/dashboard"}
                    component={Dashboard}
                />
                <AdminPrivateRoute
                    exact
                    adminIsAuthenticated={adminIsAuthenticated}
                    path={"/admin/managehome"}
                    component={ManageHome}
                />
                <AdminPrivateRoute
                    exact
                    adminIsAuthenticated={adminIsAuthenticated}
                    path={"/admin/managesurveys"}
                    component={ManageSurveys}
                />
                <AdminPrivateRoute
                    exact
                    adminIsAuthenticated={adminIsAuthenticated}
                    path={"/admin/manageaccounts"}
                    component={ManageAccounts}
                />

                <PrivateRoute
                    exact
                    userIsAuthenticated={userIsAuthenticated}
                    path={"/survey"}
                    component={Survey}
                />
                <PrivateRoute
                    exact
                    userIsAuthenticated={userIsAuthenticated}
                    path={"/profilequestions"}
                    component={ProfileQuestions}
                />
                <PrivateRoute
                    exact
                    userIsAuthenticated={userIsAuthenticated}
                    path={"/account"}
                    component={Account}
                />
                <PrivateRoute
                    exact
                    userIsAuthenticated={userIsAuthenticated}
                    path={"/home"}
                    component={Home}
                />
                <PrivateRoute
                    exact
                    userIsAuthenticated={userIsAuthenticated}
                    path={"/"}
                    component={Home}
                />
                <Route
                    exact
                    path={"/admin/signin"}
                    component={AdminSignIn}
                />
                <Route
                    exact
                    path={"/signin"}
                    component={SignIn}
                />
                <Route
                    exact
                    path={"/signup"}
                    component={SignUp}
                />
                {/* <Route
                        render={() => (
                            <AuthLayout>
                                <Page404 />
                            </AuthLayout>
                        )}
                    /> */}
            </Switch>
        </>
    );
};

export default Routes;