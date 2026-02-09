import Image from 'next/image';
import Logo from '../../assets/logo.png';

export default function Header() {
	return (
				<header className="flex items-center h-16 px-4 bg-white border-b border-gray-200">
					<div className="flex items-center">
				<Image src={Logo} alt="Logo" height={30} />
			</div>
		</header>
	);
}
