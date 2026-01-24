import NormalButton from '@/shared/button/NormalButton';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

function SelectMonthSection() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <AiFillCaretLeft className="hover:opacity-50 pressable" size={20} />
        <p className="text-xl font-semibold">11월</p>
        <AiFillCaretRight className="hover:opacity-50 pressable" size={20} />
      </div>
      <NormalButton text="오늘" />
    </div>
  );
}
export default SelectMonthSection;
