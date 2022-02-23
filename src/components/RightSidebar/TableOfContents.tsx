/** @jsx h */
import type { FunctionalComponent } from "preact";
import { h, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

const TableOfContents: FunctionalComponent<{ headers: any[] }> = ({
	// eslint-disable-next-line react/prop-types
	headers = [],
}) => {
	const itemOffsets = useRef([]);
	// eslint-disable-next-line no-unused-vars
	const [activeId, setActiveId] = useState<string>(undefined);

	useEffect(() => {
		const getItemOffsets = () => {
			const titles = document.querySelectorAll("article :is(h1, h2, h3, h4)");
			itemOffsets.current = Array.from(titles).map((title) => ({
				id: title.id,
				topOffset: title.getBoundingClientRect().top + window.scrollY,
			}));
		};

		getItemOffsets();
		window.addEventListener("resize", getItemOffsets);

		return () => {
			window.removeEventListener("resize", getItemOffsets);
		};
	}, []);

	return (
		<>
			<h2 className="heading">On this page</h2>
			<ul>
				<li
					className={`header-link depth-2 ${
						activeId === "overview" ? "active" : ""
					}`.trim()}
				>
					<a href="#overview">Overview</a>
				</li>
				{headers
					.filter(({ depth }) => depth > 1 && depth < 4)
					.map((header, i: number) => (
						<li
							key={i}
							className={`header-link depth-${header.depth} ${
								activeId === header.slug ? "active" : ""
							}`.trim()}
						>
							<a href={`#${header.slug}`}>{header.text}</a>
						</li>
					))}
			</ul>
		</>
	);
};

export default TableOfContents;
