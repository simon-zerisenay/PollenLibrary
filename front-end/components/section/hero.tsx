import Link from "next/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import {Image} from "@nextui-org/image";


export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:h-screen ">
			<div className="flex flex-col items-center  gap-4 py-8 md:py-10">
			<div className="inline-block max-w-xl text-center justify-center">
				<h1 className={title()}>Pollen Library &nbsp;</h1>
				
				
				<h2 className={subtitle({ class: "mt-4" })}>
				Discover a comprehensive library of pollen species, complete with details on their location, family, habitat, and other intriguing characteristics. 
        Explore and learn about pollens from all around the UAE in one convenient place.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					
					href='/signup'
					className="bg-gradient-to-t from-yellow-700 to-yellow-400 px-5 py-3 rounded-lg text-white text-lg "
				>
					Get Started
				</Link>
				
			</div>
			
			</div>

			
		    </section>
  )
}
