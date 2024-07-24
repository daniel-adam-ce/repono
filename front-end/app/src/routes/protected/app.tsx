import { AuthContext, useTheme } from "@/providers";
import React, { Fragment, ReactElement, Suspense, cloneElement, useContext, } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import Styles from "./index.module.scss";
import { classCombine } from "@/@utils";
import { Avatar, AvatarFallback, AvatarImage, Button, Popover, PopoverContent, PopoverTrigger, ReponoLogoTitle, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, VisuallyHidden } from "@/components";
import { LuBox, LuDoorOpen } from "react-icons/lu";
import { RiDashboard3Line } from "react-icons/ri";
import { HouseContext } from "@/providers/house";
import { TbHome2, TbHomeStar, TbUsers } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import * as VisuallyHiddenGlobal from '@radix-ui/react-visually-hidden';

interface NavButtonProps {
    icon: React.ReactNode;
    tooltip: string;
    to: string;
}

interface NavLinkItemProps {
    to: string,
    icon: React.ReactNode
    children?: React.ReactNode
}



const NavLinkItem = ({ icon, to, children }: NavLinkItemProps) => {
    return (
        <li
            className={classCombine(Styles["nav-button-container"])}
        >
            <NavLink
                to={to}
                className={({ isActive }) => {
                    return classCombine(Styles["nav-button"], isActive ? Styles["active"] : "")
                }}

            >
                {
                    cloneElement(icon as ReactElement, { size: 20 })
                }
                {
                    children
                }
            </NavLink>
        </li>
    )
}

