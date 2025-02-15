/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { Accordion, Form, Icon, Menu } from "semantic-ui-react";

const ColorForm = (
	<Form>
		<Form.Group grouped>
			<Form.Checkbox label="Red" name="color" value="red" />
			<Form.Checkbox label="Orange" name="color" value="orange" />
			<Form.Checkbox label="Green" name="color" value="green" />
			<Form.Checkbox label="Blue" name="color" value="blue" />
		</Form.Group>
	</Form>
);

const SizeForm = (
	<Form>
		<Form.Group grouped>
			<Form.Radio label="Small" name="size" type="radio" value="small" />
			<Form.Radio label="Medium" name="size" type="radio" value="medium" />
			<Form.Radio label="Large" name="size" type="radio" value="large" />
			<Form.Radio label="X-Large" name="size" type="radio" value="x-large" />
		</Form.Group>
	</Form>
);

export class sideNavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: "",
			menu_list: [],
			loading: true,
		};
	}

	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const active_Index = this.state.activeIndex;
		const newIndex = active_Index === index ? -1 : index;

		this.setState({ activeIndex: newIndex });
	};

	getMenuAccess = async () => {
		// Menu List
		await fetch(`/${process.env.REACT_APP_NAME}/userAccessAPI/`).then(
			(response) => {
				if (response.statusText === "Internal Server Error") {
					var url = window.location.origin;
					window.location.replace(url);
				}
				response.json().then((data) => {
					this.setState({
						menu_list: data,
						loading: false,
					});
				});
			}
		);
	};

	async componentDidMount() {
		this.getMenuAccess();
		const caret_ele = document.getElementsByClassName("active_menu");
		if (caret_ele.length > 0) {
			caret_ele[0].parentNode.classList.add("active_li");
		}
	}

	aside_clickFun() {
		if (document.body.classList.contains("sidebar-collapse")) {
			document.body.classList.remove("sidebar-collapse");
		}
	}

	parentMenuClick(e) {
		const pm_id = e.currentTarget.attributes.parent_menu_id.value;
		const svgs = document.getElementsByClassName("caret_down");
		if (svgs.length > 0) {
			svgs[0].classList.remove("caret_down");
		}
		if (e.currentTarget.classList.contains("collapsed") === false) {
			const ele = document.getElementById("caret_" + pm_id);
			ele.classList.add("caret_down");
		} else {
			const ele = document.getElementById("caret_" + pm_id);
			ele.classList.remove("caret_down");
		}
	}

	onMenuClick = (e) => {
		const active_li = document.getElementsByClassName("active_li");
		if (active_li.length > 0) {
			active_li[0].classList.remove("active_li");
		}
		e.target.parentNode.classList.add("active_li");
	};

	render() {
		const activeIndex = this.state.activeIndex;
		return (
			<>
				<aside className="main-sidebar" id="side-nav-bar" onClick={this.aside_clickFun.bind(this)}>
					<Loader load={this.state.loading} class_name={"side_nav_loader"} ></Loader>
					<section className="sidebar">
						<Accordion as={Menu} vertical id="side_bar_accordion">
							{this.state.menu_list.map((pm, i) =>
								pm.is_parent === true ? (
									<Menu.Item>
										<Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick} content="">
											<span class="menu_icon" style={{ display: "contents !important" }}>
												<span>
													<span class="parent_menu_svg" dangerouslySetInnerHTML={{ __html: pm.parent_icon }}></span>
												</span>
											</span>
											<span class="Parent_menu">{pm.menu_desc}</span>
											<Icon name="dropdown" className="pull-right-container" />
										</Accordion.Title>
										<Accordion.Content active={activeIndex === i}>
											<ul id={"pm_" + pm.id} className="accordion-collapse side_bar_ul" aria-labelledby={"pm_" + pm.id} data-bs-parent="#side_bar_accordion">
												{this.state.menu_list.map((cm) =>
													cm.parent_menu_id === pm.id ? (
														cm.menu_url === "uploadData" ? (
															<li>
																<Link
																	exact
																	activeClassName="active_menu"
																	className="treeview-child"
																	to={`/${process.env.REACT_APP_NAME}/${cm.menu_url}/uploadData`}
																	onClick={this.onMenuClick}
																>
																	<FontAwesomeIcon
																		icon={faCaretRight}
																	></FontAwesomeIcon>{" "}
																	{cm.menu_desc}
																</Link>
															</li>
														) : cm.menu_url === "closingPriceRisk" ? (
															<li>
																<Link
																	exact
																	activeClassName="active_menu"
																	className="treeview-child"
																	to={`/${process.env.REACT_APP_NAME}/${cm.menu_url}/closingPriceDownload`}
																	onClick={this.onMenuClick}
																>
																	<FontAwesomeIcon
																		icon={faCaretRight}
																	></FontAwesomeIcon>{" "}
																	{cm.menu_desc}
																</Link>
															</li>
														) : (
															<li>
																<Link
																	exact
																	activeClassName="active_menu"
																	className="treeview-child"
																	to={`/${process.env.REACT_APP_NAME}/${cm.menu_url}s`}
																	onClick={this.onMenuClick}
																>
																	<FontAwesomeIcon
																		icon={faCaretRight}
																	></FontAwesomeIcon>{" "}
																	{cm.menu_desc}
																</Link>
															</li>
														)
													) : (
														""
													)
												)}

											</ul>
										</Accordion.Content>
									</Menu.Item>
								) : (
									""
								)
							)}
						</Accordion>
					</section>
				</aside>
			</>
		);
	}
}
export default sideNavBar;
