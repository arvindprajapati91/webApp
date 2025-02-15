import React, { Component, Suspense, lazy } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HeaderNavBar from './components/headerNavBar';
import SideNavBar from './components/sideNavBar';
import HomePage from './pages/home'

const APP_NAME = `/${process.env.REACT_APP_NAME}`

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data_list: [],
			rouList: []
		}
	};

	getMenuList = () => {
		const API_form_name = "menuMaster"
		const listAPI = `/${process.env.REACT_APP_NAME}/${API_form_name}/ListAPI/?main_url=y&page_size=${process.env.REACT_APP_PAGE_SIZE_FOR_MASTER}`

		fetch(listAPI).then((response) => {
			if (response.statusText === "Internal Server Error") {
				this.setState({
					loading: this.state.loading = false,
				});
				return alert("Something went wrong, kindly check with administrator")
			}
			response.json().then((data) => {
				this.setState({
					data_list: data.results,
				});
				this.state.data_list.forEach((element) => {
					if (element.menu_url !== null) {
						if (element.menu_url.includes("prospect/pendingProspect")) {
							this.setState({
								rouList: [...this.state.rouList, { ct: "pendingProspect", path: `${APP_NAME}/prospect/pendingProspect`, exact: true, element: lazy(() => import(`./${element.parent_app_folder}/prospect/pendingProspect`)) }]
							})
						}
						else {
							this.setState({
								rouList: [...this.state.rouList, { ct: "list", path: `${APP_NAME}/${element.menu_url}`, exact: true, element: lazy(() => import(`./${element.parent_app_folder}/${element.menu_url}/listPage`)) }]
							})
							this.setState({
								rouList: [...this.state.rouList, { ct: "createUpdate", path: `${APP_NAME}/${element.menu_url}/CreateUpdate`, exact: true, element: lazy(() => import(`./${element.parent_app_folder}/${element.menu_url}/CreateUpdatePage`)) }]
							})
							this.setState({
								rouList: [...this.state.rouList, { ct: "pendingApproval", path: `${APP_NAME}/${element.menu_url}/pendingApproval`, exact: true, element: lazy(() => import(`./${element.parent_app_folder}/${element.menu_url}/listPage`)) }]
							})
							this.setState({
								rouList: [...this.state.rouList, { ct: "details", path: `${APP_NAME}/${element.menu_url}/:modify`, exact: true, element: lazy(() => import(`./${element.parent_app_folder}/${element.menu_url}/CreateUpdatePage`)) }]
							})
							this.setState({
								rouList: [...this.state.rouList, { ct: "details", path: `${APP_NAME}/${element.menu_url}/:copy`, exact: true, element: lazy(() => import(`./${element.parent_app_folder}/${element.menu_url}/CreateUpdatePage`)) }]
							})
							this.setState({
								rouList: [...this.state.rouList, { ct: "closingPrice", path: `${APP_NAME}/${element.menu_url}/closingPrice`, exact: true, element: lazy(() => import(`./${element.parent_app_folder}/${element.menu_url}/closingPrice`)) }]
							})
							this.setState({
								rouList: [...this.state.rouList, { ct: "extractClient", path: `${APP_NAME}/${element.menu_url}/extractClient`, exact: true, element: lazy(() => import(`./${element.parent_app_folder}/${element.menu_url}/extractClient`)) }]
							})
							this.setState({
								rouList: [...this.state.rouList, { ct: "uploadData", path: `${APP_NAME}/${element.menu_url}/uploadData`, exact: true, element: lazy(() => import(`./${element.parent_app_folder}/${element.menu_url}/uploadData`)) }]
							})
							this.setState({
								rouList: [...this.state.rouList, { ct: "dataStore", path: `${APP_NAME}/${element.menu_url}/dataStore`, exact: true, element: lazy(() => import(`./${element.parent_app_folder}/${element.menu_url}/dataStore`)) }]
							})
						}
					}
				});
			});
		})
	}
	async componentDidMount() {
		this.getMenuList()
	};

	render() {
		return (
			<div>
				<Router forceRefresh={true}>
					<HeaderNavBar></HeaderNavBar>
					<SideNavBar></SideNavBar>
					<Routes>

						<Route path={APP_NAME + '/homePage'} element={<HomePage />} />
						<Route path={APP_NAME + '/homePages'} element={<Navigate replace to={APP_NAME + '/homePage'} />} />
						{/* <Route path={APP_NAME+'/userMaster'} element={<UserMaster />} /> */}
						{/* <Route path={APP_NAME+'/userMaster'} element={<Suspense fallback={<>...</>}> <UserElement /> </Suspense> } />
              <Route path={APP_NAME+'/userMaster'+"s"} element={<Navigate replace to={APP_NAME+'/userMaster'} />} />
                      */}

						{this.state.rouList.map((route, i) => {
							return (
								<>
									<Route key={i} path={route.path} element={<Suspense fallback={<>...</>}> <route.element /> </Suspense>} />
									<Route path={route.path + "s"} element={<Navigate replace to={route.path} />} />
								</>
							);
						})}
					</Routes>
				</Router>
			</div>
		);
	}
}

export default App;