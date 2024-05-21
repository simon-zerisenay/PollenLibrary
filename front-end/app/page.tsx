import { Navbar } from "@/components/navbar";
import ProductDesc from "@/components/section/about";
import Footer from "@/components/section/footer";
import Hero from "@/components/section/hero";





export default function Home() {
	return (
		<>
		<Navbar/>
		<section className="flex flex-col  items-center justify-center gap-4 py-8 md:py-10">
			<Hero/>
			<ProductDesc/>
		
		</section>
		<Footer/>
		</>
	);
}
