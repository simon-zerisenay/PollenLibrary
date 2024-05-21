import { Navbar } from "@/components/navbar";
import Footer from "@/components/section/footer";

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
		<Navbar/>
		<section className="">
			<div className=" ">
				{children}
			</div>
		</section>
		<Footer/>
		</>
	);
}