const NavButton = ({ icon, tooltip, to }: NavButtonProps) => {
    return (
        <TooltipProvider
            delayDuration={0}
        >
            <Tooltip>
                <TooltipTrigger
                >
                    {/* <li
                        className={classCombine(Styles["nav-button-container"])}
                    >
                        <NavLink
                            to={to}
                            className={({ isActive }) => {
                                return classCombine(Styles["nav-button"], isActive ? Styles["active"] : "")
                            }}

                        >
                            {
                                cloneElement(icon as ReactElement, { size: 20 })
                            }
                        </NavLink>
                    </li> */}
                    <NavLinkItem
                        to={to}
                        icon={icon}
                    />
                </TooltipTrigger>
                <TooltipContent
                    side={"right"}
                >
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

const Navbar = (props: { children: React.ReactNode, className?: string }) => {
    return (
        <aside>
            <nav
                className={classCombine(Styles["nav"], props?.className)}
            >
                <ul
                    className={classCombine(Styles["nav-list"], "items-start sm:items-center")}
                >
                    {
                        props.children
                    }
                </ul>
            </nav>
        </aside>
    )
}

const NavbarHouse = (props: { className?: string }) => {
    const { houseId } = useParams();
    return (
        <Navbar
            className={props.className}
        >
            <NavButton
                icon={<RiDashboard3Line />}
                tooltip={"Dashboard"}
                to={`${houseId}/dashboard`}
            />
            <NavButton
                icon={<LuDoorOpen />}
                tooltip={"Rooms"}
                to={`${houseId}/rooms`}
            />
            <NavButton
                icon={<LuBox />}
                tooltip={"Items"}
                to={`${houseId}/items`}
            />
            <NavButton
                icon={<TbUsers />}
                tooltip={"Users"}
                to={`${houseId}/users`}
            />
            <NavButton
                icon={<TbHomeStar />}
                tooltip={"House Settings"}
                to={`${houseId}/settings`}
            />
        </Navbar>
    )
}



const NavbarGlobal = (props: { className?: string }) => {
    return (
        <Navbar
            className={props.className}
        >
            <NavButton
                icon={<TbHome2 />}
                tooltip={"Houses"}
                to={"/"}
            />
            <NavButton
                icon={<LuBox />}
                tooltip={"Items"}
                to={"/items"}
            />
        </Navbar>
    )
}

const HouseSelect = () => {
    const auth = useContext(AuthContext);
    const house = useContext(HouseContext);
    const navigate = useNavigate();
    return (
        <Select
            value={(house.house?.house_id).toString()}
            onValueChange={(value) => {
                console.log(value)
                if (value !== "-1") {
                    navigate(`/house/${value}`);
                } else {
                    navigate("/")
                }
            }}

        >
            <SelectTrigger className="w-[180px] ">
                <SelectValue placeholder="House" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup
                >

                    {
                        auth.houses.map((house) => {
                            return (
                                <SelectItem
                                    value={(house.house_id).toString()}
                                    key={house.house_id}
                                >
                                    {
                                        `${house.house_id}-${house.house_name}`
                                    }
                                </SelectItem>
                            )
                        })
                    }
                    <SelectItem
                        value={"-1"}
                        key={"dashboard"}
                    >
                        dashboard
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}


const Header = () => {
    const auth = useContext(AuthContext);
    const house = useContext(HouseContext);
    const theme = useTheme();
    const { houseId } = useParams();
    return (
        <header
            className={Styles["nav-header"]}
        >
            <Sheet

            >
                <SheetTrigger asChild>
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        className="sm:hidden"
                    >
                        <GiHamburgerMenu />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side={"left"}
                >
                    <SheetHeader>
                        <VisuallyHidden>
                            <SheetTitle>Mobile Navigation</SheetTitle>
                        </VisuallyHidden>
                        <VisuallyHidden>
                            <SheetDescription>
                                Navigate to pages on the site.
                            </SheetDescription>
                        </VisuallyHidden>
                    </SheetHeader>
                    <div
                    >

                        <HouseSelect />
                        <ul
                            className={Styles["nav-list"]}
                        >
                            {
                                house.house?.house_id !== -1
                                    ? <Fragment
                                        key={"house"}
                                    >
                                        <NavLinkItem
                                            icon={<RiDashboard3Line />}
                                            children={"Dashboard"}
                                            to={`${houseId}/dashboard`}
                                        />
                                        <NavLinkItem
                                            icon={<LuDoorOpen />}
                                            children={"Rooms"}
                                            to={`${houseId}/rooms`}
                                        />
                                        <NavLinkItem
                                            icon={<LuBox />}
                                            children={"Items"}
                                            to={`${houseId}/items`}
                                        />
                                        <NavLinkItem
                                            icon={<TbUsers />}
                                            children={"Users"}
                                            to={`${houseId}/users`}
                                        />
                                        <NavLinkItem
                                            icon={<TbHomeStar />}
                                            children={"House Settings"}
                                            to={`${houseId}/settings`}
                                        />
                                    </Fragment>
                                    : <Fragment
                                        key={"global"}
                                    >

                                        <NavButton
                                            icon={<TbHome2 />}
                                            tooltip={"Houses"}
                                            to={"/"}
                                        />
                                        <NavButton
                                            icon={<LuBox />}
                                            tooltip={"Items"}
                                            to={"/items"}
                                        />
                                    </Fragment>
                            }

                        </ul>
                    </div>

                </SheetContent>
            </Sheet>
            <div className="hidden sm:flex">
                <HouseSelect />
            </div>
            <ReponoLogoTitle />
            <Popover>
                <PopoverTrigger asChild>
                    <Avatar
                    >
                        <AvatarImage src="https://github.com/shadcn.dfcvpng" alt="@shadcn" />
                        <AvatarFallback>{auth.user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div
                        className="flex justify-between"
                    >
                        <Button
                            onClick={() => {
                                if (theme.theme === "dark") {
                                    theme.setTheme("light")
                                } else {
                                    theme.setTheme("dark");
                                }
                            }}
                            size="sm"
                            className="h-8"
                            variant={"secondary"}
                        >
                            Theme
                        </Button>
                        <Button
                            onClick={() => {
                                auth.logout();
                            }}
                            size="sm"
                            className="h-8"
                            variant={"secondary"}
                        >
                            Logout
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </header>
    )
}

const Main = (props: { children: React.ReactNode }) => {
    return (

        <div
            className={Styles["main"]}
        >
            {
                props.children
            }
        </div>
    )
}

const Content = () => {
    return (
        <div
            className={classCombine(Styles.content, "w-screen max-w-screen sm:w-[calc(100%-50px)]")}
        >
            <Suspense
                fallback={
                    <div>
                        suspense 2
                    </div>
                }
            >
                <Outlet />
            </Suspense>
        </div>
    )
}

export const GlobalApp = () => {
    return (
        <>
            <Header />
            <Main>
                <NavbarGlobal
                    className="sm:block hidden"
                />
                <Content />
            </Main>
        </>
    )
}


export const HouseApp = () => {
    return (
        <>
            <Header />
            <Main>
                <NavbarHouse
                    className="sm:block hidden"
                />
                <Content />
            </Main>
        </>
    )
}

export const ProtectedApp = () => {
    return (
        <div
            className={Styles["protected-shell"]}
        >
            <Outlet />
        </div>
    );
};