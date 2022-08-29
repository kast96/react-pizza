import ContentLoader from "react-content-loader"

export const Skeleton = () => (
	<ContentLoader 
		className="pizza-block"
		speed={2}
		width={280}
		height={466}
		viewBox="0 0 280 466"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<circle cx="140" cy="130" r="130" /> 
		<rect x="0" y="268" rx="10" ry="10" width="280" height="27" /> 
		<rect x="0" y="312" rx="10" ry="10" width="280" height="88" /> 
		<rect x="0" y="433" rx="10" ry="10" width="95" height="27" /> 
		<rect x="125" y="421" rx="20" ry="20" width="152" height="45" />
	</ContentLoader>
)