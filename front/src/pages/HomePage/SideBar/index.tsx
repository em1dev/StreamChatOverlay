import { ConfigurationSection } from '../ConfigurationSection';


export interface SideBarProps {
  selectedSection: ConfigurationSection,
  onChange: (section: ConfigurationSection) => void,
}

export const SideBar = ({ onChange, selectedSection }: SideBarProps) => {
  return (
    <div
      className="
        text-[#adadad]
        bg-[#151515]
          rounded-lg
          flex
          flex-col
          gap-3
          p-2
      "
    >
      <button 
        onClick={() => onChange(ConfigurationSection.ChatVisual)} 
        className={` ${selectedSection === ConfigurationSection.ChatVisual ? 'bg-[#2e2e2e]' : ''} hover:bg-[#4d4d4d] rounded p-2`}
      >
        <img width={20} height={20} src='img/MingcuteSettings4Line.svg'></img>
      </button>

      <button
        onClick={() => onChange(ConfigurationSection.IgnoredUsers)} 
        className={` ${selectedSection === ConfigurationSection.IgnoredUsers ? 'bg-[#2e2e2e]' : ''} hover:bg-[#4d4d4d] rounded p-2`}
      >
        <span className="icon-[mingcute--user-forbid-line] w-[20px] h-[20px]" role="img" aria-hidden="true" />
      </button>

      <button
        onClick={() => onChange(ConfigurationSection.NameReplacement)} 
        className={` ${selectedSection === ConfigurationSection.NameReplacement ? 'bg-[#2e2e2e]' : ''} hover:bg-[#4d4d4d] rounded p-2`}
      >
        <img width={20} height={20} src='img/MingcuteUserEditLine.svg'></img>
      </button>

      <button
        onClick={() => onChange(ConfigurationSection.TTS)} 
        className={` ${selectedSection === ConfigurationSection.TTS ? 'bg-[#2e2e2e]' : ''} hover:bg-[#4d4d4d] rounded p-2`}
      >
        <img width={20} height={20} src='img/MingcuteChat2Line.svg'></img>
      </button>

    </div>
  );
};