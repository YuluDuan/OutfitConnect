"use client";

import {
	NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
	navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu"

import Link from 'next/link'


function NavItem({text, url}) {
	return (
		<NavigationMenuItem>
			<Link href={url} passHref>
				<NavigationMenuLink className={navigationMenuTriggerStyle()}>
					{text}
				</NavigationMenuLink>
			</Link>
		</NavigationMenuItem>
	)
}



export default function NavBar() {
	return (
		<NavigationMenu suppressHydrationWarning={true}>
			<NavigationMenuList>
				<NavItem text="Home" url="/"/>
				<NavItem text="Query" url="/query"/>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
