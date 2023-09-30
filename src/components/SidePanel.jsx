import SizeMenu from "@compUtils/SizeMenu";
import PageLogo from "@compUtils/PageLogo";

const SidePanel = ({ onSizeChanged }) => {
  return (
    <aside className="hidden 2xl:grid grid-rows-[5rem_1fr] p-5 gap-7 h-full bg-[#272838]">
      <PageLogo className="h-[70%] self-center" />
      <SizeMenu
        className="flex items-center flex-col gap-4"
        cardClassName="aspect-square rounded-lg w-[85px] px-2"
        onSizeChanged={onSizeChanged}
      />

      <small className="text-small text-center text-white">
        <a
          className="inline-block mb-1 opacity-30 hover:opacity-100 transition-opacity"
          href="https://github.com/adhamali450"
          target="_black"
          rel="noopener"
        >
          @adhamali450
        </a>
        <br />
        <a
          className=" opacity-30 hover:opacity-100 transition-opacity"
          href="https://github.com/Omaryassenn"
          target="_black"
          rel="noopener"
        >
          @OmarYassen
        </a>
      </small>
    </aside>
  );
};

export default SidePanel;
