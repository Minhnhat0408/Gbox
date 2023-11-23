import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
  className: string;
  // for game lib modal only
  style?: React.CSSProperties;
}

function Modal({ isOpen, onChange, children, className, style }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onChange} defaultOpen={isOpen}>
      <DialogContent className={className}>
        {children}
        {style && (
          <div
            className="absolute blur-md w-full h-full bg-top bg-cover bg-no-repeat z-0"
            style={style}
          ></div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
