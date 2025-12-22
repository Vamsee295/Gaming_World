import { useRouter } from 'next/router';
import Logo from './Logo';

const Header = () => {
  const router = useRouter();

  return (
    <div className="w-full sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default Header;