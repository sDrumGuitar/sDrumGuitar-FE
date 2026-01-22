import NormalButton from '@/shared/button/NormalButton';

interface ButtonSectionProps {
  text: string;
  openModal: () => void;
}
function ModalOpenButton({ text, openModal }: ButtonSectionProps) {
  return (
    <div className="flex justify-end mb-4">
      <NormalButton text={text} onClick={openModal} />
    </div>
  );
}

export default ModalOpenButton;
