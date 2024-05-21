import { Navbar } from "@/components/navbar";
import Footer from "@/components/section/footer";

export default function SignUpLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
		<Navbar/>
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				{children}
			</div>
		</section>
		<Footer/>
		</>
	);
}
