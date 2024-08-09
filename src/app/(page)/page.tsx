import Home_V2 from "./(home)/home-v2/page";
import Wrapper from "./layout-wrapper/wrapper";

export const metadata = {
  title: "BangEZ",
};

export default function MainRoot() {
  return (
    <Wrapper>
      <Home_V2 />
    </Wrapper>
  );
}
